import { useContext, useEffect, useState } from 'react';
import { profileContext } from '../Helpers/profileContext';

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
import PaginationButtons from './PaginationButtons';

const DatesTable = (props) => {
    const [tableStyles, setTableStyles] = useState({
        tableW: '1082px', headerMargin: '8px', rowFontSize: '16px',
        paginationFontSize: '16px', paginationH: '36px', paginationPadding: '8px',
        headers:{ dateHeaderW: '110px', fileNoHeaderW: '88px', eventHeaderW: '98px', infoHeaderW: '242px', statusHeaderW: '62px' },
        columns:{ dateColW: '90px', fileNoColW: '72px', eventColW: '81px', infoColW: '225px', statusColW: '59px',
            dateColPadding: '10px', numLines:1, margin: '8px', iconSize: '16px' }
    });

    useEffect(() => {
        const windowListener = () => {
            if(window.innerWidth >= 1200) {
                setTableStyles({
                    tableW: '1082px', headerMargin: '8px', rowFontSize: '16px',
                    paginationFontSize: '16px', paginationH: '36px', paginationPadding: '8px',
                    headers:{ dateHeaderW: '110px', fileNoHeaderW: '88px', eventHeaderW: '98px', infoHeaderW: '242px', statusHeaderW: '62px' },
                    columns:{ dateColW: '90px', fileNoColW: '72px', eventColW: '81px', infoColW: '225px', statusColW: '59px',
                        dateColPadding: '10px', numLines:1, margin: '8px', iconSize: '16px' }
                });
            } else if(window.innerWidth >= 950) {
                setTableStyles({
                    tableW: '868px', headerMargin: '8px', rowFontSize: '14px',
                    paginationFontSize: '14px', paginationH: '34px', paginationPadding: '6px',
                    headers:{ dateHeaderW: '96px', fileNoHeaderW: '81px', eventHeaderW: '92px', infoHeaderW: '180px', statusHeaderW: '59px' },
                    columns:{ dateColW: '80px', fileNoColW: '64px', eventColW: '76px', infoColW: '163px', statusColW: '59px',
                        dateColPadding: '8px', numLines:1, margin: '8px', iconSize: '16px' }
                });
            } else if(window.innerWidth >= 650) {
                setTableStyles({
                    tableW: '615px', headerMargin: '4px', rowFontSize: '12px',
                    paginationFontSize: '12px', paginationH: '32px', paginationPadding: '4px',
                    headers:{ dateHeaderW: '75px', fileNoHeaderW: '67px', eventHeaderW: '73px', infoHeaderW: '117px', statusHeaderW: '49px' },
                    columns:{ dateColW: '65px', fileNoColW: '55px', eventColW: '60px', infoColW: '104px', statusColW: '49px',
                        dateColPadding: '5px', numLines:2, lineHeight:15, margin: '6px', iconSize: '14px' }
                });
            } else if(window.innerWidth >= 530) {
                setTableStyles({
                    tableW: '490px', headerMargin: '2px', rowFontSize: '10px',
                    paginationFontSize: '12px', paginationH: '28px', paginationPadding: '4px',
                    headers:{ dateHeaderW: '65px', fileNoHeaderW: '54px', eventHeaderW: '61px', infoHeaderW: '90px', statusHeaderW: '40px' },
                    columns:{ dateColW: '55px', fileNoColW: '45px', eventColW: '53px', infoColW: '81px', statusColW: '40px',
                        dateColPadding: '5px', numLines:2, lineHeight:15, margin: '4px', iconSize: '12px' }
                });
            } else if(window.innerWidth >= 420) {
                setTableStyles({
                    tableW: '400px', headerMargin: '0px', rowFontSize: '8px',
                    paginationFontSize: '10px', paginationH: '24px', paginationPadding: '4px',
                    headers:{ dateHeaderW: '52px', fileNoHeaderW: '44px', eventHeaderW: '48px', infoHeaderW: '72px', statusHeaderW: '40px' },
                    columns:{ dateColW: '44px', fileNoColW: '37px', eventColW: '42px', infoColW: '65px', statusColW: '40px',
                        dateColPadding: '4px', numLines:2, lineHeight:15, margin: '3px', iconSize: '12px' }
                });
            } else {
                setTableStyles({
                    tableW: '324px', headerMargin: '-2px', rowFontSize: '8px',
                    paginationFontSize: '10px', paginationH: '24px', paginationPadding: '4px',
                    headers:{ dateHeaderW: '50px', fileNoHeaderW: '43px', eventHeaderW: '48px', infoHeaderW: '50px', statusHeaderW: '33px' },
                    columns:{ dateColW: '44px', fileNoColW: '36px', eventColW: '42px', infoColW: '43px', statusColW: '33px',
                        dateColPadding: '3px', numLines:3, lineHeight:10, margin: '3px', iconSize: '10px' }
                })
            };
        };
        windowListener();
        window.addEventListener('resize', windowListener);
        return () => window.removeEventListener('resize', windowListener);
    }, []);
    
    const { profile } = useContext(profileContext);

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
                        <Box w='10px' h='10px' mb='-3px' bgColor='red'/>
                        <Text>: Past Due</Text>
                    </HStack>
                    <HStack w='full'>
                        <Box w='10px' h='10px' mb='-3px' bgColor='orange'/>
                        <Text>: Today</Text>
                    </HStack>
                    <HStack w='full'>
                        <Box w='10px' h='10px' mb='-3px' bgColor='green'/>
                        <Text>: Upcoming</Text>
                    </HStack>
                    <HStack w='full'>
                        <Box w='10px' h='10px' mb='-3px' bgColor='black'/>
                        <Text>: Completed</Text>
                    </HStack>
                    <HStack w='full'>
                        <Box w='10px' h='10px' mb='-3px' bgColor='#444466'/>
                        <Text>: Cancelled </Text>
                    </HStack>
                </VStack>
            }>
                <span>Date <InfoIcon/></span>
            </Tooltip>,
            w:tableStyles.headers.dateHeaderW,
            sortable: true
        },
        {
            label: 'FileNumber',
            text:'File #',
            w:tableStyles.headers.fileNoHeaderW,
            sortable: true
        },
        {
            label: 'Event',
            text:'Event',
            w:tableStyles.headers.eventHeaderW,
            sortable: false
        },
        {
            label: 'Buyer',
            text:'Buyer',
            w:tableStyles.headers.infoHeaderW,
            sortable: true
        },
        {
            label: 'Seller',
            text:'Seller',
            w:tableStyles.headers.infoHeaderW,
            sortable: true
        },
        {
            label: 'Address',
            text:'Address',
            w:tableStyles.headers.infoHeaderW,
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
                        <Text mb='1px' color='red.500'><LockIcon/></Text>
                        <Text>: Completed</Text>
                    </HStack>
                    <HStack w='full'>
                        <Text mb='1px' color='red.800'><LockIcon/></Text>
                        <Text>: File Closed </Text>
                    </HStack>
                    <HStack w='full'>
                        <Text mb='1px' color='#444466'><LockIcon/></Text>
                        <Text>: File Cancelled </Text>
                    </HStack>
                </VStack>
            }>
                <HStack spacing='3.2px'>
                    <span>Status</span><InfoIcon/>
                </HStack>
            </Tooltip>,
            w:tableStyles.headers.statusHeaderW,
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
            <VStack spacing={tableStyles.headerMargin}>
                {/* Dates Table Title */}
                <Text fontSize={props.titleFontSize} fontWeight='bold'>
                    {`${filterCount() === 0  ? 'All' :
                        filterCount() === 1  ? `All ${filterString}` :
                        filterString
                    }`}
                </Text>
                <PaginationButtons
                    profile={profile}
                    paginationH={tableStyles.paginationH}
                    paginationFontSize={tableStyles.paginationFontSize}
                    paginationPadding={tableStyles.paginationPadding}
                    popoverDir='bottom'
                    pageNum={props.pageNum}
                    setPageNum={props.setPageNum}
                    limit={props.limit}
                    setLimit={props.setLimit}
                    bounds={props.bounds}
                    total={props.total}
                    setLoading={props.setLoading}
                />

                <Divider w={tableStyles.tableW} borderColor='red' marginTop='4px !important'/>

                {/* Table Column Headers */}
                <HStack w={`${parseInt(tableStyles.tableW.slice(0,-2)) + 10}px`} spacing='0' pl='5px'>
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

                <Divider w={tableStyles.tableW} borderColor='red'/>
            </VStack>

            <VStack>
                {
                    props.dates.length > 0 ? (
                        <>
                            {props.dates.map((item) => {
                                return (
                                    <TableRow
                                        tableStyles={tableStyles}
                                        key={item.fileNumber + item.prefix + item.type}
                                        dateInfo={item}
                                    />
                                )
                            })}
                            <PaginationButtons
                                profile={profile}
                                paginationH={tableStyles.paginationH}
                                paginationFontSize={tableStyles.paginationFontSize}
                                paginationPadding={tableStyles.paginationPadding}
                                popoverDir='top'
                                pageNum={props.pageNum}
                                setPageNum={props.setPageNum}
                                limit={props.limit}
                                setLimit={props.setLimit}
                                bounds={props.bounds}
                                total={props.total}
                                setLoading={props.setLoading}
                            />
                        </>
                    ) : (
                        props.error ? (
                            <Text>
                                {`There was an error processing this request. Please try again later.`}
                            </Text>
                        ) : (
                            <Text>
                                {`No critical dates found matching the given criteria: { deal: ${deal} | type: ${event} | when: ${when} | status: ${status} }`}
                            </Text>
                        )
                    )
                }
            </VStack>
        </VStack>
    )
}

export default DatesTable;