import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
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
import Dates from './Pages/Dates';
import Tasks from './Pages/Tasks';
import Login from './Pages/Login';

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();

function App() {
    const [socket, setSocket] = useState('');
    const [profile, setProfile] =  useState({ loggedIn: false, user: undefined, darkMode: false, actions: 0, externalActions: 0, notificationSettings: undefined, updatesMade: [], updatesReceived: [], openModal: '' });

    useEffect(() => {
        document.body.style.backgroundColor = profile.darkMode ? 'var(--background-dark)' : 'var(--background-light)';
    }, [profile.darkMode])

    useEffect(() => {
        if(process.env.NODE_ENV === 'staging')
            return;
        if(profile.actions === 0)
            return setSocket(io.connect(process.env.REACT_APP_API_URL));
        else if(profile.actions === 1)
            socket.emit('join_room', profile.user);
        else if(profile.actions > 1 && profile.updatesMade.length > 0) {
            socket.emit('update_others', profile.updatesMade);
            setProfile(profile => {
                return {...profile, updatesMade: [] }
            });
        }
    }, [profile.actions])

    useEffect(() => {
        if(socket === '')
            return;

        socket.on('receive_update', (data) => {
            if(data.length === 0)
                return;
            console.info('Data has been updated by another user:', data);
            return setProfile(profile => {
                return {...profile, externalActions: profile.externalActions + 1, updatesReceived: data }
            });
        });
    }, [socket]);

    useEffect(() => {
        if(profile.openModal === '' && profile.externalActions > 0) {
            return setProfile(profile => {
                return {...profile, actions: profile.actions + 1 }
            });
        }
    }, [profile.externalActions])

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
                                    <Route
                                        exact path='/'
                                        element={ <>
                                            <Navbar/>
                                            <Dates/>
                                            <Footer/>
                                        </> }
                                    />
                                    <Route
                                        exact path='/tasks'
                                        element={ <>
                                            <Navbar/>
                                            <Tasks/>
                                            <Footer/>
                                        </> }
                                    />
                                    <Route
                                        exact path='/login'
                                        element={ <Login/> }
                                    />
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
