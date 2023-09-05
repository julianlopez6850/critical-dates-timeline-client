import {
    HStack,
    VStack,
    Text,
    Checkbox,
} from '@chakra-ui/react'

const FileMilestones = (props) => {
    return (
        <VStack w='fit-content' h='full'>
            <Text fontWeight='bold'>
                Milestones:
            </Text>
            <VStack spacing='0'>
                <Checkbox
                    h='0px'
                    visibility='hidden'
                >
                    <Text w='max-content' noOfLines={1} fontSize={props.fontSize}>This Is Placeholder Text</Text>
                </Checkbox>
                {props.milestonesChecks.map((item, index) => {
                    if(item.role)
                        return (
                            <HStack spacing='0' key={index} alignSelf='start'>
                                <Checkbox
                                    spacing='2' size ='sm'
                                    defaultChecked={item.value}
                                    isChecked={item.value}
                                    onChange={(e)=>{item.set(e.target.checked)}}
                                    tabIndex={-1}
                                >
                                    <Text w='max-content' noOfLines={1} fontSize={props.fontSize}>{item.label}</Text>
                                </Checkbox>
                            </HStack>
                        )
                })}
            </VStack>
        </VStack>
    )
}

export default FileMilestones;