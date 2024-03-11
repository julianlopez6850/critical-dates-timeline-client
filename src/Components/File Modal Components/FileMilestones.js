import {
    HStack,
    VStack,
    Text,
    Checkbox,
    Grid,
    GridItem,
} from '@chakra-ui/react'

const FileMilestones = (props) => {
    return (
        <VStack w='full' h='full'>
            <Text fontWeight='bold'>
                Milestones:
            </Text>
            <Grid
                w='inherit'
                templateRows={
                    `repeat(${Math.round((props.milestonesChecks.filter((item) =>
                        item.role && item.reqMilestone !== false).length) / (props.stackDir === 'row' ? 1 : 2))
                    }, 1fr)`
                }
                gridAutoFlow='column'
            >
                {props.milestonesChecks.map((item, index) => {
                    if(item.role && item.reqMilestone !== false)
                    return (
                        <GridItem key={`${index}-milestone:${item.label}`}>
                            <Checkbox
                                alignSelf='start'
                                size ='sm'
                                defaultChecked={item.value}
                                isChecked={item.value}
                                onChange={(e)=>{item.set(e.target.checked)}}
                                tabIndex={-1}
                            >
                                <Text
                                    w='max-content'
                                    noOfLines={1}
                                    fontSize={props.fontSize}
                                >
                                    {item.label}
                                </Text>
                            </Checkbox>
                        </GridItem>
                    )
                })}
            </Grid>
        </VStack>
    )
}

export default FileMilestones;