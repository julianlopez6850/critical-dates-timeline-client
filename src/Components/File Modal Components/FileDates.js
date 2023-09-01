import { useEffect } from 'react';

import {
    Button,
    HStack,
    VStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon, } from '@chakra-ui/icons';

import CalculateDatePopover from './CalculateDatePopover';
import calculateNewDate from '../../Helpers/calculateNewDate';

const FileDates = (props) => {

    useEffect(() => {
        for(const date of props.dates) {
            if(date.isCalculated && date.isCalculated.isCalculated === true && date.isCalculated.from !== 'Other') {
                var from = '';
                for(const fromDate of props.dates) {
                    if(date.isCalculated.from === fromDate.label) {
                        from = fromDate.value;
                        break;
                    }
                }
                calculateNewDate(from, date.isCalculated.direction, parseInt(date.isCalculated.numDays), date.setValue);
            }
        }
    }, [props.dates])

    const forceResetDate = (value, setValue) => {
        if(value === '') {
            setValue('00-00-0000')
        }
    }

    return (
        <VStack w='fit-content' h='full' fontSize={props.mainFontSize} spacing={props.datesSpacing}>
            <Text fontWeight='bold'>
                Critical Dates:
            </Text>
            {props.dates.map((item, index) => {
                return (
                    <HStack w='fit-content' spacing='0' key={index}
                        color={(props.status !== 'Open' || item.isClosed) ? 'red' : ''}
                        borderColor={(props.status !== 'Open' || item.isClosed) ? 'red' : ''}
                    >
                        <Text w={props.dateTypeW}>
                            {item.label}
                        </Text>
                        <Tooltip
                            w='fit-content'
                            maxW='250px'
                            textAlign='center'
                            whiteSpace='pre-wrap'
                            label={
                                props.status !== 'Open' ? 'File status is Closed or Cancelled.\nRe-open it to update Date.' :
                                item.isClosed ? 'Date status is Closed.\nRe-open it to update Date.' :
                                item.isCalculated && item.isCalculated.isCalculated ? 'Date is controlled by a calculation.\nRemove it to update Date manually.' :
                                item.label === 'Effective' ? props.isEffectiveError || '' : item.label === 'Closing' ? props.isClosingError || '' : ''
                            }
                        >
                            <Input w={props.dateW} h={props.bodyInputHeight} paddingInline='8px' borderRadius='10px' type='date' fontSize={props.headerFontSize} 
                                value={item.value}
                                onChange={(e)=>{item.setValue(e.target.value)}}
                                transition='0s'
                                isDisabled={props.status !== 'Open' || item.isClosed || item.isCalculated && item.isCalculated.isCalculated}
                                _disabled={!(props.status !== 'Open' || item.isClosed) ? {cursor:'not-allowed'} : {opacity:0.4, cursor:'not-allowed'}}
                                _hover={{}}
                                onBlur={(e)=>{forceResetDate(e.target.value, item.setValue)}}
                                isInvalid={item.label === 'Effective' && props.isEffectiveError || item.label === 'Closing' && props.isClosingError}
                            />
                        </Tooltip>
                        <CalculateDatePopover
                            {...props}
                            setDate={item.setValue}
                            isCalculated={item.isCalculated}
                            setIsCalculated={item.setIsCalculated}
                            type={item.label}
                            isDateClosed={item.isClosed}
                        />
                        <Tooltip
                            w='fit-content'
                            maxW='250px'
                            textAlign='center'
                            whiteSpace='pre-wrap'
                            label={props.status !== 'Open' ? 'File status is Closed or Cancelled.\nRe-open it to update Date.' : ''}
                        >
                            <Button p='0px !important' minW='unset' boxSize={props.bodyInputHeight} bgColor='transparent' mr='4px !important'
                                _hover={{bgColor:'#FFFFFF15'}}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    if(props.status === 'Open')
                                        item.setIsClosed((isClosed) => !isClosed);
                                }}
                                isDisabled={props.status !== 'Open'}
                                transition='0s'
                                tabIndex={-1}
                            >
                                <Text display='flex'>
                                    { (props.status !== 'Open' || item.isClosed) && <LockIcon boxSize={props.lockIconSize}/> || <UnlockIcon boxSize={props.lockIconSize}/> }
                                </Text>
                            </Button>
                        </Tooltip>
                    </HStack>
                )
            })}
        </VStack>
    )
}

export default FileDates;