import { useContext, useState } from 'react';
import { profileContext } from '../Helpers/profileContext';

import {
    VStack,
    Text,
    Divider,
    Link
} from '@chakra-ui/react';

const Footer = () => {
    const { profile } = useContext(profileContext);

    const currentYear = new Date().getFullYear();
    const [owners] = useState(process.env.REACT_APP_OWNER.split('|'))
    const [ownerLink] = useState(process.env.REACT_APP_OWNER_LINK.split('|'))

    return (
        <VStack w='full' spacing='0' alignItems='center'>
            <Divider w='80%' opacity='1' borderColor='var(--navbar-seperator)'/>
            <Text
                h='50px'
                display='flex'
                alignItems='center'
                fontSize='16px'
                whiteSpace='pre-wrap'
                color='var(--navbar-seperator)'
            >
                © {currentYear} ·
                {owners.map((owner, index) => {
                    return <span key={owner}>
                        {' '}
                        {(process.env.NODE_ENV !== 'production' || profile.loggedIn) ? 
                            <Link href={ownerLink[index]} isExternal>
                                {owner}
                            </Link> :
                            <span>
                                {owner}
                            </span>
                        }
                        {index === 0 && owners.length > 1 && ' &'}
                    </span>
                })}
            </Text>
        </VStack>
    )
}

export default Footer;