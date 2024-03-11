import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { profileContext } from '../Helpers/profileContext'
import { axiosInstance } from '../Helpers/axiosInstance'

import {
    Box,
    Text,
    Stack,
    VStack,
    HStack,
    useDisclosure,
    Spinner,
    useToast,
    Link,
} from '@chakra-ui/react'

import DateFilterButton from '../Components/DateFilterButton'
import CustomDatePopover from '../Components/CustomDatePopover'
import DatesTable from '../Components/DatesTable'
import leadingZero from '../Helpers/leadingZero'

import stagingCriticalDates from '../Helpers/Staging/stagingCriticalDates'

function Dates() {

    const [styles, setStyles] = useState({
        pageW: '1200px', pageMarginBlock: '25px', fontSize: '16px', stackDir: 'row', titleFontSize: '20px', inputHeight: '30px',
        buttonTitleW: '65px', buttonPadding: '10px'
    });

    useEffect(() => {
        // STAGING ENVIRONMENT - Store default dates in localStorage if no dates exist or all were deleted.
        if(process.env.REACT_APP_ENV === 'staging') {
            var storedDates = JSON.parse(localStorage.getItem('dates')) || {};
            if(Object.keys(storedDates).length === 0) {
                storedDates = {};
                stagingCriticalDates.forEach(date => {
                    storedDates[date.fileNumber + date.type + date.prefix] = date;
                })
                localStorage.setItem('dates', JSON.stringify(storedDates));
            }
        }

        const windowListener = () => {
            if(window.innerWidth >= 1300) {
                setStyles({
                    pageW: '1200px', pageMarginBlock: '25px', fontSize: '16px', stackDir: 'row', titleFontSize: '20px', inputHeight: '30px',
                    buttonTitleW: '65px', buttonPadding: '10px'
                });
            } else if(window.innerWidth >= 1200) {
                setStyles({
                    pageW: '1100px', pageMarginBlock: '25px', fontSize: '16px', stackDir: 'row', titleFontSize: '20px', inputHeight: '30px',
                    buttonTitleW: '65px', buttonPadding: '10px'
                });
            } else if(window.innerWidth >= 950) {
                setStyles({
                    pageW: '880px', pageMarginBlock: '25px', fontSize: '14px', stackDir: 'row', titleFontSize: '20px', inputHeight: '28px',
                    buttonTitleW: '65px', buttonPadding: '6px'
                });
            } else if(window.innerWidth >= 650) {
                setStyles({
                    pageW: '600px', pageMarginBlock: '10px', fontSize: '12px', stackDir: 'column', titleFontSize: '18px', inputHeight: '26px',
                    buttonTitleW: '65px', buttonPadding: '6px'
                });
            } else if(window.innerWidth >= 530) {
                setStyles({
                    pageW: '480px', pageMarginBlock: '10px', fontSize: '10px', stackDir: 'column', titleFontSize: '16px', inputHeight: '24px',
                    buttonTitleW: '50px', buttonPadding: '4px'
                });
            } else if(window.innerWidth >= 420) {
                setStyles({
                    pageW: '400px', pageMarginBlock: '10px', fontSize: '10px', stackDir: 'column', titleFontSize: '14px', inputHeight: '22px',
                    buttonTitleW: '50px', buttonPadding: '4px'
                });
            } else {
                setStyles({
                    pageW: '320px', pageMarginBlock: '5px', fontSize: '8px', stackDir: 'column', titleFontSize: '14px', inputHeight: '20px',
                    buttonTitleW: '40px', buttonPadding: '4px'
                })
            };
        };
        windowListener();
        window.addEventListener('resize', windowListener);
        return () => window.removeEventListener('resize', windowListener);
    }, []);

    const navigate = useNavigate();
    const { profile, setProfile } = useContext(profileContext);

    const toast = useToast();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [criticalDates, setCriticalDates] = useState([]);
    const [dateType, setDateType] = useState({label: 'All', value: ''});
    const [dealType, setDealType] = useState({label: 'All', value: ''});
    const [when, setWhen] = useState('All');
    const [status, setStatus] = useState('Open');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isClosed, setIsClosed] = useState(false);
    const [prevWhen, setPrevWhen] = useState();
    const [customDates, setCustomDates] = useState();
    const [sort, setSort] = useState({ by: 'Date', dir: 'ASC' });
    const [pageNum, setPageNum] = useState(1)
    const [pageLimit, setPageLimit] = useState(50);
    const [bounds, setBounds] = useState([1,1]);
    const [total, setTotal] = useState(1);

    const { 
        isOpen: isOpenCustomDate, 
        onOpen: onOpenCustomDate, 
        onClose: onCloseCustomDate 
    } = useDisclosure()

    const dateTypes = [
        {label: 'All', value: ''}, 
        {label: 'Escrows', value: 'Escrow'},  
        {label: 'Closings', value: 'Closing'}, 
        {label: 'Inspections', value: 'Inspection'}
    ];
    const dealTypes = [
        {label: 'All', value: ''},
        {label: 'Sales', value: 'Sale'},
        {label: 'Purchases', value: 'Purchase'},
        {label: 'Refinances', value: 'Refinance'},
    ];
    const statuses = ['All', 'Open', 'Closed'];
    const timeframes = ['All', 'Past Due', 'Today', 'This Week', 'Upcoming', 'Custom'];

    useEffect(() => {
        // STAGING ENVIRONMENT - Save Profile Settings
        if(process.env.REACT_APP_ENV === 'staging') {
            const settings = {
                "Mon":{"active":true,"time":"08:00"},
                "Tue":{"active":true,"time":"08:00"},
                "Wed":{"active":true,"time":"08:00"},
                "Thu":{"active":true,"time":"08:00"},
                "Fri":{"active":true,"time":"08:00"},
                "Sat":{"active":false,"time":"08:00"},
                "Sun":{"active":false,"time":"08:00"},
            };
            var storedSettings = JSON.parse(localStorage.getItem('settings')) || {};
            var darkMode = Object.keys(storedSettings).length > 0 ? storedSettings.darkMode : false;
            setProfile(profile => {
                return {...profile, loggedIn: true, user: 'guest', darkMode: darkMode, notificationSettings: settings }
            })
            setLoading(false);
            return;
        }

        // PRODUCTION ENVIRONMENT - Save Profile Settings
        axiosInstance.get(`${process.env.REACT_APP_API_URL}/auth/profile`).then((response) => {
            const settings = response.data.settings;
            const darkMode = settings.darkMode;
            delete settings.darkMode;
            setProfile(profile => {
                return {...profile, loggedIn: true, user: response.data.username, actions: profile.actions + 1, darkMode: darkMode, notificationSettings: settings }
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
    }, [startDate, endDate, dateType, dealType, isClosed, sort, pageNum, pageLimit]);

    useEffect(() => {
        setCriticalDates([]);
        if(!profile.loggedIn)
            return;

        // STAGING ENVIRONMENT - Filtering & Ordering Dates
        if(process.env.REACT_APP_ENV === 'staging') {
            var storedDates = JSON.parse(localStorage.getItem('dates'));
            Object.entries(storedDates).forEach((date, index) => {
                date = date[1];

                // Filter by Date Type
                if(date.type !== dateType.value && dateType.value !== '')
                    return;

                // Filter Deal Type (Refinances vs Purchases vs Sales)
                var isRefinance = date.File.isPurchase == false;
                var isPurchase = date.File.whoRepresenting === 'Buyer';
                if((dealType.value === 'Refinance') != isRefinance && dealType.value !== '')
                    return;
                if(date.File.isPurchase && (dealType.value === 'Purchase') != isPurchase && date.File.whoRepresenting !== 'Both' && dealType.value !== '')
                    return;
                
                // Filter by Date Status
                if(isClosed !== '') {
                    if(!isClosed && (date.isClosed || date.File.status != 'Open'))
                        return;
                    else if(isClosed && !date.isClosed && date.File.status === 'Open')
                        return;
                }

                // If a custom date is selected, format startDate and endDate correctly.
                var M, D, Y, customStart, customEnd;
                if (when === 'Custom' && startDate) {
                    M = startDate.slice(0,2);
                    D = startDate.slice(3,5);
                    Y = startDate.slice(6) >= 2000 && startDate.slice(6) < 2050 ? startDate.slice(6) : 'YYYY'

                    customStart = `${Y}-${M}-${D}`;
                }
                if (when === 'Custom' && endDate) {
                    M = endDate.slice(0,2);
                    D = endDate.slice(3,5);
                    Y = endDate.slice(6) >= 2000 && endDate.slice(6) < 2050 ? endDate.slice(6) : 'YYYY'

                    customEnd = `${Y}-${M}-${D}`;
                }
                
                // Filter by Date
                if(startDate !== '' && date.date < (when === 'Custom' ? customStart : startDate))
                    return;
                if(endDate !== '' && date.date > (when === 'Custom' ? customEnd : endDate))
                    return;

                // Fill criticalDates hook array with filtered dates.
                // Order criticalDates by sort.by & sort.dir when filled.
                if(index === Object.entries(storedDates).length - 1)
                    setCriticalDates((dates) => {
                        dates = [...dates, date]
                        return dates.sort((a, b) => {
                            if(sort.by === 'Date')
                                return sort.dir === 'ASC' ? a.date > b.date : a.date < b.date;
                            else if(sort.by === 'FileNumber')
                                return sort.dir === 'ASC' ? a.fileNumber > b.fileNumber : a.fileNumber < b.fileNumber;
                            else {
                                var by = (sort.by === 'Buyer') ? 'buyer' : (sort.by === 'Seller') ? 'seller' : 'address';
                                return sort.dir === 'ASC' ? a.File[by] > b.File[by] : a.File[by] < b.File[by];
                            }
                        })
                    });
                else
                    setCriticalDates((dates) => dates = [...dates, date]);
            });
        } else axiosInstance.get(`${process.env.REACT_APP_API_URL}/dates?type=${dateType.value}&dealType=${dealType.value}&startDate=${startDate || ''}&endDate=${endDate || ''}&isClosed=${isClosed}&sort=${sort.by},${sort.dir}&limit=${pageLimit}&pageNum=${pageNum}`).then((response) => {
            const data = response.data;
            if(data.start && data.start !== 1 && data.dates.length === 0) return;
            setBounds([data.start, data.end]);
            setTotal(data.total);
            setCriticalDates(data.dates);
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
        <VStack w='full' h='max-content' alignItems='center' marginBlock={styles.pageMarginBlock}>
            {profile.loggedIn ? (
            <>
                {process.env.REACT_APP_ENV === 'staging' ? 
                    <Box
                        w={styles.pageW}
                        border='1px solid var(--navbar-seperator)'
                        borderRadius='20px'
                        backgroundColor='blackAlpha.500'
                        display='flex'
                        justifyContent='center'
                        boxShadow='2px 3px var(--navbar-seperator)'
                    >
                        <Text whiteSpace='pre-line' textAlign='justify' w='90%' marginBlock='5px' fontSize={styles.fontSize}>
                            Welcome to the Critical Dates Schedule web app! This web application was created to store
                            and manage information for real estate transactions, and keep track of important upcoming
                            deadlines for each file.
                            {'\n\n'}
                            Note: This is the staging environment used to test version updates of this web application.
                            You have automatically been logged in as a guest. Feel free to play around with the app.
                            All files, dates, and settings data that you create/update will be stored locally in your
                            browser's localStorage.
                            {'\n\n'}
                            Feel free to{' '}
                            <Link
                                textDecor='underline'
                                href={`mailto:${process.env.REACT_APP_OWNER_EMAIL}`}
                            >
                                contact me
                            </Link> if you have any questions or suggestions, or{' '}
                            <Link
                                textDecor='underline'
                                href={process.env.REACT_APP_OWNER_LINK}
                                isExternal
                            >
                                visit my site
                            </Link> to learn more about me and my work!
                        </Text>
                    </Box>
                    : <></>
                }
                {/* Filter Buttons */}
                <Stack w={styles.pageW} justifyContent='space-between' direction={styles.stackDir} spacing={styles.buttonPadding}>
                    {/* Date Type Filter */}
                    <VStack spacing={styles.buttonPadding}>
                        <HStack w='full' spacing='0' alignSelf='start'>
                            <Text w={styles.buttonTitleW} fontSize={styles.fontSize} fontWeight='bold' textAlign='left'>
                                TYPE:
                            </Text>
                            <>
                                {
                                    dateTypes.map((item, index) => {
                                        return <DateFilterButton
                                            key={index}
                                            text={item.label}
                                            fontSize={styles.fontSize}
                                            padding={styles.buttonPadding}
                                            onClick={() => {setDateType(item); setPageNum(1)}}
                                            active={dateType.value === item.value}
                                        />
                                    })
                                }
                            </>
                        </HStack>
                        {/* Deal Type Filter */}
                        <HStack w='full' spacing='0' alignSelf='start'>
                            <Text w={styles.buttonTitleW} fontSize={styles.fontSize} fontWeight='bold' textAlign='left'>
                                DEAL:
                            </Text>
                            <>
                                {
                                    dealTypes.map((item, index) => {
                                        return <DateFilterButton
                                            key={index}
                                            text={item.label}
                                            fontSize={styles.fontSize}
                                            padding={styles.buttonPadding}
                                            onClick={() => {setDealType(item); setPageNum(1)}}
                                            active={dealType.value === item.value}
                                        />
                                    })
                                }
                            </>
                        </HStack>
                    </VStack>
                    <VStack spacing={styles.buttonPadding}>
                        {/* When Filter */}
                        <HStack spacing='0' alignSelf='start'>
                            <Text w={styles.buttonTitleW} fontSize={styles.fontSize} fontWeight='bold' textAlign='left'>
                                WHEN:
                            </Text>
                            {
                                timeframes.map((item, index) => {
                                    return item === 'Custom' &&
                                    <CustomDatePopover
                                        key={index}
                                        text={item}
                                        fontSize={styles.fontSize}
                                        inputHeight={styles.titleFontSize}
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
                                        setPageNum={setPageNum}
                                    /> ||
                                    <DateFilterButton
                                        key={index}
                                        text={item}
                                        fontSize={styles.fontSize}
                                        padding={styles.buttonPadding}
                                        onClick={() => {doSetWhen(item); setPageNum(1)}}
                                        active={when === item}
                                    />
                                })
                            }
                        </HStack>
                        {/* Status Filter */}
                        <HStack w='full' spacing='0' alignSelf='start'>
                            <Text w={styles.buttonTitleW} fontSize={styles.fontSize} fontWeight='bold' textAlign='left'>
                                STATUS:
                            </Text>
                            <>
                                {   
                                    statuses.map((item, index) => {
                                        return <DateFilterButton
                                            key={index}
                                            text={item}
                                            fontSize={styles.fontSize}
                                            padding={styles.buttonPadding}
                                            onClick={() => {setStatus(item); setPageNum(1)}}
                                            active={status === item}
                                        />
                                    })
                                }
                            </>
                        </HStack>
                    </VStack>
                </Stack>
                
                <HStack w='full' justifyContent='center'>
                    {/* Timeline Table Container */}
                    <Box w='1200px'>
                        {loading && (
                            <Box h='250px' display='flex' alignItems='center' justifyContent='center'>
                                <Spinner/>
                            </Box> ) || (
                            <DatesTable
                                {...styles}
                                loggedIn={profile.loggedIn}
                                error={error}
                                type={dateType.label}
                                dealType={dealType.label}
                                when={when}
                                dates={criticalDates}
                                status={status}
                                sort={sort}
                                setSort={setSort}
                                pageNum={pageNum}
                                setPageNum={setPageNum}
                                limit={pageLimit}
                                setLimit={setPageLimit}
                                bounds={bounds}
                                total={total}
                                setLoading={setLoading}
                            /> )
                        }
                    </Box>
                </HStack>
            </>
            ) : !loading && (
                <>
                    <Text>
                        {`Welcome Guest! Please Login to View This Page.`}
                    </Text>
                    <DateFilterButton
                        text={'Login'}
                        onClick={() => {navigate('/login')}}
                        active={false}
                        fontSize={`${parseInt(styles.fontSize.slice(0,-2)) * 1.5}px`}
                    />
                </>
            )}
        </VStack>
    )
}

export default Dates;