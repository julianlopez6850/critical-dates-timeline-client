import {
    Stack,
    HStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'

const FilePropertyInfo = (props) => {
    return (
        <Stack direction={props.stackDir} w='full' mt='8px !important'>
            <HStack w='full'>
                <Text minW={props.minW}>
                    Property
                </Text>
                <Tooltip label={props.isPropertyError || ''}>
                    <Input
                        height={props.height}
                        paddingInline={props.padding}
                        borderRadius='10px'
                        fontSize={props.fontSize}
                        value={props.propertyAddress}
                        onChange={(e) => {props.setPropertyAddress(e.target.value)}}
                        isInvalid={props.isPropertyError}
                    />
                </Tooltip>
            </HStack>
            <HStack minW='250px'>
                <Text minW={props.stackDir === 'column' ? props.minW : 'fit-content'}>
                    Folio
                </Text>
                <Input
                    height={props.height}
                    paddingInline={props.padding}
                    borderRadius='10px'
                    fontSize={props.fontSize}
                    value={props.folioNo}
                    onChange={(e) => {props.setFolioNo(e.target.value)}}
                />
            </HStack>
        </Stack>
    )
}

export default FilePropertyInfo;