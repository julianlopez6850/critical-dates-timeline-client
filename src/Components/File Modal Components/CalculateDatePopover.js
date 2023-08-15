import { useEffect, useState } from 'react';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    VStack,
    HStack,
    Text,
    Button,
    TabList,
    Tab,
    Tabs,
    NumberInput,
    NumberInputField,
    NumberDecrementStepper,
    NumberInputStepper,
    NumberIncrementStepper,
    PopoverFooter,
    Box,
    useDisclosure,
    Tooltip,
    Icon,
} from '@chakra-ui/react';
import { CalculateOutlined } from '@mui/icons-material';

import DateInput from '../DateInput';
import DateSelect from './DateSelect';
import calculateNewDate from '../../Helpers/calculateNewDate';
import trySetDate from '../../Helpers/trySetDate';

const CalculateDatePopover = (props) => {
    
    const { onOpen, onClose, isOpen } = useDisclosure()

    const [selectedDate, setSelectedDate] = useState('');
    const [baseDate, setBaseDate] = useState('');
    const [otherDate, setOtherDate] = useState('');
    const [formattedOtherDate, setFormattedOtherDate] = useState('');
    const [direction, setDirection] = useState(0);
    const [numDays, setNumDays] = useState(3);

    const [dateTypes, setDateTypes] = useState([
        {label: 'Effective', value: props.dates[0].value},
        {label: 'Deposit 1', value: props.dates[1].value},
        {label: 'Deposit 2', value: props.dates[2].value},
        {label: 'Loan ✓', value: props.dates[3].value},
        {label: 'Inspection', value: props.dates[4].value},
        {label: 'Closing', value: props.dates[5].value},
        {label: 'Other', value: formattedOtherDate},
    ]);

    useEffect(() => {
        const isCalculated = props.isCalculated;
        if(isCalculated === undefined || Object.keys(isCalculated).length === 0) {
            setNumDays(3);
            setDirection(1);
            setBaseDate('');
            return;
        }
        
        setNumDays(parseInt(isCalculated.numDays));
        setDirection(isCalculated.direction);

        var from = ''
        for(const dateType of dateTypes) {
            if(dateType.label === isCalculated.from) {
                from = dateType.value;
                break;
            }
        }
        setBaseDate({
            label: isCalculated.from,
            value: from
        });
    }, [props.isCalculated])

    useEffect(() => {
        setDateTypes([])
        for(const dateType of props.dates) {
            if(dateType.label === props.type)
                continue;
            else if(dateType.label.includes('Deposit') && props.type.includes('Deposit'))
                continue;
            setDateTypes(dateTypes => [...dateTypes, {label: dateType.label, value: dateType.value}]);
        }
        setDateTypes(dateTypes => [...dateTypes, {label: 'Other', value: formattedOtherDate}]);
    }, [props.dates, props.type])
    
    useEffect(() => {
        for(const type of dateTypes) {
            if(type.label === baseDate.label) {
                setBaseDate(type);
                break;
            }
        }
    }, [dateTypes])

    useEffect(() => {
        calculateNewDate(baseDate.value, direction, numDays, setSelectedDate);
    }, [baseDate, otherDate, direction, numDays])

    useEffect(() => {
        if(!otherDate)
            return;
        trySetDate(otherDate, setFormattedOtherDate, true);
    }, [otherDate])

    useEffect(() => {
        if(!formattedOtherDate)
            return;
        setBaseDate({label: 'Other', value: formattedOtherDate});
    }, [formattedOtherDate])

    const saveCalculatedDate = () => {
        if(!baseDate.label)
            return;

        props.setDate(selectedDate);
        props.setIsCalculated({
            isCalculated: true,
            numDays: numDays,
            direction: direction,
            from: baseDate.label,
            otherDate: baseDate.value
        });
        onClose();
    }

    const removeCalculatedDate = () => {
        props.setIsCalculated(savedCalculatedState => { return {...savedCalculatedState, isCalculated: false } });
        onClose();
    }

    return (
        <Popover
            returnFocusOnClose={false}
            placement={'bottom'}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <Button
                    p='0'
                    ml='4px !important'
                    minW='unset'
                    minH='unset'
                    boxSize={props.boxSize}
                    isDisabled={props.isFileClosed || props.isDateClosed || (props.type === 'Effective')}
                    color={(props.isFileClosed || props.isDateClosed) ? 'red' : (props.isCalculated && props.isCalculated.isCalculated) ? '#EECC33' : '#B1B1B1'}
                    bg='transparent'
                    _hover={{bg:'#FFFFFF15'}}
                    transition='0s'
                    tabIndex={-1}
                >
                    <Tooltip
                        w='fit-content'
                        maxW='250px'
                        textAlign='center'
                        whiteSpace='pre-wrap'
                        label={
                            props.type === 'Effective' ? 'Effective Date cannot use Calculator' :
                            props.isFileClosed ? 'File status is Closed or Cancelled.\nRe-open it to update Date.' :
                            props.isDateClosed ? 'Date status is Closed.\nRe-open it to update Date.' : ''
                    }>
                        <Box display='flex' justifyContent='center' alignItems='center'>
                            <Icon as={CalculateOutlined} boxSize={props.boxSize}/>
                        </Box>
                    </Tooltip>
                </Button>
            </PopoverTrigger>
            <PopoverContent w='fit-content' h='fit-content' fontSize={props.fontSize} color='white' bg='blue.800' borderColor='blue.800' justifyContent='space-between'>
                <Box>
                    <PopoverHeader fontWeight='bold'>
                        Calculate Your Date
                    </PopoverHeader>
                    <PopoverArrow/>
                    <PopoverCloseButton/>
                    <PopoverBody>
                        <VStack>
                            <HStack>
                                <NumberInput w='70px' value={numDays} min={0} onChange={(e) => {setNumDays(e)}}>
                                    <NumberInputField h={props.inputHeight} pl='15px' pr='25px'/>
                                    <NumberInputStepper border='none' minH='unset' h={props.inputHeight} margin='0px'>
                                        <NumberIncrementStepper border='transparent' bg='#FFFFFF08' _hover={{bg:'#FFFFFF20'}} h='50%'/>
                                        <NumberDecrementStepper border='transparent' bg='#FFFFFF08' _hover={{bg:'#FFFFFF20'}} h='50%'/>
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text>
                                    Days
                                </Text>
                                <Tabs index={direction === 1 ? 1 : 0}>
                                    <TabList border='none'>
                                        <Tab borderBottom='2px solid transparent' bg='none' color='blackAlpha.700' p='5px'
                                            _hover={{color:'whiteAlpha.700'}}
                                            _selected={{color:'white', borderBottom:'2px solid white' }}
                                            onClick={() => {setDirection(-1)}}
                                        >
                                            <Text fontSize={props.fontSize}>
                                                Before
                                            </Text>
                                        </Tab>
                                        <Tab borderBottom='2px solid transparent' bg='none' color='blackAlpha.700' p='5px'
                                            _hover={{color:'whiteAlpha.700'}}
                                            _selected={{color:'white', borderBottom:'2px solid white' }}
                                            onClick={() => {setDirection(1)}}
                                        >
                                            <Text fontSize={props.fontSize}>
                                                After
                                            </Text>
                                        </Tab>
                                    </TabList>
                                </Tabs>
                            </HStack>
                            <HStack w='full'>
                                <Text w='84px' textAlign='left'>Select Date:</Text>
                                <DateSelect w='125px' h='30px'
                                    options={dateTypes}
                                    value={baseDate}
                                    onChange={(selection) => {
                                        setBaseDate(selection);
                                    }}
                                    width={`${parseInt(props.inputHeight.slice(0,-2)) * 4.5}px`}
                                    height={props.inputHeight}
                                />
                            </HStack>
                            {baseDate.label === 'Other' &&
                                <HStack w='full'>
                                    <Text w='84px' textAlign='left'>Other:</Text>
                                    <DateInput
                                        setDate={setOtherDate}
                                        elementID={`:calculateDatePopover:Other:`}
                                        width={`${parseInt(props.inputHeight.slice(0,-2)) * 4.5}px`}
                                        height={props.inputHeight}
                                        fontSize={props.fontSize}
                                    />                      
                                </HStack>
                            }
                        </VStack>
                    </PopoverBody>
                </Box>
                <PopoverFooter justifySelf='flex-end'>
                    <Text>
                        {`Calculated Date: ${selectedDate || 'MM-DD-YY'}`}
                    </Text>
                    <HStack w='full' justifyContent='right'>
                        <Button h={props.buttonH} colorScheme='red' onClick={removeCalculatedDate} fontSize={props.fontSize}>
                            Remove
                        </Button>
                        <Button h={props.buttonH} colorScheme='blue' onClick={saveCalculatedDate} fontSize={props.fontSize}>
                            Save
                        </Button>
                    </HStack>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
}

export default CalculateDatePopover;