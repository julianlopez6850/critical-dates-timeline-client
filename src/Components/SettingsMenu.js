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

const SettingsMenu = () => {
    
    const { profile, setProfile } = useContext(profileContext);

    const navigate = useNavigate();

    const { 
        isOpen: isOpenSettingsModal, 
        onOpen: onOpenSettingsModal, 
        onClose: onCloseSettingsModal 
    } = useDisclosure()

    const logoutUser = () => {
        axiosInstance.post('http://localhost:5000/auth/logout').then(() => {
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
                />
                <MenuList bgColor={'gray.800'}>
                    <Text>
                        HELLO, {profile.user ? profile.user.toUpperCase() : 'GUEST'}
                    </Text>
                    <MenuDivider/>
                    {profile.loggedIn ? 
                        <>
                            <MenuItem bgColor={'gray.800'} _hover={{bgColor:'gray.600'}} onClick={onOpenSettingsModal}>
                                Settings
                            </MenuItem>
                            <MenuDivider/>
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