import React, { useContext, useEffect } from 'react';
import { profileContext } from '../../Helpers/profileContext';
import { axiosInstance } from "../../Helpers/axiosInstance"

import {
    HStack,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'
import FileDeleteDialog from './FileDeleteDialog';

const FileClearAndSaveButtons = (props) => {

    const { profile, setProfile } = useContext(profileContext);

    const {
        isOpen: isOpenDeleteFile, 
        onOpen: onOpenDeleteFile,
        onClose: onCloseDeleteFile
    } = useDisclosure()

    const deleteFile = () => {
        axiosInstance.delete(`http://localhost:5000/files`, { data: {fileNumber: props.fileNo}}).then((response) => {
            setProfile(profile => {
                return {...profile, actions: profile.actions + 1 }
            })
            console.log(`Successfully deleted file ${props.fileNo}`);
            props.toast({
                title: 'Success!',
                description: `Successfully deleted file ${props.fileNo}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            props.onClose();
        }).catch((err) => {
            console.log(err);
            console.log('ERROR. We encountered a problem while trying to delete this file. Please try again later.');
            props.toast({
                title: 'Error.',
                description: `An error occurred while trying to delete this file. Try again later`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        })
    }

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
            oldFileNumber: props.oldFileNo,
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

        // if new file, POST to database.
        if(props.new) {
            axiosInstance.post(`http://localhost:5000/files`, file).then((response) => {
                console.log(response);
                setProfile(profile => {
                    return {...profile, actions: profile.actions + 1 }
                })
                props.onClose();
                props.resetAllValues();
            }).catch((err) => {
                if(err.response && err.response.data.message === "This file already exists.") {
                    console.log('ERROR. This file number already exists.');
                    props.toast({
                        title: 'Error.',
                        description: `${err.response.data.message}`,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                } else {
                    console.log(err);
                    console.log('ERROR. We encountered a problem while trying to save this file. Please try again later.');
                    props.toast({
                        title: 'Error.',
                        description: `${'An error occurred while trying to save this file. Try again later.'}`,
                        status: 'error',
                        duration: 2500,
                        isClosable: true,
                    })
                }
            })
        } else { // else (if old file), PUT (update) file in database.
            axiosInstance.put(`http://localhost:5000/files`, file).then(() => {
                setProfile(profile => {
                    return {...profile, actions: profile.actions + 1 }
                })
                console.log(`Successfully updated file ${props.fileNo}`);
                props.onClose();
            })
        }
    }
    
    return (
        <HStack h='40px'>
            {/* If adding a new file, show Clear Fields Button. If updating an existing file, show Delete File Button */}
            {props.new &&
                <Button w='120px' colorScheme='red' onClick={()=>{props.resetAllValues()}}>
                    CLEAR FIELDS
                </Button> ||
                <Button w='120px' colorScheme='red' onClick={()=>{onOpenDeleteFile()}}>
                    DELETE FILE
                </Button>
            }
            <Button w='100px' colorScheme='blue' onClick={()=>{trySaveFile()}}>
                SAVE
            </Button>

            <FileDeleteDialog
                isOpen={isOpenDeleteFile}
                onOpen={onOpenDeleteFile}
                onClose={onCloseDeleteFile}
                fileNo={props.fileNo}
                deleteFile={deleteFile}
            />
        </HStack>
    )
}

export default FileClearAndSaveButtons;