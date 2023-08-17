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
import { SearchIcon, AddIcon} from '@chakra-ui/icons';

import NavbarButton from './NavbarButton';
import FileSelect from './FileSelect';
import FileModal from './FileModal';
import SettingsMenu from './SettingsMenu';

const Navbar = () => {
    
    const [styles, setStyles] = useState({});

    useEffect(() => {
        const windowListener = () => {
            if(window.innerWidth >= 650) {
                setStyles({
                    navbarHeight: '60px', leftMinWidth: '320px', rightMinWidth: '52px', titleSize:'20px', buttonSize:'40px',
                    fileSelectWidth:'200px', fileSelectFontSize:'16px', placeholder: 'Select File...', isSearchable: true,
                    menuWidth:'200px', menuFontSize:'16px', menuMargin:'5px'
                });
            } else if(window.innerWidth >= 500) {
                setStyles({
                    navbarHeight: '40px', leftMinWidth: '248px', rightMinWidth: '36px', titleSize:'16px', buttonSize:'30px',
                    fileSelectWidth:'160px', fileSelectFontSize:'14px', placeholder: 'Select File...', isSearchable: true,
                    menuWidth:'175px', menuFontSize:'14px', menuMargin:'2px'
                });
            } else if(window.innerWidth >= 420) {
                setStyles({
                    navbarHeight: '40px', leftMinWidth: '80px', rightMinWidth: '36px', titleSize:'16px', buttonSize:'30px',
                    fileSelectWidth:'36px', fileSelectFontSize:'10px', placeholder: '', isSearchable: false,
                    menuWidth:'150px', menuFontSize:'14px', menuMargin:'0px'
                });
            }  else {
                setStyles({
                    navbarHeight: '40px', leftMinWidth: '80px', rightMinWidth: '36px', titleSize:'16px', buttonSize:'30px',
                    fileSelectWidth:'36px', fileSelectFontSize:'10px', placeholder: '', isSearchable: false,
                    menuWidth:'120px', menuFontSize:'12px', menuMargin:'0px'
                });
            }
        };
        windowListener();
        window.addEventListener('resize', windowListener);
        return () => window.removeEventListener('resize', windowListener);
    }, []);

    const { profile } = useContext(profileContext);

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

    return (
        <Box w='full'>
            <HStack h={styles.navbarHeight} w='full' bgColor='var(--navbar-color)' textColor='white' display='flex' justifyContent='space-between' paddingInline='10px'>
                {/* Navbar, Left Side */}
                <HStack display='flex' justifyContent='left' w={styles.leftMinWidth} minW={styles.leftMinWidth}>
                    {profile.loggedIn && <>
                        {/* Search for Specific File */}
                        <FileSelect
                            options={files}
                            isSearchable={styles.isSearchable}
                            value={selectedFile}
                            onChange={(selection) => {
                                setSelectedFile(selection);
                            }}
                            openFile={onOpenFileEditor}
                            height={styles.buttonSize}
                            width={styles.fileSelectWidth}
                            fontSize={styles.fileSelectFontSize}
                            placeholder={styles.placeholder}
                            arrowMargin={styles.arrowMargin}
                            removeWidth={styles.removeWidth}
                        />
                        {styles.isSearchable &&
                            <NavbarButton
                                onClick={() => {
                                    if(selectedFile)
                                        onOpenFileEditor();
                                }}
                                icon={<SearchIcon/>}
                                size={styles.buttonSize}
                            />
                        }
                        
                        {/* Button: Add New File */}
                        <NavbarButton
                            onClick={onOpenFileCreator}
                            icon={<AddIcon/>}
                            size={styles.buttonSize}
                        />
                    </>}
                </HStack>
                {/* Navbar, Center */}
                <HStack display='flex' justifyContent='center' minW='fit-content'>                
                    <Text fontSize={styles.titleSize} fontWeight='bold'>
                        Critical Dates Schedule
                    </Text>
                </HStack>
                {/* Navbar, Right Side */}
                <HStack display='flex' justifyContent='right' w={styles.leftMinWidth} minW={styles.rightMinWidth}>
                    {/* Button: Open Settings */}
                    <SettingsMenu
                        size={styles.buttonSize}
                        width={styles.menuWidth}
                        fontSize={styles.menuFontSize}
                        margin={styles.menuMargin}
                    />
                </HStack>
            </HStack>
            <Box w='full' h='2px' bgColor='var(--navbar-seperator)' />

            <FileModal
                new={true}
                onClose={onCloseFileCreator}
                isOpen={isOpenFileCreator}
            />
            <FileModal
                new={false}
                onClose={onCloseFileEditor}
                isOpen={isOpenFileEditor}
                fileNo={selectedFile ? selectedFile.value : ''}
            />
        </Box>

    )
}

export default Navbar;