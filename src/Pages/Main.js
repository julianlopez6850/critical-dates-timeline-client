import { useEffect, useState, useContext } from 'react'
import { profileContext } from '../Helpers/profileContext'
import { axiosInstance } from '../Helpers/axiosInstance'

import {
    Box,
    Text,
    VStack,
    HStack,
    useDisclosure,
    Spinner,
    useToast,
} from '@chakra-ui/react'

import DateFilterButton from '../Components/DateFilterButton'
import CustomDatePopover from '../Components/CustomDatePopover'
import DatesTable from '../Components/Table'

function Main() {

    const { profile, setProfile } = useContext(profileContext);

    const toast = useToast();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [criticalDates, setCriticalDates] = useState([]);
    const [dateType, setDateType] = useState({label: 'All', value: ''});
    const [when, setWhen] = useState('All');
    const [status, setStatus] = useState('Open');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isClosed, setIsClosed] = useState(false);
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
        axiosInstance.get(`http://localhost:5000/auth/profile`).then((response) => {
            setProfile(profile => {
                return {...profile, loggedIn: true, user: response.data.username, actions: profile.actions + 1, settings: response.data.settings }
            })
        }).catch((error) => {
            setProfile(profile => {
                return {...profile, loggedIn: false, user: '' }
            })
            setCriticalDates([]);
            setLoading(false);
            if (error.response)
                console.warn('You are not logged in. Please log in to view this content.');
            else
                console.warn('ERROR: Server is currently unavailable. Please try again later.');
        });
    }, [startDate, endDate, dateType, isClosed]);

    useEffect(() => {
        if(!profile.loggedIn) {
            setCriticalDates([]);
        } else {
            axiosInstance.get(`http://localhost:5000/dates?type=${dateType.value}&startDate=${startDate || ''}&endDate=${endDate || ''}&isClosed=${isClosed}`).then((response) => {
                setCriticalDates(response.data.dates);
                setLoading(false);
            }).catch(() => {
                setCriticalDates([]);
                setError(true);
                setLoading(false);
                console.warn('ERROR: A problem occurred while trying to retrieve dates. Please try again later.');
                toast({
                    title: 'Error.',
                    description: 'An error occurred while trying to retrieve dates. Try again later',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            });
        }
    }, [profile.loggedIn, profile.actions])

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

    const doSetWhen = (newWhen) => {
        if(when !== 'Custom')
            setPrevWhen(when)
        if(when === 'Custom')
            setCustomDates({start: startDate, end: endDate});
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
            
            <HStack w='full' justifyContent='center'>
                {/* Timeline Table Container */}
                <Box w='1200px'>
                    {loading && (
                        <Box h='250px' display='flex' alignItems='center' justifyContent='center'>
                            <Spinner/>
                        </Box> ) || (
                        <DatesTable
                            loggedIn={profile.loggedIn}
                            error={error}
                            type={dateType.label}
                            when={when}
                            dates={criticalDates}
                            status={status}
                        /> )
                    }
                </Box>
            </HStack>
        </VStack>
    )
}

export default Main;