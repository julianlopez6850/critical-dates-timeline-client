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

import DateFilterButton from './DateFilterButton';
import DateInput from './DateInput';

const CustomDatePopover = (props) => {
    return (
        <Popover
            isOpen={props.isOpen}
            onOpen={props.onOpen}
            onClose={props.onClose}
            placement='bottom-end'
        >
            <PopoverTrigger>
                <DateFilterButton
                    text={props.text}
                    fontSize={props.fontSize}
                    onClick={() => {props.setWhen(props.text)}}
                    active={props.when === props.text}
                />
            </PopoverTrigger>
            <PopoverContent color='white' bg='blue.800' borderColor='blue.800' w='fit-content'>
                <PopoverHeader fontWeight='bold' fontSize={props.fontSize}>
                    Choose your time frame
                </PopoverHeader>
                <PopoverArrow/>
                <PopoverCloseButton/>
                <PopoverBody>
                    <VStack>
                        <HStack w='full' justifyContent='space-between'>
                            <Text w='fit-content' textAlign='left' fontSize={props.fontSize}>Start Date: </Text>
                            <DateInput
                                setDate={props.setStartDate}
                                elementID={':customDateInput-startDate:'}
                                fontSize={props.fontSize}
                                width={`${parseInt(props.inputHeight.slice(0,-2)) * 5.5}px`}
                                height={props.inputHeight}
                                setPageNum={props.setPageNum}
                            />
                        </HStack>
                        <HStack w='full' justifyContent='space-between'>
                            <Text w='fit-content' textAlign='left' fontSize={props.fontSize}>End Date: </Text>
                            <DateInput
                                setDate={props.setEndDate}
                                elementID={':customDateInput-endDate:'}
                                fontSize={props.fontSize}
                                width={`${parseInt(props.inputHeight.slice(0,-2)) * 5.5}px`}
                                height={props.inputHeight}
                                setPageNum={props.setPageNum}
                            />
                        </HStack>
                        <Text fontSize={props.fontSize}>
                            {`Time frame: ${props.startDate || 'MM-DD-YY'} to ${props.endDate || 'MM-DD-YY'}`}
                        </Text>
                        <HStack w='full' justifyContent='right'>
                            <Button
                                h={props.inputHeight}
                                fontSize={props.fontSize}
                                colorScheme='red'
                                onClick={()=> {
                                    props.setWhen(props.prevWhen);
                                    props.onClose();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                h={props.inputHeight}
                                fontSize={props.fontSize}
                                colorScheme='blue'
                                onClick={props.onClose}
                            >
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