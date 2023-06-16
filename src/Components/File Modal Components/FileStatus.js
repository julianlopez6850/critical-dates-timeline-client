import {
    Button,
    HStack,
    Text,
} from '@chakra-ui/react'

const FileStatus = (props) => {
    return (
        <HStack>
            {props.isClosed && <Button w='120px' colorScheme='green' onClick={()=>{props.setIsClosed(false)}}>
                    RE-OPEN FILE
                </Button> ||
                <Button w='120px' colorScheme='red' onClick={()=>{props.setIsClosed(true)}}>
                    CLOSE FILE
                </Button>
            }
            <Text color={props.isClosed ? 'red' : ''}>
                STATUS: {props.isClosed ? 'CLOSED/CANCELLED' : 'OPEN'}
            </Text>
        </HStack>
    )
}

export default FileStatus;