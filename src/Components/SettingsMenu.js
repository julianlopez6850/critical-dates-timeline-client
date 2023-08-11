import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileContext } from '../Helpers/profileContext';
import { axiosInstance } from '../Helpers/axiosInstance';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    MenuDivider,
    Box,
    useDisclosure,
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons';

import NavbarButton from './NavbarButton';
import SettingsModal from './SettingsModal';

const SettingsMenu = (props) => {
    
    const { profile, setProfile } = useContext(profileContext);

    const navigate = useNavigate();

    const { 
        isOpen: isOpenSettingsModal, 
        onOpen: onOpenSettingsModal, 
        onClose: onCloseSettingsModal 
    } = useDisclosure()

    const logoutUser = () => {
        axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/logout`).then(() => {
            console.info('You have been logged out successfully.');
            setProfile(profile => {
                return {...profile, loggedIn: false, user: undefined }
            })
        })
    }

    return (
        <Box>
            <Menu>
                <MenuButton
                    as={NavbarButton}
                    icon={<SettingsIcon/>}
                    size={props.size}
                />
                <MenuList bgColor={'gray.800'} minWidth={props.width} width={props.width} fontSize={props.fontSize}>
                    <Text h='30px' textAlign='center' padding='4px'>
                        HELLO, {profile.user ? profile.user.toUpperCase() : 'GUEST'}
                    </Text>
                    <MenuDivider marginInline='5px' marginBlock={props.margin}/>
                    {profile.loggedIn ? 
                        <>
                            <MenuItem bgColor={'gray.800'} _hover={{bgColor:'gray.600'}} onClick={onOpenSettingsModal}>
                                Settings
                            </MenuItem>
                            <MenuDivider marginInline='5px' marginBlock={props.margin}/>
                            <MenuItem bgColor={'gray.800'} _hover={{bgColor:'gray.600'}} onClick={()=>{logoutUser()}}>
                                Logout
                            </MenuItem>
                        </> : 
                        <>
                            <MenuItem bgColor={'gray.800'} _hover={{bgColor:'gray.600'}} onClick={()=>{navigate('/login')}}>
                                LOGIN
                            </MenuItem>
                        </>
                    }
                </MenuList>
            </Menu>

            <SettingsModal
                isOpen={isOpenSettingsModal}
                onClose={onCloseSettingsModal}
            />
        </Box>
    )
}

export default SettingsMenu;