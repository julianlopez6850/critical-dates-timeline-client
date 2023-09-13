import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { 
    ChakraProvider,
    extendTheme as chakraExtendTheme,
    VStack
} from '@chakra-ui/react';

import {
    ThemeProvider as MaterialThemeProvider,
    createTheme as muiCreateTheme,
    THEME_ID,
} from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { profileContext } from './Helpers/profileContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Main from './Pages/Main';
import Login from './Pages/Login';

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();

function App() {

    const [profile, setProfile] =  useState({ loggedIn: false, user: undefined, darkMode: false, actions: 0, notificationSettings: undefined });

    useEffect(() => {
        document.body.style.backgroundColor=profile.darkMode ? 'var(--background-dark)' : 'var(--background-light)';
    }, [profile.darkMode])

    return (
        <ChakraProvider theme={chakraTheme} resetCSS>
            <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <profileContext.Provider value={{ profile, setProfile }}>
                        <VStack
                            className='App'
                            w='full'
                            justifyContent='space-between'
                            bgColor={profile.darkMode ? 'var(--background-dark)' : 'var(--background-light)'}
                            textColor={profile.darkMode ? 'var(--text-color-dark)' : 'var(--text-color-light)'}
                        >
                            <Router>
                                <Routes>
                                    <Route exact path='/' element={<>
                                        <VStack w='full'>
                                            <Navbar/>
                                            <Main/>
                                        </VStack>
                                        <Footer/>
                                    </>} />
                                    <Route exact path='/login' element={<Login/>} />
                                </Routes>
                            </Router>
                        </VStack>
                    </profileContext.Provider>
                </LocalizationProvider>
            </MaterialThemeProvider>
        </ChakraProvider>
    );
}

export default App;
