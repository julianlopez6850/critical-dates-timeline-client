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
                <VStack fontSize={props.fontSize}>
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
            w:props.colWidths.headers.dateHeaderW,
            sortable: true
        },
        {
            label: 'FileNumber',
            text:'File #',
            w:props.colWidths.headers.fileNoHeaderW,
            sortable: true
        },
        {
            label: 'Event',
            text:'Event',
            w:props.colWidths.headers.eventHeaderW,
            sortable: false
        },
        {
            label: 'Buyer',
            text:'Buyer',
            w:props.colWidths.headers.infoHeaderW,
            sortable: true
        },
        {
            label: 'Seller',
            text:'Seller',
            w:props.colWidths.headers.infoHeaderW,
            sortable: true
        },
        {
            label: 'Address',
            text:'Address',
            w:props.colWidths.headers.infoHeaderW,
            sortable: true
        },
        {
            label: 'Status',
            text: <Tooltip borderRadius='5px' mt='-5px' closeOnClick={false} label={
                <VStack fontSize={props.fontSize}>
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
            w:props.colWidths.headers.statusHeaderW,
            sortable: false
        },
    ]

    const deal = props.dealType
    const event = props.type
    const when = props.when
    const status = props.status
    var filterString = ''

    // Count the number of table filters that are not set to 'All'
    const filterCount = () => {
        filterString = '';
        var count = 0;
        [status, deal, event, when].forEach((item) => {
            if(item !== 'All') {
                filterString += item + ' | ';
                count++;
            }
        })
        filterString = filterString.slice(0,-3);
        return count;
    }

    return (
        <VStack fontSize={props.fontSize}>
            <VStack spacing={props.headerMargin}>
                {/* Dates Table Title */}
                <Text fontSize={props.titleFontSize} fontWeight='bold'>
                    {`${filterCount() === 0  ? 'All' :
                        filterCount() === 1  ? `All ${filterString}` :
                        filterString
                    }`}
                </Text>

                <Divider w={props.tableWidth} borderColor='red' marginTop='4px !important'/>

                {/* Table Column Headers */}
                <HStack w={`${parseInt(props.tableWidth.slice(0,-2)) + 10}px`} spacing='0' pl='5px'>
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

                <Divider w={props.tableWidth} borderColor='red' />
            </VStack>

            <VStack>
                {
                    props.dates.length > 0 ? props.dates.map((item) => {
                        return (
                            <TableRow
                                tableWidth={props.tableWidth}
                                colWidths={props.colWidths}
                                fontSize={props.rowFontSize}
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
                                    {`No critical dates found matching the given criteria: { deal: ${deal} | type: ${event} | when: ${when} | status: ${status} }`}
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
                                    fontSize={`${parseInt(props.fontSize.slice(0,-2)) * 1.5}px`}
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