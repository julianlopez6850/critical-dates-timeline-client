import {
    Button,
    HStack,
    Text,
} from '@chakra-ui/react'

const FileStatus = (props) => {
    return (
        <HStack fontSize={props.fontSize}>
            {props.isClosed && 
                <Button
                    w={props.statusButtonW}
                    height={props.statusButtonH}
                    fontSize={props.fontSize}
                    colorScheme='green'
                    onClick={()=>{props.setIsClosed(false)}}
                >
                    RE-OPEN FILE
                </Button> ||
                <Button
                    w={props.statusButtonW}
                    height={props.statusButtonH}
                    colorScheme='red'
                    fontSize={props.fontSize}
                    onClick={()=>{props.setIsClosed(true)}}>
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