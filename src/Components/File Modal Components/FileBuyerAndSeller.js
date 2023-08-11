import {
    Stack,
    HStack,
    Text,
    Tooltip,
    Input,
} from '@chakra-ui/react'

const FileBuyerAndSeller = (props) => {
    return (
        <Stack direction={props.stackDir} w='full' fontSize={props.fontSize} spacing={props.spacing}>
            <HStack w='full'>
                <Text minW={props.minW}>
                    {props.isPurchase ? (props.whoRepresenting ? ' Seller' : ' Buyer') : 'Borrower'}
                </Text>
                <Tooltip label={props.whoRepresenting ? props.isSellerError || '' : props.isBuyerError || ''}>
                    <Input
                        height={props.height}
                        paddingInline={props.padding}
                        borderRadius='10px'
                        fontSize={props.fontSize}
                        value={props.whoRepresenting ? props.seller : props.buyer}
                        onChange={(e) => {props.whoRepresenting ? props.setSeller(e.target.value) : props.setBuyer(e.target.value)}}
                        isInvalid={props.whoRepresenting ? props.isSellerError : props.isBuyerError}
                    />
                </Tooltip>
            </HStack>
            <HStack w={props.stackDir === 'column' ? 'full' : '97%'}>
                <Text minW={props.stackDir === 'column' ? props.minW : 'fit-content'}>
                    {props.isPurchase ? (props.whoRepresenting ? 'Buyer' : 'Seller') : 'Lender'}
                </Text>
                <Tooltip label={props.whoRepresenting ? props.isBuyerError || '' : props.isSellerError || ''}>
                    <Input
                        height={props.height}
                        paddingInline={props.padding}
                        borderRadius='10px'
                        fontSize={props.fontSize}
                        value={props.whoRepresenting ? props.buyer : props.seller}
                        onChange={(e) => {props.whoRepresenting ? props.setBuyer(e.target.value) : props.setSeller(e.target.value)}}
                        isInvalid={props.whoRepresenting ? props.isBuyerError : props.isSellerError}
                    />
                </Tooltip>
            </HStack>
        </Stack>
    )
}

export default FileBuyerAndSeller;