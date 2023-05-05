import React, { useState } from 'react';
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

import { themeContext } from './Helpers/themeContext';
import Navbar from './Components/Navbar';
import Main from './Pages/Main';

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();

function App() {

  const [theme, setTheme] =  useState(true);

  return (
    <ChakraProvider theme={chakraTheme} resetCSS>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <themeContext.Provider value = {{ theme, setTheme }}>
            <Box className='App' w='full'
              bgColor={theme ? 'var(--background-light)' : 'var(--background-dark)'}
              textColor={theme ? 'var(--text-color-light)' : 'var(--text-color-dark)'}
            >
              <Navbar/>
              <Main/>
            </Box>
          </themeContext.Provider>
        </LocalizationProvider>
      </MaterialThemeProvider>
    </ChakraProvider>
  );
}

export default App;
