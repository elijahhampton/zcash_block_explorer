import React from 'react';
import { Typography, Paper, Stack, Button, IconButton, AppBar, Toolbar } from '@mui/material'; 
import { GitHub } from '@mui/icons-material';
import SearchBar from './SearchBar';

const NavigationBar = () => {
  return (
    <AppBar elevation={0} variant='outlined' sx={{padding: '0rem 6rem', backgroundColor: '#FFF',   }}>
      <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>


      <Typography color='black' component="h2" fontWeight="bold" fontSize="xl">
        ZCash BlockExplorer
      </Typography>

        {/* <SearchBar placeholder='Search Block Hash / Transaction ID' onSearch={() => {}} /> */}
        </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
