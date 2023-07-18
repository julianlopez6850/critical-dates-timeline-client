import { useNavigate } from 'react-router-dom';

import {
    Box,
    Divider,
    HStack,
    Icon,
    Text,
    Tooltip,
    VStack
} from '@chakra-ui/react';
import { InfoIcon, LockIcon, MinusIcon, TriangleDownIcon, TriangleUpIcon, UnlockIcon } from '@chakra-ui/icons';

import TableRow from './TableRow';
import DateFilterButton from './DateFilterButton';

const DatesTable = (props) => {
    
    const navigate = useNavigate();

    const updateSort = (col) => {
        props.setSort(sort => {
            return { by: col, dir: sort.by === col && sort.dir === 'ASC' ? 'DESC' : 'ASC' };
        });
    }
    
    const columnHeaders = [
        {
            label: 'Date',
            text: <Tooltip borderRadius='5px' mt='-5px' closeOnClick={false} label={
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
            w:'110px',
            sortable: true
        },
        {
            label: 'FileNumber',
            text:'File #',
            w:'66px',
            sortable: true
        },
        {
            label: 'Event',
            text:'Event',
            w:'98px',
            sortable: false
        },
        {
            label: 'Buyer',
            text:'Buyer',
            w:'242px',
            sortable: true
        },
        {
            label: 'Seller',
            text:'Seller',
            w:'242px',
            sortable: true
        },
        {
            label: 'Address',
            text:'Address',
            w:'242px',
            sortable: true
        },
        {
            label: 'Status',
            text: <Tooltip borderRadius='5px' mt='-5px' closeOnClick={false} label={
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
                <HStack spacing='3.2px'>
                    <span>Status</span><InfoIcon/>
                </HStack>
            </Tooltip>,
            w:'62px',
            sortable: false
        },
    ]

    return (
        <VStack>
            <VStack>
                <Text fontSize='20px' fontWeight='bold'>
                    {`${props.type} | ${props.when}`}
                </Text>

                <Divider w='1060px' borderColor='red' />

                {/* Table Column Headers */}
                <HStack w='1120px' spacing='0' pl='30px'>
                    {
                        columnHeaders.map((item, index) => 
                            <HStack
                                w={item.w} key={index} h='30px' spacing='5px' justifyContent='left' fontWeight='normal'
                                _hover={[item.sortable ? {cursor:'pointer', fontWeight:'bold'} : {}]}
                                onClick={() => {
                                    if(item.sortable) updateSort(item.label);
                                }}
                            >
                                <Box userSelect='none'>
                                    {item.text}
                                    {item.sortable && <Icon
                                        as={props.sort.by === item.label ? (props.sort.dir === 'ASC' ? TriangleUpIcon : TriangleDownIcon) : MinusIcon} ml='5px' p='1px'
                                        color={!(props.sort.by === item.label) ? 'transparent' : ''}
                                    />}
                                </Box>
                            </HStack>
                        )
                    }
                </HStack>

                <Divider w='1060px' borderColor='red' />
            </VStack>

            <VStack>
                {
                    props.dates.length > 0 ? props.dates.map((item) => {
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
                                    fontSize={'24'}
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