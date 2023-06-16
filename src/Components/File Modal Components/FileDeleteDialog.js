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
                <AlertDialogContent bgColor='gray.700' color='white'>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete File {props.fileNo}?
                    </AlertDialogHeader>
                    <AlertDialogBody whiteSpace='pre-line'>
                        Are you sure you want to delete this file?{'\n'}
                        This action cannot be undone.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button colorScheme='whiteAlpha' onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={()=>{props.onClose(); props.deleteFile()}} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default FileDeleteDialog;