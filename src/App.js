import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { 
  ChakraProvider,
  extendTheme as chakraExtendTheme,
  Box
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
import Main from './Pages/Main';
import Login from './Pages/Login';

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();

function App() {

  const [profile, setProfile] =  useState({ loggedIn: false, user: undefined, lightTheme: true, actions: 0 });

  return (
    <ChakraProvider theme={chakraTheme} resetCSS>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <profileContext.Provider value = {{ profile, setProfile }}>
            <Box className='App' w='full'
              bgColor={profile.lightTheme ? 'var(--background-light)' : 'var(--background-dark)'}
              textColor={profile.lightTheme ? 'var(--text-color-light)' : 'var(--text-color-dark)'}
            >
              <Router>
                <Navbar/>
                <Routes>
                  <Route exact path="/" element={<Main/>} />
                  <Route exact path="/login" element={<Login/>} />
                </Routes>
              </Router>
            </Box>
          </profileContext.Provider>
        </LocalizationProvider>
      </MaterialThemeProvider>
    </ChakraProvider>
  );
}

export default App;
