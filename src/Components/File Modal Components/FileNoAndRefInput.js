import {
    Stack,
    HStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'

const FileNoAndRefInput = (props) => {
    return (
        <Stack direction={props.headerStackDir} fontSize={props.headerFontSize} spacing={props.spacing}>
            <HStack w='fit-content'>
                <Text minW={props.beginningMinW}>File No.</Text>
                <Tooltip label={props.isFileNoError || ''}>
                    <Input
                        w={props.fileNoW}
                        minW={props.fileNoW}
                        h={props.headerInputHeight}
                        paddingInline='0'
                        borderRadius='5px'
                        fontSize='inherit'
                        textAlign='center'
                        value={props.fileNo}
                        maxLength='7'
                        onChange={(e)=>{
                            props.setFileNo(e.target.value.slice(0,5) + e.target.value.slice(5).toUpperCase());
                        }}
                        isInvalid={props.isFileNoError}
                        autoFocus={true}
                        placeholder='#####AA'
                        style={{textTransform: 'uppercase'}}
                    />
                </Tooltip>
            </HStack>
            <HStack w={props.headerStackDir === 'column' ? 'full' : ''}>
                <Text minW={props.headerStackDir === 'column' ? props.beginningMinW : 'fit-content'}>File Ref.</Text>
                <Tooltip label={props.isFileRefError || ''}>
                    <Input
                        w={props.fileRefW}
                        h={props.headerInputHeight}
                        paddingInline={props.inputPadding}
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