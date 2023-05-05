import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import TableRow from "./TableRow";

const DatesTable = (props) => {
    
    const columnHeaders = [
        {text:'Date', w:'110px'},
        {text:'File No.', w:'66px'},
        {text:'Event', w:'98px'},
        {text:'Buyer', w:'242px'},
        {text:'Seller', w:'242px'},
        {text:'Address', w:'242px'},
    ]

    return (
        <VStack>
            <VStack>
                <Text fontSize='20px' fontWeight='bold'>
                    {`${props.type} | ${props.when}`}
                </Text>

                <Divider w='1000px' borderColor='red' />

                {/* Table Column Headers */}
                <HStack w='1000px' spacing='0'>
                    {
                        columnHeaders.map((item, index) => {
                            return <Text w={item.w} key={index}>
                                {item.text}
                            </Text>
                        })
                    }
                </HStack>

                <Divider w='1000px' borderColor='red' />
            </VStack>

            <VStack>
                {
                    props.dates.length > 0 ? props.dates.map((item, index) => {
                        return (
                            <TableRow
                                key={index}
                                file={item}
                            />
                        )
                    }) : (
                        <Text>
                            {`No critical dates found with the given criteria: { type: ${props.type} | when: ${props.when} | status: ${props.status} }`}
                        </Text>
                    )
                }
            </VStack>
        </VStack>
    )
}

export default DatesTable;