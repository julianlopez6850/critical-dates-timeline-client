import React from 'react';

import {
    HStack,
    Text,
    Tooltip,
    Input,
  } from '@chakra-ui/react'

const FileBuyerAndSeller = (props) => {
    return (
        <HStack w='full'>
            <Text minW='57px'>
                {props.isPurchase ? (props.whoRepresenting ? ' Seller' : ' Buyer') : 'Borrower'}
            </Text>
            <Tooltip label={props.whoRepresenting ? props.isSellerError || '' : props.isBuyerError || ''}>
                <Input
                    size='sm' borderRadius='10px'
                    value={props.whoRepresenting ? props.seller : props.buyer}
                    onChange={(e) => {props.whoRepresenting ? props.setSeller(e.target.value) : props.setBuyer(e.target.value)}}
                    isInvalid={props.whoRepresenting ? props.isSellerError : props.isBuyerError}
                />
            </Tooltip>

            <Text minW='43px'>
                {props.isPurchase ? (props.whoRepresenting ? 'Buyer' : 'Seller') : 'Lender'}
            </Text>
            <Tooltip label={props.whoRepresenting ? props.isBuyerError || '' : props.isSellerError || ''}>
                <Input
                    size='sm' borderRadius='10px'
                    value={props.whoRepresenting ? props.buyer : props.seller}
                    onChange={(e) => {props.whoRepresenting ? props.setBuyer(e.target.value) : props.setSeller(e.target.value)}}
                    isInvalid={props.whoRepresenting ? props.isBuyerError : props.isSellerError}
                />
            </Tooltip>
        </HStack>
    )
}

export default FileBuyerAndSeller;