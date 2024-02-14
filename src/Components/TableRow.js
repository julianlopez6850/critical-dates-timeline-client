import React, { useEffect, useState, useContext, Fragment } from 'react';
import { axiosInstance } from '../Helpers/axiosInstance';
import { profileContext } from '../Helpers/profileContext'

import {
    Box,
    Button,
    Divider,
    HStack,
    Text,
    Tooltip,
    useDisclosure
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';

import FileModal from './FileModal';
import leadingZero from '../Helpers/leadingZero';

const TableRow = (props) => {
    const { profile, setProfile } = useContext(profileContext);
    const dateInfo = props.dateInfo
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isClosed, setIsClosed] = useState(dateInfo.isClosed === 1 ? true : false);
    const [update, setUpdate] = useState(false);
    const [dateColor, setDateColor] = useState('');

    // If the Date's status is changed within its File's Modal, update the isClosed hook to reflect that change.
    useEffect(() => {
        setIsClosed(dateInfo.isClosed === 1 ? true : false);
    }, [dateInfo])

    // Update the isClosed property of date in database whenever the value is updated by the user &
    // Update the color of a row's Date column depending on its status.
    useEffect(() => {
        const d = new Date();
        const todayString = `${d.getFullYear()}-${leadingZero(d.getMonth() + 1)}-${leadingZero(d.getDate())}`;

        if(dateInfo.File.status === 'Cancelled')
            setDateColor('#444466');
        else if(dateInfo.File.status !== 'Open' || isClosed)
            setDateColor('black');
        else if(dateInfo.date === todayString)
            setDateColor('yellow.500');
        else if(dateInfo.date > todayString)
            setDateColor('green.500');
        else
            setDateColor('red.500');

        if(!update)
            return;
        
        dateInfo.isClosed = isClosed;

        // STAGING ENVIRONMENT - Update date status
        if(process.env.REACT_APP_ENV === 'staging') {
            var storedDates = JSON.parse(localStorage.getItem('dates'));
            storedDates[(dateInfo.fileNumber + dateInfo.type + dateInfo.prefix)].isClosed = dateInfo.isClosed ? 1 : 0;
            localStorage.setItem('dates', JSON.stringify(storedDates));

            return console.info(`Updated Status of ${dateInfo.fileNumber} ${dateInfo.prefix}${dateInfo.type} to ${dateInfo.isClosed ? `CLOSED` : `OPEN`}`);
        }

        // PRODUCTION ENVIRONMENT - Update date status
        axiosInstance.put(`${process.env.REACT_APP_API_URL}/dates`, dateInfo).then(() => {
            console.info(`Updated Status of ${dateInfo.fileNumber} ${dateInfo.prefix}${dateInfo.type} to ${dateInfo.isClosed ? `CLOSED` : `OPEN`}`);
        }).catch(() => {
            console.warn('ERROR. We encountered a problem while trying to update this date. Please try again later.');
            props.toast({
                title: 'Error.',
                description: `An error occurred while trying to update this date's status. Try again later.`,
                status: 'error',
                duration: 2500,
                isClosable: true,
            });
        });
    }, [isClosed, update]);

    return (
        <HStack
            w={props.tableStyles.tableW}
            h='30px'
            borderRadius='10px'
            bgColor={dateInfo.File.isPurchase ? '#0077cc' : '#0055aa'}
            color='white'
            fontSize={props.tableStyles.rowFontSize}
            textAlign='left'
            spacing={props.tableStyles.columns.margin}
            _hover={{cursor:'pointer'}} 
            onClick={()=>{onOpen()}}
        >
            <Box
                w='fit-content'
                h='full'
                p={props.tableStyles.columns.dateColPadding}
                bgColor={dateColor}
                display='flex'
                alignItems='center'
                borderRadius='10px'
            >
                <Text w={props.tableStyles.columns.dateColW} textAlign='center' fontWeight='bold'>
                    {dateInfo.date.slice(5) + '-' + dateInfo.date.slice(2,4)}
                </Text>
            </Box>

            <Text w={props.tableStyles.columns.fileNoColW} textAlign='center'>
                {dateInfo.fileNumber.slice(0,5)}{dateInfo.fileNumber.slice(5)}
            </Text>

            <Divider orientation='vertical' h='70%'/>

            <Text w={props.tableStyles.columns.eventColW} textAlign='center'>
                {
                    dateInfo.prefix && (
                        dateInfo.prefix === 'First ' && '1st ' || 
                        dateInfo.prefix === 'Second ' && '2nd '
                    )
                }
                {dateInfo.type === 'Loan Approval' ? 'Loan ✓' : dateInfo.type}
            </Text>

            {/* Display Buyer, Seller, Address w/ Tooltip in case of overflow. */}
            {
                [dateInfo.File.buyer, dateInfo.File.seller, dateInfo.File.address].map((item, index) => {
                    const whoRepresenting = dateInfo.File.whoRepresenting
                    const represented = ((index !== 2 && whoRepresenting === 'Both') ||
                        (index === 0 && whoRepresenting === 'Buyer') ||
                        (index === 1 && whoRepresenting === 'Seller'))
                    return <Fragment key={index}>
                        <Divider orientation='vertical' h='70%'/>
                        <Tooltip
                            label={item}
                            fontSize={props.tableStyles.rowFontSize}
                            // Max Width of Tooltip changes based on cell's numLines and fontSize.
                            maxW={`${275 - (props.tableStyles.columns.numLines * 25) - ((14 - Math.min(parseInt(props.tableStyles.rowFontSize.slice(0,-2)), 14)) * 15)}px`}
                            gutter='2'
                        >
                            <Box h='100%' display='flex'>
                                <Text
                                    w={props.tableStyles.columns.infoColW}
                                    h='fit-content'
                                    alignSelf='center'
                                    noOfLines={props.tableStyles.columns.numLines}
                                    lineHeight={`${props.tableStyles.columns.lineHeight}px`}
                                    /* Make the represented party of each Date's File stand out. */
                                    fontStyle={represented ? 'italic' : 'normal'}
                                    fontWeight={represented ? 'bold' : 'normal'}
                                    color={represented ? 'floralwhite' : 'white'}
                                >
                                    {item}
                                </Text>
                            </Box>
                        </Tooltip>
                    </Fragment>
                })
            }
            <Divider orientation='vertical' h='70%'/>

            <Button
                w={props.tableStyles.columns.statusColW}
                h='30px'
                minW='32px'
                m='0px !important'
                bgColor='transparent'
                _hover={{bgColor:'transparent'}}
                isDisabled={dateInfo.File.status !== 'Open'}
                _disabled={{opacity: 1, cursor: 'not-allowed'}}
                onClick={(e)=>{
                    e.stopPropagation();
                    setIsClosed((isClosed) => !isClosed);
                    if(!profile.updatesMade.some(date => (date.fileNumber === dateInfo.fileNumber && date.change === 'Date-isClosed'))) {
                        setProfile(profile => {
                            return {...profile, updatesMade: [...profile.updatesMade, { fileNumber: dateInfo.fileNumber, change: 'Date-isClosed' } ] }
                        });
                    } else {
                        setProfile(profile => {
                            return {...profile, updatesMade: profile.updatesMade.filter(date => !(date.fileNumber === dateInfo.fileNumber && date.change === 'Date-isClosed'))}
                        });
                    };
                    setUpdate(true);
                }}
            >
                <Text textAlign='center'>
                    {(dateInfo.File.status !== 'Open' || isClosed) &&
                        <LockIcon color={dateInfo.File.status === 'Cancelled' ? '#444466' : dateInfo.File.status === 'Closed' ? 'red.800' : 'red.500'} boxSize={props.tableStyles.columns.iconSize}/> ||
                        <UnlockIcon boxSize={props.tableStyles.columns.iconSize}/>
                    }
                </Text>
            </Button>
            
            <FileModal
                new={false}
                onClose={() => {
                    setProfile(profile => { return {...profile, openModal: '' }});
                    return onClose();
                }}
                isOpen={isOpen}
                fileNo={dateInfo.fileNumber}
            />
        </HStack>
    )
}

export default TableRow;