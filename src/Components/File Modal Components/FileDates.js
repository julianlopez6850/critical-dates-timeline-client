import {
    Button,
    HStack,
    VStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'
import { LockIcon, UnlockIcon, } from '@chakra-ui/icons';

const FileDates = (props) => {

    const forceResetDate = (value, setValue) => {
        if(value === '') {
            setValue('00-00-0000')
        }
    }

    return (
        <VStack w='300px' spacing='1.5'>
            <Text>
                Critical Dates:
            </Text>
            {props.dates.map((item, index) => {
                return (
                    <HStack w='250px' spacing='0' key={index}
                        color={(props.isClosed || item.isClosed) ? 'red' : ''}
                        borderColor={(props.isClosed || item.isClosed) ? 'red' : ''}
                    >
                        <Text w='68px'>
                            {item.label}
                        </Text>
                        <Tooltip label={item.label === 'Effective' ? props.isEffectiveError || '' : item.label === 'Closing' ? props.isClosingError || '' : ''}>
                            <Input w='150px' h='30px' paddingInline='8px' borderRadius='10px' type='date' 
                                value={item.value}
                                onChange={(e)=>{item.setValue(e.target.value)}}
                                transition='0s'
                                isDisabled={props.isClosed}
                                _hover={{}}
                                onBlur={(e)=>{forceResetDate(e.target.value, item.setValue)}}
                                isInvalid={item.label === 'Effective' && props.isEffectiveError || item.label === 'Closing' && props.isClosingError}
                            />
                        </Tooltip>
                        <Button p='0px !important' size='sm' bgColor='transparent'
                            _hover={{bgColor:'transparent'}}
                            onClick={(e)=>{
                                e.stopPropagation();
                                if(!props.isClosed)
                                    item.setIsClosed((isClosed) => !isClosed);
                            }}
                            isDisabled={props.isClosed}
                            transition='0s'
                        >
                            <Text display='flex'>
                                { (props.isClosed || item.isClosed) && <LockIcon/> || <UnlockIcon/> }
                            </Text>
                        </Button>
                    </HStack>
                )
            })}
        </VStack>
    )
}

export default FileDates;