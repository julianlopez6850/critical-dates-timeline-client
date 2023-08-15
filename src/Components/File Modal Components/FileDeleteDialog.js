import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
} from '@chakra-ui/react'

const FileDeleteDialog = (props) => {
    return (
        <AlertDialog
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent w='fit-content' h='fit-content' bgColor='gray.700' color='white' fontSize={props.fontSize}>
                    <AlertDialogHeader fontSize={props.fontSize} fontWeight='bold'>
                        Delete File {props.fileNo}?
                    </AlertDialogHeader>
                    <AlertDialogBody whiteSpace='pre-line'>
                        Are you sure you want to delete this file?{'\n'}
                        This action cannot be undone.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            h={props.buttonHeight}
                            fontSize={props.fontSize}
                            colorScheme='whiteAlpha'
                            onClick={props.onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            h={props.buttonHeight}
                            ml={3}
                            fontSize={props.fontSize}
                            colorScheme='red'
                            onClick={()=>{props.onClose(); props.deleteFile()}}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default FileDeleteDialog;