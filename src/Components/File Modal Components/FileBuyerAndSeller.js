import {
    Stack,
    HStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'

const FileBuyerAndSeller = (props) => {
    return (
        <Stack direction={props.partiesStacksDir} w='full' fontSize={props.bodyFontSize} spacing={props.spacing}>
            <HStack w='full'>
                <Text minW={props.beginningMinW}>
                    {props.isPurchase ? (props.whoRepresenting === 'Seller' ? ' Seller' : ' Buyer') : 'Borrower'}
                </Text>
                <Tooltip label={props.whoRepresenting === 'Seller' ? props.isSellerError || '' : props.isBuyerError || ''}>
                    <Input
                        height={props.bodyInputHeight}
                        paddingInline={props.inputPadding}
                        borderRadius='10px'
                        fontSize={props.bodyFontSize}
                        value={props.whoRepresenting === 'Seller' ? props.seller : props.buyer}
                        onChange={(e) => {props.whoRepresenting === 'Seller' ? props.setSeller(e.target.value) : props.setBuyer(e.target.value)}}
                        isInvalid={props.whoRepresenting === 'Seller' ? props.isSellerError : props.isBuyerError}
                    />
                </Tooltip>
            </HStack>
            <HStack w='full'>
                <Text minW={props.partiesStacksDir === 'column' ? props.beginningMinW : props.secondMinW}>
                    {props.isPurchase ? (props.whoRepresenting === 'Seller' ? 'Buyer' : 'Seller') : 'Lender'}
                </Text>
                <Tooltip label={props.whoRepresenting === 'Seller' ? props.isBuyerError || '' : props.isSellerError || ''}>
                    <Input
                        height={props.bodyInputHeight}
                        paddingInline={props.inputPadding}
                        borderRadius='10px'
                        fontSize={props.bodyFontSize}
                        value={props.whoRepresenting === 'Seller' ? props.buyer : props.seller}
                        onChange={(e) => {props.whoRepresenting === 'Seller' ? props.setBuyer(e.target.value) : props.setSeller(e.target.value)}}
                        isInvalid={props.whoRepresenting === 'Seller' ? props.isBuyerError : props.isSellerError}
                    />
                </Tooltip>
            </HStack>
        </Stack>
    )
}

export default FileBuyerAndSeller;