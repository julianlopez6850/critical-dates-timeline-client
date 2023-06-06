import React from 'react';

import {
    HStack,
    VStack,
    Text,
    Checkbox,
  } from '@chakra-ui/react'

const FileMilestones = (props) => {
    return (
        <VStack w='200px' h='237px'>
            <Text>
                Milestones:
            </Text>
            <VStack spacing='0'>
                {props.milestonesChecks.map((item, index) => {
                    if(item.role)
                        return (
                            <HStack w='170px' spacing='0' key={index}>
                                <Checkbox spacing='2' size='sm' onChange={(e)=>{item.set(e.target.checked)}} defaultChecked={item.value} isChecked={item.value}>
                                    {item.label}
                                </Checkbox>
                            </HStack>
                        )
                })}
            </VStack>
        </VStack>
    )
}

export default FileMilestones;