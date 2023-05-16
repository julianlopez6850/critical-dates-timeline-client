import React, { useEffect, useState, Fragment } from "react"
import { Box, Button, Divider, HStack, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { EditFile } from "./EditFile";
import { CheckIcon, CloseIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import axios from 'axios';


const TableRow = (props) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isClosed, setIsClosed] = useState(props.dateInfo.isClosed);
    const [dateColor, setDateColor] = useState('');

    // Update the isClosed property of date in database whenever the value is updated by the user &
    // Update the color of a row's Date column depending on its status. i.e.
    // Past Due => red
    // Today => orange
    // Upcoming => green
    // Completed => black
    useEffect(() => {

        const leadingZero = (num) => {
            if(num < 10)
                return '0' + num;
            return num;
        }
        
        const d = new Date();
        const todayString = `${d.getFullYear()}-${leadingZero(d.getMonth() + 1)}-${leadingZero(d.getDate())}`;

        if(props.dateInfo.isFileClosed || isClosed)
            setDateColor('black');
        else if(props.dateInfo.date === todayString)
            setDateColor('yellow.500');
        else if(props.dateInfo.date > todayString)
            setDateColor('green.500');
        else
            setDateColor('red.500');

        const dateInfo = {
            fileNumber: props.dateInfo.fileNumber,
            type: props.dateInfo.type,
            prefix: props.dateInfo.prefix,
            isClosed: isClosed
        }
        
        axios.put(`http://localhost:5000/dates`, dateInfo).then((response) => {

        }).catch((error) => {
            console.log('Error updating date: ' + error.message);
        });

    }, [isClosed])      

    return (
        <HStack w='1060px' h='30px' borderRadius='10px' textAlign='left' bgColor='#0077cc' color='white'
            _hover={{cursor:'pointer'}} 
            onClick={()=>{onOpen()}}
        >
            <Box h='full' w='fit-content' p='10px' bgColor={dateColor} display='flex' alignItems='center' borderRadius='10px' >
                <Text w='90px' textAlign='center' fontWeight='bold'>
                    {props.dateInfo.date}
                </Text>
            </Box>

            <Text w='50px' textAlign='center'>
                {props.dateInfo.fileNumber}
            </Text>

            <Divider orientation='vertical' h='70%' />

            <Text w='81px'  textAlign='center'>
                {
                    props.dateInfo.prefix && (props.dateInfo.prefix === 'First ' && '1st ' || 
                    props.dateInfo.prefix === 'Second ' && '2nd ' || '3rd ')
                }
                {props.dateInfo.type}
            </Text>

            {/* Display Buyer, Seller, Address w/ Tooltip in case of overflow. */}
            {
                [props.dateInfo.buyer, props.dateInfo.seller, props.dateInfo.address].map((item, index) => {
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
                isDisabled={props.dateInfo.isFileClosed}
                onClick={(e)=>{
                    e.stopPropagation();
                    setIsClosed((isClosed) => !isClosed);
                }}
            >
                <Text w='40px' textAlign='center'>
                    { (props.dateInfo.isFileClosed || isClosed) && <LockIcon color='red'/> || <UnlockIcon/> }
                </Text>
            </Button>
            
            <EditFile
                onClose={onClose}
                isOpen={isOpen}
                fileNo={props.dateInfo.fileNumber}
            />
        </HStack>
    )
}

export default TableRow;