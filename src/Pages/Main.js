import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { themeContext } from "../Helpers/themeContext";

import {
    Box,
    Button,
    Text,
    Table,
    TableContainer,
    Th,
    Td,
    Tr,
    Thead,
    TableCaption,
    Tbody,
    Tfoot,
    VStack,
    HStack,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverBody,
    Input,
    PopoverCloseButton,
    useDisclosure,
    
} from "@chakra-ui/react"
import DateFilterButton from "../Components/DateFilterButton";
import DatesTable from "../Components/Table";
import CustomDatePopover from '../Components/CustomDatePopover';

function Main() {

    const {theme, setTheme} = useContext(themeContext);
    const [criticalDates, setCriticalDates] = useState([]);
    const [dateType, setDateType] = useState({label: 'All', value: ''});
    const [when, setWhen] = useState('Today');
    const [status, setStatus] = useState('Open');
    const [startDate, setStartDate] = useState('2023-04-19');
    const [endDate, setEndDate] = useState('2023-06-30');
    const [isClosed, setIsClosed] = useState('false');
    const [prevWhen, setPrevWhen] = useState();
    const [customDates, setCustomDates] = useState();

    const { 
        isOpen: isOpenCustomDate, 
        onOpen: onOpenCustomDate, 
        onClose: onCloseCustomDate 
    } = useDisclosure()

    const types = [
        {label: 'All', value: ''}, 
        {label: 'Escrows', value: 'Escrow'},  
        {label: 'Closings', value: 'Closing'}, 
        {label: 'Inspections', value: 'Inspection'}
    ];
    const statuses = ['All', 'Open', 'Closed'];
    const timeframes = ['All', 'Past Due', 'Today', 'This Week', 'Upcoming', 'Custom'];

    const leadingZero = (num) => {
        if(num < 10)
            return '0' + num;
        return num;
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/dates?type=${dateType.value}&startDate=${startDate || ''}&endDate=${endDate || ''}&isClosed=${isClosed}`).then((response) => {
            setCriticalDates([]);
            response.data.dates.map((date) => {
                setCriticalDates((dates) => [...dates, date]);
            });
        }).catch((error) => {
            console.log('Error retrieving dates: ' + error.message);
            console.log(error)
        });
    }, [startDate, endDate, dateType, isClosed]);

    useEffect(() => {
        const today = new Date();
        const todayString = `${today.getUTCFullYear()}-${leadingZero(today.getUTCMonth() + 1)}-${leadingZero(today.getUTCDate())}`;
        if(when === 'All') {
            setStartDate('');
            setEndDate('');
        } else if(when === 'Past Due') {
            setStartDate('');
            setEndDate(todayString);
        } else if(when === 'Today') {
            setStartDate(todayString);
            setEndDate(todayString);
        } else if(when === 'This Week') {
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7)
            const weekString = `${nextWeek.getUTCFullYear()}-${leadingZero(nextWeek.getUTCMonth() + 1)}-${leadingZero(nextWeek.getUTCDate())}`;
            setStartDate(todayString);
            setEndDate(weekString);
        } else if(when === 'Upcoming') {
            setStartDate(todayString);
            setEndDate('');
        } if(when === 'Custom' && customDates) {
            setStartDate(customDates.start);
            setEndDate(customDates.end);
        }
    }, [when])

    useEffect(() => {
        if(status === 'Open')
            setIsClosed(false);
        else if(status === 'Closed')
            setIsClosed(true);
        else
            setIsClosed('')
    }, [status])

    useEffect(() => {
        console.log(prevWhen);
    }, [prevWhen])

    useEffect(() => {
        console.log(`start: ${startDate}`);
        console.log(`end: ${endDate}`);
    }, [startDate, endDate])

    useEffect(() => {
        console.log(customDates);
    }, [customDates])

    const doSetWhen = (newWhen) => {
        if(when !== 'Custom')
            setPrevWhen(when)
        if(when === 'Custom') {
            setCustomDates({start: startDate, end: endDate});
        }
        setWhen(newWhen);
    }
        
    return (
        <VStack w='full' h='max-content' alignItems='center' marginBlock='25px'>

            {/* Filter Buttons */}
            <HStack w='1200px' justifyContent='space-between'>
                {/* Type Filter */}
                <VStack>
                    <HStack w='full' spacing='0' alignSelf='start'>
                        <Text w='65px' marginInline='10px' fontWeight='bold' textAlign='left'>
                            TYPE:
                        </Text>
                        <Box>
                            {
                                types.map((item, index) => {
                                    return <DateFilterButton
                                        key={index}
                                        text={item.label}
                                        onClick={() => {setDateType(item)}}
                                        active={dateType.value === item.value}
                                    />
                                })
                            }
                        </Box>
                    </HStack>
                    {/* Status Filter */}
                    <HStack w='full' spacing='0' alignSelf='start'>
                        <Text w='65px' marginInline='10px' fontWeight='bold' textAlign='left'>
                            STATUS:
                        </Text>
                        <Box>
                            {   
                                statuses.map((item, index) => {
                                    return <DateFilterButton
                                        key={index}
                                        text={item}
                                        onClick={() => {setStatus(item)}}
                                        active={status === item}
                                    />
                                })
                            }
                        </Box>
                    </HStack>
                </VStack>
                
                {/* When Filter */}
                <HStack spacing='0' alignSelf='start'>
                    <Text marginInline='10px' fontWeight='bold'>
                        WHEN:
                    </Text>
                    {
                        timeframes.map((item, index) => {
                            return item === 'Custom' &&
                            <CustomDatePopover
                                key={index}
                                item={item}
                                when={when}
                                setWhen={doSetWhen}
                                prevWhen={prevWhen}
                                startDate={startDate}
                                endDate={endDate}
                                setStartDate={setStartDate}
                                setEndDate={setEndDate}
                                isOpen={isOpenCustomDate}
                                onOpen={onOpenCustomDate}
                                onClose={onCloseCustomDate}
                            /> ||
                            <DateFilterButton
                                key={index}
                                text={item}
                                onClick={() => {doSetWhen(item)}}
                                active={when === item}
                            />
                        })
                    }
                </HStack>
            </HStack>
            
            {/* Timeline Table Container */}
            <Box w='1200px'>
                <DatesTable
                    type={dateType.label}
                    when={when}
                    dates={criticalDates}
                    status={status}
                />
            </Box>
        </VStack>
    )
}

export default Main;