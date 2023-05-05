import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { themeContext } from "../Helpers/themeContext";

import {
    useDisclosure,
    Box, 
    Button, 
    HStack, 
    Input, 
    Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SettingsIcon, SearchIcon, AddIcon } from "@chakra-ui/icons";
import NavbarButton from "./NavbarButton";
import { FileSelect } from "./FileSelect";
import { EditFile } from "./EditFile";

const Navbar = () => {
    
    const {theme, setTheme} = useContext(themeContext);
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState();

    const updateTheme = (e) => {
        e.preventDefault();
        setTheme(theme => !theme);
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/files/all`).then((response) => {
            setFiles([]);
            response.data.map((file) => {
                setFiles((files) => [...files, {
                    value: file.fileNumber,
                    label: `${file.fileNumber} - ${file.seller}, ${file.buyer}`,
                    ...file
                }]);
            });
        }).catch((error) => {
            console.log('Error retrieving dates: ' + error.message);
        });
    }, []);

    const searchFile = () => {
        if(selectedFile) {
            onOpen();
        }
    }

    return (
        <Box w='full'>
            <HStack h='60px' w='full' bgColor='var(--navbar-color)' textColor='white' display='flex' justifyContent='space-between' paddingInline='10px'>
                {/* Navbar, Left Side */}
                <HStack display='flex' maxW='prose' justifyContent='left' w='320px' minW='320px'>
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
                        icon={<AddIcon/>}
                    />
                </HStack>
                {/* Navbar, Center */}
                <HStack display='flex' justifyContent='center' w='80%' minW='218px'>                
                    <Text fontSize='20px' fontWeight='bold'>
                        Critical Times Schedule
                    </Text>
                </HStack>
                {/* Navbar, Right Side */}
                <HStack display='flex' justifyContent='right' w='20%'>
                    {/* Button: Switch between light and dark background theme */}
                    <NavbarButton
                        onClick={(e) => {updateTheme(e)}}
                        icon={theme ? <MoonIcon/> : <SunIcon/>} 
                    />
                    {/* Button: Open Settings */}
                    <NavbarButton
                        icon={<SettingsIcon/>}
                    />
                </HStack>
            </HStack>
            <Box w='full' h='2px' bgColor='var(--navbar-seperator)' />

            
            <EditFile
                onClose={onClose}
                isOpen={isOpen}
                fileNo={selectedFile ? selectedFile.value : ''}
            />
        </Box>

    )
}

export default Navbar;