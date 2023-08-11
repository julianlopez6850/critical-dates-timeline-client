import {
    Stack,
    HStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'

const FileNoAndRefInput = (props) => {
    return (
        <Stack direction={props.stackDir} fontSize={props.fontSize} spacing={props.spacing}>
            <HStack w='fit-content'>
                <Text minW='fit-content'>File No.</Text>
                <Tooltip label={props.isFileNoError || ''}>
                    <Input
                        w={props.fileNoW}
                        minW={props.fileNoW}
                        h={props.height}
                        paddingInline='0'
                        borderRadius='5px'
                        fontSize='inherit'
                        textAlign='center'
                        value={props.fileNo}
                        maxLength='5'
                        onChange={(e)=>{props.setFileNo(e.target.value)}}
                        isInvalid={props.isFileNoError}
                        autoFocus={true}
                    />
                </Tooltip>
            </HStack>
            <HStack w={props.stackDir === 'column' ? 'full' : ''}>
                <Text>Ref:</Text>
                <Tooltip label={props.isFileRefError || ''}>
                    <Input
                        w={props.fileRefW}
                        h={props.height}
                        paddingInline={props.padding}
                        borderRadius='5px'
                        fontSize='inherit'
                        value={props.fileRef}
                        onChange={(e)=>{props.setFileRef(e.target.value)}}
                        isInvalid={props.isFileRefError}
                    />
                </Tooltip>
            </HStack>
        </Stack>
    )
}

export default FileNoAndRefInput;