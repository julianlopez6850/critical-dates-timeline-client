import {
    VStack,
    Text,
    Divider,
} from '@chakra-ui/react';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <VStack w='full' spacing='0' alignItems='center'>
            <Divider w='80%' opacity='1' borderColor='var(--navbar-seperator)'/>
            <Text h='50px' color='var(--navbar-seperator)' fontSize='16px' display='flex' alignItems='center'>
                © {currentYear} · {process.env.REACT_APP_OWNER}
            </Text>
        </VStack>
    )
}

export default Footer;