import React, { useEffect, useState, Fragment } from 'react';
import { axiosInstance } from '../Helpers/axiosInstance';

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
    // Update the color of a row's Date column depending on its status. i.e.
    // Past Due => red
    // Today => orange
    // Upcoming => green
    // Completed => black
    useEffect(() => {
        const d = new Date();
        const todayString = `${d.getFullYear()}-${leadingZero(d.getMonth() + 1)}-${leadingZero(d.getDate())}`;

        if(dateInfo.File.isClosed || isClosed)
            setDateColor('black');
        else if(dateInfo.date === todayString)
            setDateColor('yellow.500');
        else if(dateInfo.date > todayString)
            setDateColor('green.500');
        else
            setDateColor('red.500');

        if(update) {
            dateInfo.isClosed = isClosed;
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
                })
            });
        }
    }, [isClosed, update]);

    return (
        <HStack w={props.tableWidth} h='30px' borderRadius='10px' textAlign='left' bgColor='#0077cc' color='white' fontSize={props.fontSize} spacing={props.colWidths.columns.margin}
            _hover={{cursor:'pointer'}} 
            onClick={()=>{onOpen()}}
        >
            <Box h='full' w='fit-content' p={props.colWidths.columns.dateColPadding} bgColor={dateColor} display='flex' alignItems='center' borderRadius='10px'>
                <Text w={props.colWidths.columns.dateColW} textAlign='center' fontWeight='bold'>
                    {dateInfo.date.slice(5) + '-' + dateInfo.date.slice(2,4)}
                </Text>
            </Box>

            <Text w={props.colWidths.columns.fileNoColW} textAlign='center'>
                {dateInfo.fileNumber}
            </Text>

            <Divider orientation='vertical' h='70%' />

            <Text w={props.colWidths.columns.eventColW} textAlign='center'>
                {
                    dateInfo.prefix && (
                        dateInfo.prefix === 'First ' && '1st ' || 
                        dateInfo.prefix === 'Second ' && '2nd '
                    )
                }
                {dateInfo.type}
            </Text>

            {/* Display Buyer, Seller, Address w/ Tooltip in case of overflow. */}
            {
                [dateInfo.File.buyer, dateInfo.File.seller, dateInfo.File.address].map((item, index) => {
                    const whoRepresenting = dateInfo.File.whoRepresenting
                    const represented = ((index !== 2 && whoRepresenting === 'Both') ||
                        (index === 0 && whoRepresenting === 'Buyer') ||
                        (index === 1 && whoRepresenting === 'Seller'))
                    return <Fragment key={index}>
                        <Divider orientation='vertical' h='70%' />
                        <Tooltip
                            label={item}
                            fontSize={props.fontSize}
                            // Max Width of Tooltip changes based on cell's numLines and fontSize.
                            maxW={`${275 - (props.colWidths.columns.numLines * 25) - ((14 - Math.min(parseInt(props.fontSize.slice(0,-2)), 14)) * 15)}px`}
                            gutter='2'
                        >
                            <Box h='100%' display='flex'>
                                <Text
                                    w={props.colWidths.columns.infoColW}
                                    h='fit-content'
                                    alignSelf='center'
                                    noOfLines={props.colWidths.columns.numLines}
                                    lineHeight={`${props.colWidths.columns.lineHeight}px`}
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
            <Divider orientation='vertical' h='70%' />

            <Button m='0px !important' minW='32px' w={props.colWidths.columns.statusColW} h='30px' bgColor='transparent'
                _hover={{bgColor:'transparent'}}
                isDisabled={dateInfo.File.isClosed}
                onClick={(e)=>{
                    e.stopPropagation();
                    setIsClosed((isClosed) => !isClosed);
                    setUpdate(true);
                }}
            >
                <Text textAlign='center'>
                    { (dateInfo.File.isClosed || isClosed) && <LockIcon color='red' boxSize={props.colWidths.columns.iconSize}/> || <UnlockIcon boxSize={props.colWidths.columns.iconSize}/> }
                </Text>
            </Button>
            
            <FileModal
                new={false}
                onClose={onClose}
                isOpen={isOpen}
                fileNo={dateInfo.fileNumber}
            />
        </HStack>
    )
}

export default TableRow;