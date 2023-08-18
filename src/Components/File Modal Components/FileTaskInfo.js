import {
    Button,
    VStack,
    HStack,
    Stack,
    Text,
    Tabs,
    TabList,
    Tab,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverBody,
    Checkbox,
} from '@chakra-ui/react'
import { ChevronDownIcon, } from '@chakra-ui/icons';

const FileTaskInfo = (props) => {
    return (
        <Stack direction={props.stackDir} width='full' justify='space-between' mt={props.spacing} spacing={props.spacing}>
            <HStack>
                <Text minW='fit-content' fontWeight='bold' fontSize={props.fontSize}>
                    File Type:
                </Text>
                <Tabs h={props.height} variant='enclosed' colorScheme='white' defaultIndex={props.isPurchase ? 0 : 1}>
                    <TabList h={props.height} border='none'>
                        <Tab
                            w={props.fileTypeTabsW} h={props.height} p='0px' border='none' color='whiteAlpha.700' fontSize={props.fontSize}
                            _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}}
                            onClick={() => {props.setIsPurchase(true)}}
                        >
                            Purchase
                        </Tab>
                        <Tab
                            w={props.fileTypeTabsW} h={props.height} p='0px' border='none' color='whiteAlpha.700' fontSize={props.fontSize}
                            _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}}
                            onClick={() => {props.setIsPurchase(false)}}
                        >
                            Refinance
                        </Tab>
                    </TabList>
                </Tabs>
            </HStack>
            {props.isPurchase &&
                <HStack>
                    <Text minW='fit-content' fontWeight='bold' fontSize={props.fontSize}>
                        Representing:
                    </Text>
                    <Tabs h={props.height} variant='enclosed' colorScheme='white'
                        defaultIndex={() => {
                            switch(props.whoRepresenting) {
                                case 'Seller': return 0;
                                case 'Buyer': return 1;
                                default: return 2;
                            }
                        }}
                    >
                        <TabList h={props.height} border='none'>
                            <Tab
                                w={props.fileRepTabsW} h={props.height} p='0px' border='none' color='whiteAlpha.700' fontSize={props.fontSize}
                                _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}}
                                onClick={() => {props.setWhoRepresenting('Seller')}}
                            >
                                Seller
                            </Tab>
                            <Tab
                                w={props.fileRepTabsW} h={props.height}  p='0px' border='none' color='whiteAlpha.700' fontSize={props.fontSize}
                                _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}}
                                onClick={() => {props.setWhoRepresenting('Buyer')}}
                            >
                                Buyer
                            </Tab>
                            <Tab
                                w={props.fileRepTabsW} h={props.height}  p='0px' border='none' color='whiteAlpha.700' fontSize={props.fontSize}
                                _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}}
                                onClick={() => {props.setWhoRepresenting('Both')}}
                            >
                                Both
                            </Tab>
                        </TabList>
                    </Tabs>
                </HStack>
            }
            <HStack >
                    <Text minW='fit-content' fontWeight='bold'>
                        Tasks:
                    </Text>
                    <Popover h='30px'>
                        <PopoverTrigger>
                            <Button h={props.height} paddingInline='10px' backgroundColor='transparent' border='1px solid white' fontSize={props.fontSize} fontWeight='normal' color='whiteAlpha.700' tabIndex={-1}
                            _hover={{backgroundColor:'whiteAlpha.100'}}
                            _active={{backgroundColor:'whiteAlpha.200'}}>
                                Select... <ChevronDownIcon/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent color='white' w='fit-content' h='fit-content' backgroundColor='#101622'>
                            <PopoverArrow/>
                            <PopoverHeader fontSize={props.fontSize} fontWeight='bold'>File Responsibilities:</PopoverHeader>
                            <PopoverBody>
                                <VStack align='left' spacing='4px'>
                                    {props.rolesButtons.map((item, index) => {
                                        return <Checkbox
                                            key={index}
                                            onChange={(e)=>{item.set(e.target.checked)}}
                                            defaultChecked={item.value}
                                            isChecked={item.value}
                                        >
                                            <Text fontSize={props.fontSize}>{item.label}</Text>
                                        </Checkbox>
                                    })}
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
            </HStack>
        </Stack>
    )
}

export default FileTaskInfo;