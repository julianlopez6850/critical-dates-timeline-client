import React from 'react';

import {
    HStack,
    Text,
    Tooltip,
    Input,
  } from '@chakra-ui/react'

const FilePropertyInfo = (props) => {
    return (
        <HStack w='full' mt='5px !important'>
            <Text minW='57px'>
                Property
            </Text>
            <Tooltip label={props.isPropertyError || ''}>
                <Input
                    size='sm' borderRadius='10px'
                    value={props.propertyAddress}
                    onChange={(e) => {props.setPropertyAddress(e.target.value)}}
                    isInvalid={props.isPropertyError}
                />
            </Tooltip>

            <Text>
                Folio
            </Text>
            <Input
                w='300px' size='sm' borderRadius='10px'
                value={props.folioNo}
                onChange={(e) => {props.setFolioNo(e.target.value)}}
            />
        </HStack>
    )
}

export default FilePropertyInfo;