import { Box, Button, Divider, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import TableRow from "./TableRow";
import { InfoIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import DateFilterButton from './DateFilterButton';
import { useNavigate } from 'react-router-dom';

const DatesTable = (props) => {
    
    const navigate = useNavigate();
    
    const columnHeaders = [
        {text: <Tooltip borderRadius='5px' mt='-5px' label={
                <VStack>
                    <HStack w='full'>
                        <Box w='10px' h='10px' mb='-3px' bgColor='red'></Box>
                        <Text>: Past Due</Text>
                    </HStack>
                    <HStack w='full'>
                        <Box w='10px' h='10px' mb='-3px' bgColor='orange'></Box>
                        <Text>: Today</Text>
                    </HStack>
                    <HStack w='full'>
                        <Box w='10px' h='10px' mb='-3px' bgColor='green'></Box>
                        <Text>: Upcoming</Text>
                    </HStack>
                    <HStack w='full'>
                        <Box w='10px' h='10px' mb='-3px' bgColor='black'></Box>
                        <Text>: Completed</Text>
                    </HStack>
                </VStack>
            }>
                <span>Date <InfoIcon/></span>
            </Tooltip>, 
        w:'110px'},
        {text:'File No.', w:'66px'},
        {text:'Event', w:'98px'},
        {text:'Buyer', w:'242px'},
        {text:'Seller', w:'242px'},
        {text:'Address', w:'242px'},
        {text: <Tooltip borderRadius='5px' mt='-5px' label={
                <VStack>
                    <HStack w='full'>
                        <Text mb='2px'><UnlockIcon/></Text>
                        <Text>: Ongoing</Text>
                    </HStack>
                    <HStack w='full'>
                        <Text mb='1px' color='red'><LockIcon/></Text>
                        <Text>: Completed</Text>
                    </HStack>
                    <HStack w='full'>
                        <Text mb='1px' color='red.800'><LockIcon/></Text>
                        <Text>: File Closed </Text>
                    </HStack>
                </VStack>
            }>
                <span>Status <InfoIcon/></span>
            </Tooltip>,
        w:'80px'},
    ]

    return (
        <VStack>
            <VStack>
                <Text fontSize='20px' fontWeight='bold'>
                    {`${props.type} | ${props.when}`}
                </Text>

                <Divider w='1060px' borderColor='red' />

                {/* Table Column Headers */}
                <HStack w='1080px' spacing='0' pl='10px'>
                    {
                        columnHeaders.map((item, index) => {
                            return <Text w={item.w} key={index}>
                                {item.text}
                            </Text>
                        })
                    }
                </HStack>

                <Divider w='1060px' borderColor='red' />
            </VStack>

            <VStack>
                {
                    props.dates.length > 0 ? props.dates.map((item, index) => {
                        return (
                            <TableRow
                                key={item.fileNumber + item.prefix + item.type}
                                dateInfo={item}
                            />
                        )
                    }) : (
                        props.loggedIn ? (
                            props.error ? (
                                <Text>
                                    {`There was an error processing this request. Please try again later.`}
                                </Text>
                            ) : (
                                <Text>
                                    {`No critical dates found matching the given criteria: { type: ${props.type} | when: ${props.when} | status: ${props.status} }`}
                                </Text>
                            )
                        ) : (
                            <>
                                <Text>
                                    {`Please log in to access this data.`}
                                </Text>
                                <DateFilterButton
                                    text={'Login'}
                                    onClick={() => {navigate('/login')}}
                                    active={false}
                                />
                            </>
                        )
                    )
                }
            </VStack>
        </VStack>
    )
}

export default DatesTable;