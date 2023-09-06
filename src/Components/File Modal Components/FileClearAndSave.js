import { useContext } from 'react';
import { profileContext } from '../../Helpers/profileContext';
import { axiosInstance } from '../../Helpers/axiosInstance';

import {
    HStack,
    Button,
    useDisclosure,
} from '@chakra-ui/react';

import FileDialogBox from './FileDialogBox';

const FileClearAndSaveButtons = (props) => {

    const { profile, setProfile } = useContext(profileContext);

    const {
        isOpen: isOpenDeleteFile, 
        onOpen: onOpenDeleteFile,
        onClose: onCloseDeleteFile
    } = useDisclosure();
    const {
        isOpen: isOpenClearFields, 
        onOpen: onOpenClearFields,
        onClose: onCloseClearFields
    } = useDisclosure();

    const deleteFile = () => {
        axiosInstance.delete(`${process.env.REACT_APP_API_URL}/files`, { data: {fileNumber: props.fileNo}}).then(() => {
            setProfile(profile => {
                return {...profile, actions: profile.actions + 1 }
            })
            console.info(`Successfully deleted file ${props.fileNo}`);
            props.toast({
                title: 'Success!',
                description: `Successfully deleted file ${props.fileNo}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            props.onClose();
        }).catch(() => {
            console.warn('ERROR: A problem occurred while trying to delete this file. Please try again later.');
            props.toast({
                title: 'Error.',
                description: 'An error occurred while trying to delete this file. Try again later',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        })
    }

    const trySaveFile = () => {
        var error = props.isError
        if(error) {
            console.warn('ERROR: Invalid or Missing Input.')
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
            isCalculatedDepositInitial: props.isCalculatedDepositInit,
            isCalculatedDepositSecond: props.isCalculatedDepositSecond,
            isCalculatedLoanApproval: props.isCalculatedLoanApproval,
            isCalculatedInspection: props.isCalculatedInspection,
            isCalculatedClosing: props.isCalculatedClosing,
            notes: props.notes,
            whoRepresenting: props.whoRepresenting,
            isPurchase: props.isPurchase,
            roles: JSON.stringify(props.roles),
            milestones: JSON.stringify(props.milestones),
            status: props.status,
        }

        // if new file, POST to database.
        if(props.new) {
            axiosInstance.post(`${process.env.REACT_APP_API_URL}/files`, file).then(() => {
                setProfile(profile => {
                    return {...profile, actions: profile.actions + 1 }
                })
                console.info(`Successfully created file ${props.fileNo}`);
                props.toast({
                    title: 'Success!',
                    description: `Successfully created file ${props.fileNo}`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                props.onClose();
                props.resetAllValues();
            }).catch((err) => {
                if(err.response && err.response.data.message === 'This file already exists.') {
                    console.warn('ERROR: This file number is already in use.');
                    props.toast({
                        title: 'Error.',
                        description: 'This file number is already in use.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    })
                } else {
                    console.warn('ERROR: A problem occurred while trying to save this file. Please try again later.');
                    props.toast({
                        title: 'Error.',
                        description: 'An error occurred while trying to save this file. Try again later.',
                        status: 'error',
                        duration: 2500,
                        isClosable: true,
                    })
                }
            })
        } else { // else (if old file), PUT (update) file in database.
            axiosInstance.put(`${process.env.REACT_APP_API_URL}/files`, file).then(() => {
                setProfile(profile => {
                    return {...profile, actions: profile.actions + 1 }
                })
                console.info(`Successfully updated file ${props.fileNo}`);
                props.toast({
                    title: 'Success!',
                    description: `Successfully updated file ${props.fileNo}`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                props.onClose();
            })
        }
    }
    
    return (
        <HStack h='40px'>
            {/* If adding a new file, show Clear Fields Button. If updating an existing file, show Delete File Button */}
            {props.new &&
                <Button w={props.otherButtonsW} height={props.buttonH} colorScheme='red' fontSize={props.fontSize} onClick={()=>{onOpenClearFields()}}>
                    CLEAR FIELDS
                </Button> ||
                <Button w={props.otherButtonsW} height={props.buttonH} colorScheme='red' fontSize={props.fontSize} onClick={()=>{onOpenDeleteFile()}}>
                    DELETE FILE
                </Button>
            }
            <Button w={props.saveButtonW} height={props.buttonH} colorScheme='blue' fontSize={props.fontSize} onClick={()=>{trySaveFile()}}>
                SAVE
            </Button>

            <FileDialogBox
                isOpen={isOpenDeleteFile}
                onOpen={onOpenDeleteFile}
                onClose={onCloseDeleteFile}
                buttonHeight={props.buttonH}
                fontSize={props.fontSize}
                header={`Delete File ${props.fileNo}?`}
                body={`Are you sure you want to delete this file?\nThis action cannot be undone.`}
                action={deleteFile}
                confirmButton={'Delete'}
            />
            <FileDialogBox
                isOpen={isOpenClearFields}
                onOpen={onOpenClearFields}
                onClose={onCloseClearFields}
                buttonHeight={props.buttonH}
                fontSize={props.fontSize}
                header={`Clear All Fields?`}
                body={`Are you sure you want to clear all fields?\nThis action cannot be undone.`}
                action={props.resetAllValues}
                confirmButton={'Clear'}
            />
        </HStack>
    )
}

export default FileClearAndSaveButtons;