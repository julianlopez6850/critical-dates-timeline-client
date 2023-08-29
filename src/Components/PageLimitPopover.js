import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    VStack,
    Button,
    Box,
    useDisclosure,
    Checkbox,
    Text,
} from '@chakra-ui/react';

const PageLimitPopover = (props) => {
    
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <Popover
            returnFocusOnClose={false}
            placement={props.direction}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <Button
                    _before={{
                        display:'block',
                        fontSize:props.fontSize,
                        height:0,
                        visibility:'hidden',
                        content:`"000 - 000 of 000"`,
                    }}
                    minW='fit-content'
                    h={props.height}
                    paddingInline='2px'
                    display='inline-block'
                    fontSize={props.fontSize}
                    bgColor='transparent'
                    _hover={{bgColor:props.profile.darkMode ? 'whiteAlpha.300' : 'blackAlpha.300'}}
                >
                    {`${props.bounds[0]} - ${props.bounds[1]} of ${props.total}`}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                _before={{
                    display:'block',
                    height:0,
                    visibility:'hidden',
                    content:`"000 - 000 of 000"`
                }}
                _after={{
                    display:'block',
                    height:0,
                    visibility:'hidden',
                    minW:'fit-content',
                    content:`"${props.bounds[0]} - ${props.bounds[1]} of ${props.total}"`
                }}
                w='fit-content'
                h='fit-content'
                color='white'
                bg='blue.800'
                borderColor='blue.800'
                justifyContent='space-between'
            >
                <Box>
                    <PopoverHeader fontWeight='bold'>
                        Set Limit
                    </PopoverHeader>
                    <PopoverBody>
                        <VStack align='left'>
                            <Checkbox
                                isChecked={props.limit === 50}
                                onChange={() => {
                                    props.setPageNum(Math.ceil(props.bounds[0] / 50));
                                    props.setLimit(50);
                                }}
                            >
                                <Text fontSize={props.fontSize}>50</Text>
                            </Checkbox>
                            <Checkbox
                                isChecked={props.limit === 100}
                                onChange={() => {
                                    props.setPageNum(Math.ceil(props.bounds[0] / 100));
                                    props.setLimit(100);
                                }}
                            >
                                <Text fontSize={props.fontSize}>100</Text>
                            </Checkbox>
                        </VStack>
                    </PopoverBody>
                </Box>
            </PopoverContent>
        </Popover>
    );
}

export default PageLimitPopover;