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
    MenuGroup,
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
        if(process.env.REACT_APP_ENV === 'staging')
            return;
        
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
                    size={props.buttonSize}
                    iconSize={props.iconSize}
                />
                <MenuList bgColor={'gray.800'} minWidth={props.menuWidth} width={props.menuWidth} fontSize={props.menuFontSize}>
                    <Text h='30px' textAlign='center' padding='4px'>
                        HELLO, {profile.user ? profile.user.toUpperCase() : 'GUEST'}
                    </Text>
                    <MenuDivider marginInline='5px' marginBlock={props.menuMargin}/>
                    {profile.loggedIn ? 
                        <>
                            <MenuItem
                                bgColor={'gray.800'}
                                _hover={{ bgColor:'gray.600' }}
                                onClick={onOpenSettingsModal}
                            >
                                Settings
                            </MenuItem>
                            <MenuDivider marginInline='5px' marginBlock={props.menuMargin}/>
                            {/* Pages Menu Group */}
                            <MenuGroup title='Pages' textAlign='left' textDecor='underline' m='2px 16px'>
                                {/* Button to Navigate to Critical Dates Timeline */}
                                <MenuItem
                                    bgColor={window.location.pathname === '/' ? 'blue.600' : 'gray.800'}
                                    _hover={window.location.pathname !== '/' && { bgColor:'gray.600' }}
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                >
                                    Critical Dates Timeline
                                </MenuItem>
                                {/* Button to Navigate to To-Do List */}
                                <MenuItem
                                    bgColor={window.location.pathname === '/tasks' ? 'blue.600' : 'gray.800'}
                                    _hover={window.location.pathname !== '/tasks' && { bgColor:'gray.600' }}
                                    onClick={() => {
                                        navigate('/tasks');
                                    }}
                                >
                                    Tasks To-Do List
                                </MenuItem>

                            </MenuGroup>
                            <MenuDivider marginInline='5px' marginBlock={props.menuMargin}/>
                            <MenuItem
                                bgColor={'gray.800'}
                                _hover={{bgColor:'gray.600'}}
                                onClick={()=>{
                                    logoutUser()
                                }}
                                isDisabled={process.env.REACT_APP_ENV === 'staging'}
                            >
                                Logout
                            </MenuItem>
                        </> : 
                        <>
                            <MenuItem
                                bgColor={'gray.800'}
                                _hover={{bgColor:'gray.600'}}
                                onClick={()=>{
                                    navigate('/login')
                                }}
                            >
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