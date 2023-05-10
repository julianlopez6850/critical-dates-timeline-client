import { Box, Divider, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import TableRow from "./TableRow";
import { InfoIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';

const DatesTable = (props) => {
    
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
                        <Text mb='1px' color='red'><LockIcon/></Text>
                        <Text>: Completed</Text>
                    </HStack>
                    <HStack w='full'>
                        <Text mb='2px'><UnlockIcon/></Text>
                        <Text>: Ongoing</Text>
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
                                key={item.date + item.prefix + item.type}
                                dateInfo={item}
                            />
                        )
                    }) : (
                        <Text>
                            {`No critical dates found with the given criteria: { type: ${props.type} | when: ${props.when} | status: ${props.status} }`}
                        </Text>
                    )
                }
            </VStack>
        </VStack>
    )
}

export default DatesTable;