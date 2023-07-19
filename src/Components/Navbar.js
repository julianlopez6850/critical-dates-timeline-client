import { useState, useEffect, useContext } from 'react';
import { profileContext } from '../Helpers/profileContext';
import { axiosInstance } from '../Helpers/axiosInstance'

import {
    useDisclosure,
    Box,
    HStack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';

import NavbarButton from './NavbarButton';
import FileSelect from './FileSelect';
import UpsertFile from './UpsertFile';
import SettingsMenu from './SettingsMenu';

const Navbar = () => {

    const {profile, setProfile} = useContext(profileContext);

    const toast = useToast();

    const { 
        isOpen: isOpenFileCreator, 
        onOpen: onOpenFileCreator, 
        onClose: onCloseFileCreator 
    } = useDisclosure()

    const { 
        isOpen: isOpenFileEditor, 
        onOpen: onOpenFileEditor, 
        onClose: onCloseFileEditor 
    } = useDisclosure()

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState();

    const updateTheme = (e) => {
        e.preventDefault();
        setProfile(profile => {
            return { ...profile, lightTheme: !profile.lightTheme }
        });
    }

    useEffect(() => {
        setFiles([]);
        setSelectedFile('')

        if(profile.loggedIn === false)
            return;

        axiosInstance.get(`${process.env.REACT_APP_API_URL}/files/all`).then((response) => {
            response.data.files.map((file) => {
                setFiles((files) => [...files, {
                    value: file.fileNumber,
                    label: `${file.fileNumber} - ${file.fileRef}`,
                    ...file
                }]);
            });
        }).catch(() => {
            console.warn('ERROR: A problem occurred while trying to retrieve file info. Please try again later.');
            toast({
                title: 'Error.',
                description: 'An error occurred while trying to retrieve file info. Try again later',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        });
    }, [profile.loggedIn, profile.actions]);

    const searchFile = () => {
        if(selectedFile) {
            onOpenFileEditor();
        }
    }

    return (
        <Box w='full'>
            <HStack h='60px' w='full' bgColor='var(--navbar-color)' textColor='white' display='flex' justifyContent='space-between' paddingInline='10px'>
                {/* Navbar, Left Side */}
                <HStack display='flex' justifyContent='left' w='320px' minW='320px'>
                    {/* Search for Specific File */}
                    <FileSelect
                        options={files}
                        value={selectedFile}
                        onChange={(selection) => {
                            setSelectedFile(selection);
                        }}
                    />
                    <NavbarButton
                        onClick={(e) => {searchFile()}}
                        icon={<SearchIcon/>}
                    />
                    {/* Button: Add New File */}
                    <NavbarButton
                        onClick={(e) => {onOpenFileCreator()}}
                        icon={<AddIcon/>}
                    />
                </HStack>
                {/* Navbar, Center */}
                <HStack display='flex' justifyContent='center' minW='218px'>                
                    <Text fontSize='20px' fontWeight='bold'>
                        Critical Times Schedule
                    </Text>
                </HStack>
                {/* Navbar, Right Side */}
                <HStack display='flex' justifyContent='right' w='320px' minW='120px'>
                    {/* Button: Switch between light and dark background theme */}
                    <NavbarButton
                        onClick={(e) => {updateTheme(e)}}
                        icon={profile.lightTheme ? <MoonIcon/> : <SunIcon/>} 
                    />
                    {/* Button: Open Settings */}
                    <SettingsMenu/>
                </HStack>
            </HStack>
            <Box w='full' h='2px' bgColor='var(--navbar-seperator)' />

            <UpsertFile
                new={true}
                onClose={onCloseFileCreator}
                isOpen={isOpenFileCreator}
            />
            <UpsertFile
                new={false}
                onClose={onCloseFileEditor}
                isOpen={isOpenFileEditor}
                fileNo={selectedFile ? selectedFile.value : ''}
            />
        </Box>

    )
}

export default Navbar;