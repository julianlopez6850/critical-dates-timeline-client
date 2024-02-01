import { useState } from 'react';

import {
    VStack,
    Text,
    Divider,
    Link
} from '@chakra-ui/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [owners] = useState(process.env.REACT_APP_OWNER.split('|'))
    const [ownerLink] = useState(process.env.REACT_APP_OWNER_LINK.split('|'))

    return (
        <VStack w='full' spacing='0' alignItems='center'>
            <Divider w='80%' opacity='1' borderColor='var(--navbar-seperator)'/>
            <Text h='50px' color='var(--navbar-seperator)' fontSize='16px' display='flex' alignItems='center' whiteSpace='pre-wrap'>
                © {currentYear} ·
                {owners.map((owner, index) => {
                    return <span key={owner}>
                        {' '}
                        <Link
                            href={ownerLink[index]}
                            isExternal
                        >
                            {owner}
                        </Link>
                        {index === 0 && owners.length > 1 ? ' &' : ''}
                    </span>
                })}
            </Text>
        </VStack>
    )
}

export default Footer;