import {
    HStack,
    VStack,
    Button,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverBody,
    Tabs,
    TabList,
    Tab,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const FileStatus = (props) => {
    return (
        <HStack fontSize={props.fontSize}>
            <Text color={props.status !== 'Open' ? 'red' : ''}>
                STATUS:
            </Text>
            <Popover
                h='30px'
                placement='top'
            >
                <PopoverTrigger>
                    <Button
                        _before={{
                            display:'block',
                            fontSize:props.bodyFontSize,
                            height:0,
                            visibility:'hidden',
                            content:`"FILE STATUS"`,
                        }}
                        minW='fit-content'
                        display='inline-block'
                        h={props.bodyInputHeight}
                        paddingInline='10px'
                        backgroundColor='transparent'
                        border='1px solid'
                        borderColor={ props.status !== 'Open' ? 'red' : 'white'}
                        fontSize={props.bodyFontSize}
                        fontWeight='normal'
                        color={ props.status !== 'Open' ? 'red' : 'whiteAlpha.700'}
                        tabIndex={-1}
                        _hover={{backgroundColor:'whiteAlpha.100'}}
                        _active={{backgroundColor:'whiteAlpha.200'}}
                        transition='0s'
                    >
                        <HStack justifyContent='space-between'>
                            <>{props.status}</>
                            <ChevronDownIcon/>
                        </HStack>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    w='fit-content'
                    h='fit-content'
                    color='white'
                    backgroundColor='#101622'
                >
                    <PopoverArrow/>
                    <PopoverHeader fontSize={props.bodyFontSize} fontWeight='bold'>
                        File Status:
                    </PopoverHeader>
                    <PopoverBody>
                        <VStack align='left' spacing='4px'>
                            <Tabs
                                w='100%'
                                orientation='vertical'
                                variant='enclosed'
                                colorScheme='white'
                                defaultIndex={() => {
                                    switch(props.status) {
                                        case 'Open': return 0;
                                        case 'Closed': return 1;
                                        case 'Cancelled': return 2;
                                    }
                                }}
                            >
                                <TabList w='100%' border='none'>
                                    <Tab
                                        w='100%'
                                        h={props.bodyInputHeight}
                                        p='0px'
                                        border='none'
                                        color='whiteAlpha.700'
                                        fontSize={props.bodyFontSize}
                                        _selected={{
                                            borderBottom:'1px',
                                            fontWeight:'bold',
                                            color:'white'
                                        }}
                                        onClick={() => {
                                            props.setStatus('Open')
                                        }}
                                    >
                                        Open
                                    </Tab>
                                    <Tab
                                        w='100%'
                                        h={props.bodyInputHeight}
                                        p='0px'
                                        border='none'
                                        color='whiteAlpha.700'
                                        fontSize={props.bodyFontSize}
                                        _selected={{
                                            borderBottom:'1px',
                                            fontWeight:'bold',
                                            color:'white'
                                        }}
                                        onClick={() => {
                                            props.setStatus('Closed')
                                        }}
                                    >
                                        Closed
                                    </Tab>
                                    <Tab
                                        w='100%'
                                        h={props.bodyInputHeight}
                                        p='0px'
                                        border='none'
                                        color='whiteAlpha.700'
                                        fontSize={props.bodyFontSize}
                                        _selected={{
                                            borderBottom:'1px',
                                            fontWeight:'bold',
                                            color:'white'
                                        }}
                                        onClick={() => {
                                            props.setStatus('Cancelled')
                                        }}
                                    >
                                        Cancelled
                                    </Tab>
                                </TabList>
                            </Tabs>
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </HStack>
    )
}

export default FileStatus;