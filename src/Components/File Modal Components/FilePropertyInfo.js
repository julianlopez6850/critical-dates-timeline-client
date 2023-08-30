import {
    Stack,
    HStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'

const FilePropertyInfo = (props) => {
    return (
        <Stack direction={props.firstStacksDir} w='full' mt='8px !important'>
            <HStack w='full'>
                <Text minW={props.beginningMinW}>
                    Property
                </Text>
                <Tooltip label={props.isPropertyError || ''}>
                    <Input
                        height={props.bodyInputHeight}
                        paddingInline={props.inputPadding}
                        borderRadius='10px'
                        fontSize={props.bodyFontSize}
                        value={props.propertyAddress}
                        onChange={(e) => {props.setPropertyAddress(e.target.value)}}
                        isInvalid={props.isPropertyError}
                    />
                </Tooltip>
            </HStack>
            <HStack minW='250px'>
                <Text minW={props.firstStacksDir === 'column' ? props.beginningMinW : 'fit-content'}>
                    Folio
                </Text>
                <Input
                    height={props.bodyInputHeight}
                    paddingInline={props.inputPadding}
                    borderRadius='10px'
                    fontSize={props.bodyFontSize}
                    value={props.folioNo}
                    onChange={(e) => {props.setFolioNo(e.target.value)}}
                />
            </HStack>
        </Stack>
    )
}

export default FilePropertyInfo;