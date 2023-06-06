import React from 'react';

import axios from 'axios';

import {
    HStack,
    Button,
  } from '@chakra-ui/react'

const FileClearAndSaveButtons = (props) => {

    const trySaveFile = () => {
        var error = props.isError
        if(error) {
            console.log('ERROR: Invalid or Missing Input.')
            props.toast({
                title: 'Error.',
                description: error,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        const file = {
            fileNumber: props.fileNo,
            fileRef: props.fileRef,
            address: props.propertyAddress,
            folioNo: props.folioNo,
            buyer: props.buyer,
            seller: props.seller,
            effective: props.effective,
            depositInitial: props.depositInit || null,
            depositSecond: props.depositSecond || null,
            loanApproval: props.loanApproval || null,
            inspection: props.inspection || null,
            closing: props.closing,
            isClosedEffective: props.isClosedEffective,
            isClosedDepositInitial: props.isClosedDepositInit,
            isClosedDepositSecond: props.isClosedDepositSecond,
            isClosedLoanApproval: props.isClosedLoanApproval,
            isClosedInspection: props.isClosedInspection,
            isClosedClosing: props.isClosedClosing,
            isClosed: props.isClosed,
            notes: props.notes,
            whoRepresenting: props.whoRepresenting,
            isPurchase: props.isPurchase,
            roles: JSON.stringify(props.roles),
            milestones: JSON.stringify(props.milestones),
        }

        axios.post(`http://localhost:5000/files`, file).then((response) => {
            console.log(response);
            props.onClose();
            props.resetAllValues();
        }).catch((err) => {
            if(err.response && err.response.data.message === "This file already exists.") {
                console.log('ERROR. This file number already exists.')
                props.toast({
                    title: 'Error.',
                    description: `${err.response.data.message}`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            } else {
                console.log(err);
                console.log('ERROR. We encountered a problem while trying to save this file. Please try again later.')
                props.toast({
                    title: 'Error.',
                    description: `${'An error occurred while trying to save this file. Please try again later.'}`,
                    status: 'error',
                    duration: 2500,
                    isClosable: true,
                })
            }
        })
    }
    
    return (
        <HStack h='40px'>
            <Button w='120px' colorScheme='red' onClick={()=>{props.resetAllValues()}}>
                CLEAR FIELDS
            </Button>
            <Button w='100px' colorScheme='blue' onClick={()=>{trySaveFile()}}>
                SAVE
            </Button>
        </HStack>
    )
}

export default FileClearAndSaveButtons;