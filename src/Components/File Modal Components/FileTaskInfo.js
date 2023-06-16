import {
    Button,
    HStack,
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
        <HStack width='full' justify='space-between' mt='10px'>
            <HStack>
                <Text minW='fit-content' fontWeight='bold'>
                    File Type:
                </Text>
                <Tabs h='25px' variant='enclosed' colorScheme='white' defaultIndex={props.isPurchase ? 0 : 1}>
                    <TabList h='25px' border='none'>
                        <Tab paddingInline='5px' w='80px' border='none' color='whiteAlpha.700' _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}} onClick={() => {props.setIsPurchase(true)}}>Purchase</Tab>
                        <Tab paddingInline='5px' w='80px' border='none' color='whiteAlpha.700' _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}} onClick={() => {props.setIsPurchase(false)}}>Refinance</Tab>
                    </TabList>
                </Tabs>
            </HStack>
            {props.isPurchase &&
                <HStack>
                    <Text minW='fit-content' fontWeight='bold'>
                        Representing:
                    </Text>
                    <Tabs h='25px' variant='enclosed' colorScheme='white' defaultIndex={props.whoRepresenting ? 1 : 0}>
                        <TabList h='25px' border='none'>
                            <Tab paddingInline='5px' w='50px' border='none' color='whiteAlpha.700' _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}} onClick={() => {props.setWhoRepresenting(false)}}>Buyer</Tab>
                            <Tab paddingInline='5px' w='50px' border='none' color='whiteAlpha.700' _selected={{borderBottom:'1px', fontWeight:'bold', color:'white'}} onClick={() => {props.setWhoRepresenting(true)}}>Seller</Tab>
                        </TabList>
                    </Tabs>
                </HStack>
            }
            <HStack>
                    <Text minW='fit-content' fontWeight='bold'>
                        Responsibilities:
                    </Text>
                    <Popover h='30px'>
                        <PopoverTrigger>
                            <Button h='30px' paddingInline='10px' backgroundColor='transparent' _hover={{backgroundColor:'whiteAlpha.100'}} _active={{backgroundColor:'whiteAlpha.200'}} border='1px solid white' fontWeight='normal' color='whiteAlpha.700'>
                                Select... <ChevronDownIcon/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent color='white' h='175px' w='175px' backgroundColor='#101622'>
                            <PopoverArrow/>
                            <PopoverHeader fontSize='16px'>File Responsibilities:</PopoverHeader>
                            <PopoverBody>
                                {
                                    props.rolesButtons.map((item, index) => {
                                        return <Checkbox key={index} onChange={(e)=>{item.set(e.target.checked)}} defaultChecked={item.value} isChecked={item.value}>
                                            {item.label}
                                        </Checkbox>
                                    })
                                }
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
            </HStack>
        </HStack>
    )
}

export default FileTaskInfo;