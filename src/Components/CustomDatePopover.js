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
} from '@chakra-ui/react';

import DateTypeButton from './DateFilterButton';
import DateInput from './DateInput';

const CustomDatePopover = (props) => {
    return (
        <Popover
            isOpen={props.isOpen}
            onOpen={props.onOpen}
            onClose={props.onClose}
            placement={'bottom'}
        >
            <PopoverTrigger>
                <DateTypeButton
                    text={props.item}
                    onClick={() => {props.setWhen(props.item)}}
                    active={props.when === props.item}
                />
            </PopoverTrigger>
            <PopoverContent color='white' bg='blue.800' borderColor='blue.800' w='250px'>
                <PopoverHeader>
                    Choose your time frame
                </PopoverHeader>
                <PopoverArrow/>
                <PopoverCloseButton/>
                <PopoverBody>
                    <VStack>
                        <HStack w='full'>
                            <Text w='70px' textAlign='left' fontSize='14px'>Start Date: </Text>
                            <DateInput
                                setDate={props.setStartDate}
                                elementID={':customDateInput-startDate:'}
                            />
                        </HStack>
                        <HStack w='full'>
                            <Text w='70px' textAlign='left' fontSize='14px'>End Date: </Text>
                            <DateInput
                                setDate={props.setEndDate}
                                elementID={':customDateInput-endDate:'}
                            />
                        </HStack>
                        <Text fontSize='12px'>
                            {`Time frame: ${props.startDate || 'MM-DD-YY'} to ${props.endDate || 'MM-DD-YY'}`}
                        </Text>
                        <HStack w='full' justifyContent='right'>
                            <Button
                                colorScheme='red' 
                                onClick={()=> {
                                    props.setWhen(props.prevWhen);
                                    props.onClose();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button colorScheme='blue' onClick={props.onClose}>
                                Save
                            </Button>
                        </HStack>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default CustomDatePopover;