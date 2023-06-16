import {
    VStack,
    Text,
    Textarea,
} from '@chakra-ui/react'

const FileNotes = (props) => {
    return (
        <VStack w='100%' h='237px'>
            <Text>
                Notes:
            </Text>
            <Textarea h='100%' fontSize='12px' resize='none'
                value={props.notes}
                onChange={(e) => {props.setNotes(e.target.value)}}
            />
        </VStack>
    )
}

export default FileNotes;