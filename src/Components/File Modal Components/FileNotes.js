import {
    VStack,
    Text,
    Textarea,
} from '@chakra-ui/react'

const FileNotes = (props) => {
    return (
        <VStack w='full' h={props.height}>
            <Text fontWeight='bold'>
                Notes:
            </Text>
            <Textarea minH={props.minHeight} h='full' fontSize='12px' resize='none'
                value={props.notes}
                onChange={(e) => {props.setNotes(e.target.value)}}
            />
        </VStack>
    )
}

export default FileNotes;