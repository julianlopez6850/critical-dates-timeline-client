import {
    VStack,
    HStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'

const FilePropertyInfo = (props) => {
    return (
        <VStack w='full' mt={props.spacing + '!important'} spacing={props.spacing}>
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
            <HStack w='full'>
                <HStack w='full'>
                    <Text minW={props.beginningMinW}>
                        County
                    </Text>
                    <Tooltip label={props.isPropertyError || ''}>
                        <Input
                            height={props.bodyInputHeight}
                            paddingInline={props.inputPadding}
                            borderRadius='10px'
                            fontSize={props.bodyFontSize}
                            value={props.county}
                            onChange={(e) => {props.setCounty(e.target.value)}}
                            isInvalid={props.isPropertyError}
                        />
                    </Tooltip>
                </HStack>
                <HStack w='full'>
                    <Text minW={props.secondMinW}>
                        Folio
                    </Text>
                    <Tooltip label={props.isPropertyError || ''}>
                        <Input
                            height={props.bodyInputHeight}
                            paddingInline={props.inputPadding}
                            borderRadius='10px'
                            fontSize={props.bodyFontSize}
                            value={props.folioNo}
                            onChange={(e) => {props.setFolioNo(e.target.value)}}
                            isInvalid={props.isPropertyError}
                        />
                    </Tooltip>
                </HStack>
            </HStack>
        </VStack>
    )
}

export default FilePropertyInfo;