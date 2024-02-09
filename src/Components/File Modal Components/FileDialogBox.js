import { useContext } from 'react';
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
} from '@chakra-ui/react'
import { profileContext } from '../../Helpers/profileContext';

const FileDialogBox = (props) => {
    const { profile, setProfile } = useContext(profileContext)
    return (
        <AlertDialog
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent w='fit-content' h='fit-content' bgColor='gray.700' color='white' fontSize={props.fontSize}>
                    <AlertDialogHeader fontSize={props.fontSize} fontWeight='bold'>
                        {props.header}
                    </AlertDialogHeader>
                    <AlertDialogBody whiteSpace='pre-line'>
                        {props.body}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            h={props.buttonHeight}
                            fontSize={props.fontSize}
                            colorScheme='whiteAlpha'
                            onClick={props.onClose}
                        >
                            {props.cancelButton}
                        </Button>
                        <Button
                            h={props.buttonHeight}
                            ml={3}
                            fontSize={props.fontSize}
                            colorScheme='red'
                            onClick={() => {
                                props.onClose();
                                props.action();
                            }}
                        >
                            {props.confirmButton}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default FileDialogBox;