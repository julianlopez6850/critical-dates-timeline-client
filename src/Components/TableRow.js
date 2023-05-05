import React, { useEffect, useState, Fragment } from "react"
import { Box, Divider, HStack, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { EditFile } from "./EditFile";


const TableRow = (props) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <HStack w='1000px' h='30px' borderRadius='10px' textAlign='left' bgColor='#0077cc' color='white' 
            onClick={()=>{onOpen()}}
        >
            <Box h='full' w='fit-content' p='10px' bgColor='black' display='flex' alignItems='center' borderRadius='10px' >
                <Text w='90px' textAlign='center' fontWeight='bold'>
                    {props.file.date}
                </Text>
            </Box>

            <Text w='50px' textAlign='center'>
                {props.file.fileNumber}
            </Text>

            <Divider orientation='vertical' h='70%' />

            <Text w='81px'  textAlign='center'>
                {
                    props.file.prefix && (props.file.prefix === 'First ' && '1st ' || 
                    props.file.prefix === 'Second ' && '2nd ' || '3rd ')
                }
                {props.file.type}
            </Text>

            {/* Display Buyer, Seller, Address w/ Tooltip in case of overflow. */}
            {
                [props.file.buyer, props.file.seller, props.file.address].map((item, index) => {
                    return <Fragment key={index}>
                        <Divider orientation='vertical' h='70%' />
                        <Tooltip
                            label={item}
                            maxW='255px'
                        >
                            <Text w='225px' overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>
                                {item}
                            </Text>
                        </Tooltip>
                    </Fragment>
                })
            }
            
            <EditFile
                onClose={onClose}
                isOpen={isOpen}
                fileNo={props.file.fileNumber}
            />
        </HStack>
    )
}

export default TableRow;