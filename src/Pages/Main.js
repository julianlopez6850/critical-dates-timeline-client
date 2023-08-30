import { useEffect, useState, useContext } from 'react'
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
} from '@chakra-ui/react'

import DateFilterButton from '../Components/DateFilterButton'
import CustomDatePopover from '../Components/CustomDatePopover'
import DatesTable from '../Components/DatesTable'
import leadingZero from '../Helpers/leadingZero'

function Main() {

    const [styles, setStyles] = useState({
        pageW: '1200px', pageMarginBlock: '25px', fontSize: '16px', stackDir: 'row', titleFontSize: '20px', inputHeight: '30px',
        buttonTitleW: '65px', buttonPadding: '10px', tableW: '1060px', headerMargin: '8px', rowFontSize: '16px',
        tableStyles: {
            headers:{ dateHeaderW: '110px', fileNoHeaderW: '66px', eventHeaderW: '98px', infoHeaderW: '242px', statusHeaderW: '62px' },
            columns:{ dateColW: '90px', fileNoColW: '50px', eventColW: '81px', infoColW: '225px', statusColW: '59px',
                dateColPadding: '10px', numLines:1, margin: '8px', iconSize: '16px' }
        },
        paginationFontSize: '16px', paginationH: '36px', paginationPadding: '8px'
    });

    useEffect(() => {
        const windowListener = () => {
            if(window.innerWidth >= 1300) {
                setStyles({
                    pageW: '1200px', pageMarginBlock: '25px', fontSize: '16px', stackDir: 'row', titleFontSize: '20px', inputHeight: '30px',
                    buttonTitleW: '65px', buttonPadding: '10px', tableW: '1060px', headerMargin: '8px', rowFontSize: '16px',
                    tableStyles: {
                        headers:{ dateHeaderW: '110px', fileNoHeaderW: '66px', eventHeaderW: '98px', infoHeaderW: '242px', statusHeaderW: '62px' },
                        columns:{ dateColW: '90px', fileNoColW: '50px', eventColW: '81px', infoColW: '225px', statusColW: '59px',
                            dateColPadding: '10px', numLines:1, margin: '8px', iconSize: '16px' }
                    },
                    paginationFontSize: '16px', paginationH: '36px', paginationPadding: '8px'
                });
            } else if(window.innerWidth >= 1150) {
                setStyles({
                    pageW: '1060px', pageMarginBlock: '25px', fontSize: '16px', stackDir: 'row', titleFontSize: '20px', inputHeight: '30px',
                    buttonTitleW: '65px', buttonPadding: '10px', tableW: '1060px', headerMargin: '8px', rowFontSize: '16px',
                    tableStyles: {
                        headers:{ dateHeaderW: '110px', fileNoHeaderW: '66px', eventHeaderW: '104px', infoHeaderW: '240px', statusHeaderW: '62px' },
                        columns:{ dateColW: '90px', fileNoColW: '50px', eventColW: '87px', infoColW: '223px', statusColW: '59px',
                            dateColPadding: '10px', numLines:1, margin: '8px', iconSize: '16px' }
                    },
                    paginationFontSize: '16px', paginationH: '36px', paginationPadding: '8px'
                });
            } else if(window.innerWidth >= 900) {
                setStyles({
                    pageW: '850px', pageMarginBlock: '25px', fontSize: '14px', stackDir: 'row', titleFontSize: '20px', inputHeight: '28px',
                    buttonTitleW: '65px', buttonPadding: '6px', tableW: '850px', headerMargin: '8px', rowFontSize: '14px',
                    tableStyles: {
                        headers:{ dateHeaderW: '96px', fileNoHeaderW: '61px', eventHeaderW: '94px', infoHeaderW: '180px', statusHeaderW: '59px' },
                        columns:{ dateColW: '80px', fileNoColW: '44px', eventColW: '78px', infoColW: '163px', statusColW: '59px',
                            dateColPadding: '8px', numLines:1, margin: '8px', iconSize: '16px' }
                    },
                    paginationFontSize: '14px', paginationH: '34px', paginationPadding: '6px'
                });
            } else if(window.innerWidth >= 650) {
                setStyles({
                    pageW: '600px', pageMarginBlock: '10px', fontSize: '12px', stackDir: 'column', titleFontSize: '18px', inputHeight: '26px',
                    buttonTitleW: '65px', buttonPadding: '6px', tableW: '600px', headerMargin: '4px', rowFontSize: '12px',
                    tableStyles: {
                        headers:{ dateHeaderW: '75px', fileNoHeaderW: '53px', eventHeaderW: '72px', infoHeaderW: '117px', statusHeaderW: '49px' },
                        columns:{ dateColW: '65px', fileNoColW: '40px', eventColW: '60px', infoColW: '104px', statusColW: '49px',
                            dateColPadding: '5px', numLines:2, lineHeight:15, margin: '6px', iconSize: '14px' }
                    },
                    paginationFontSize: '12px', paginationH: '32px', paginationPadding: '4px'
                });
            } else if(window.innerWidth >= 530) {
                setStyles({
                    pageW: '480px', pageMarginBlock: '10px', fontSize: '10px', stackDir: 'column', titleFontSize: '16px', inputHeight: '24px',
                    buttonTitleW: '50px', buttonPadding: '4px', tableW: '480px', headerMargin: '2px', rowFontSize: '10px',
                    tableStyles: {
                        headers:{ dateHeaderW: '65px', fileNoHeaderW: '47px', eventHeaderW: '61px', infoHeaderW: '89px', statusHeaderW: '40px' },
                        columns:{ dateColW: '55px', fileNoColW: '38px', eventColW: '53px', infoColW: '80px', statusColW: '40px',
                            dateColPadding: '5px', numLines:2, lineHeight:15, margin: '4px', iconSize: '12px' }
                    },
                    paginationFontSize: '12px', paginationH: '28px', paginationPadding: '4px'
                });
            } else if(window.innerWidth >= 420) {
                setStyles({
                    pageW: '400px', pageMarginBlock: '10px', fontSize: '10px', stackDir: 'column', titleFontSize: '14px', inputHeight: '22px',
                    buttonTitleW: '50px', buttonPadding: '4px', tableW: '400px', headerMargin: '0px', rowFontSize: '8px',
                    tableStyles: {
                        headers:{ dateHeaderW: '52px', fileNoHeaderW: '44px', eventHeaderW: '48px', infoHeaderW: '72px', statusHeaderW: '40px' },
                        columns:{ dateColW: '44px', fileNoColW: '37px', eventColW: '42px', infoColW: '65px', statusColW: '40px',
                            dateColPadding: '4px', numLines:2, lineHeight:15, margin: '3px', iconSize: '12px' }
                    },
                    paginationFontSize: '10px', paginationH: '24px', paginationPadding: '4px'
                });
            } else {
                setStyles({
                    pageW: '320px', pageMarginBlock: '5px', fontSize: '8px', stackDir: 'column', titleFontSize: '14px', inputHeight: '20px',
                    buttonTitleW: '40px', buttonPadding: '4px', tableW: '320px', headerMargin: '-2px', rowFontSize: '8px',
                    tableStyles: {
                        headers:{ dateHeaderW: '50px', fileNoHeaderW: '39px', eventHeaderW: '48px', infoHeaderW: '50px', statusHeaderW: '33px' },
                        columns:{ dateColW: '44px', fileNoColW: '32px', eventColW: '42px', infoColW: '43px', statusColW: '33px',
                        dateColPadding: '3px', numLines:3, lineHeight:10, margin: '3px', iconSize: '10px' }
                    },
                    paginationFontSize: '10px', paginationH: '24px', paginationPadding: '4px'
                })
            };
        };
        windowListener();
        window.addEventListener('resize', windowListener);
        return () => window.removeEventListener('resize', windowListener);
    }, []);

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
        if(!profile.loggedIn) {
            setCriticalDates([]);
        } else {
            axiosInstance.get(`${process.env.REACT_APP_API_URL}/dates?type=${dateType.value}&dealType=${dealType.value}&startDate=${startDate || ''}&endDate=${endDate || ''}&isClosed=${isClosed}&sort=${sort.by},${sort.dir}&limit=${pageLimit}&pageNum=${pageNum}`).then((response) => {
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
        <VStack w='full' h='max-content' alignItems='center' marginBlock={styles.pageMarginBlock}>
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
        </VStack>
    )
}

export default Main;