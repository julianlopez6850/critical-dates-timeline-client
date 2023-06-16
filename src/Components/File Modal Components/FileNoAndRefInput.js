import {
    HStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'

const FileNoAndRefInput = (props) => {
    return (
        <HStack w='800px'>
            <Text w='55px' minW='55px'>File No.</Text>
            <Tooltip label={props.isFileNoError || ''}>
                <Input
                    w='75px'
                    minW='75px'
                    size='sm'
                    borderRadius='5px'
                    fontSize='16px'
                    textAlign='center'
                    value={props.fileNo}
                    maxLength='5'
                    onChange={(e)=>{props.setFileNo(e.target.value)}}
                    isInvalid={props.isFileNoError}
                />
            </Tooltip>

            <Text>Ref:</Text>
            <Tooltip label={props.isFileRefError || ''}>
                <Input
                    w='full'
                    size='sm'
                    borderRadius='5px'
                    fontSize='16px'
                    value={props.fileRef}
                    onChange={(e)=>{props.setFileRef(e.target.value)}}
                    isInvalid={props.isFileRefError}
                />
            </Tooltip>
        </HStack>
    )
}

export default FileNoAndRefInput;