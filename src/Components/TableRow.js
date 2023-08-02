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
        <HStack w='1060px' h='30px' borderRadius='10px' textAlign='left' bgColor='#0077cc' color='white'
            _hover={{cursor:'pointer'}} 
            onClick={()=>{onOpen()}}
        >
            <Box h='full' w='fit-content' p='10px' bgColor={dateColor} display='flex' alignItems='center' borderRadius='10px' >
                <Text w='90px' textAlign='center' fontWeight='bold'>
                    {dateInfo.date}
                </Text>
            </Box>

            <Text w='50px' textAlign='center'>
                {dateInfo.fileNumber}
            </Text>

            <Divider orientation='vertical' h='70%' />

            <Text w='81px'  textAlign='center'>
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
                    return <Fragment key={index}>
                        <Divider orientation='vertical' h='70%' />
                        <Tooltip
                            label={item}
                            maxW='255px'
                        >
                            <Text w='225px' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>
                                {item}
                            </Text>
                        </Tooltip>
                    </Fragment>
                })
            }
            <Divider orientation='vertical' h='70%' />

            <Button m='0px !important' w='59px' h='36px' bgColor='transparent'
                _hover={{bgColor:'transparent'}}
                isDisabled={dateInfo.File.isClosed}
                onClick={(e)=>{
                    e.stopPropagation();
                    setIsClosed((isClosed) => !isClosed);
                    setUpdate(true);
                }}
            >
                <Text w='40px' textAlign='center'>
                    { (dateInfo.File.isClosed || isClosed) && <LockIcon color='red'/> || <UnlockIcon/> }
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