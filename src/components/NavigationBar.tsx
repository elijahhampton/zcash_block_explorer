import React from 'react';
import { Typography, Sheet, Stack, Button, IconButton } from '@mui/joy'; 
import { GitHub } from '@mui/icons-material';
import SearchBar from './SearchBar';

const NavigationBar = () => {
  return (
    <Sheet sx={{padding: '0.2rem 6rem', borderBottom: '1px solid #eee', backgroundColor: 'var(--joy-palette-primary-500, #0B6BCB)',  /*boxShadow:"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",*/ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography sx={{ color: 'var(--joy-palette-common-white, #FFF)' }} fontWeight="bold" fontSize="15">
        ZCash BlockExplorer
      </Typography>


      <Stack direction='row' alignItems='center' spacing={1}>
        <SearchBar placeholder='Search Block Hash / Transaction ID' onSearch={() => {}} />

      <Button variant='plain' sx={{ color: 'var(--joy-palette-common-white, #FFF)' }}>
        Roadmap
      </Button>

      <IconButton>
        <GitHub />
      </IconButton>
      </Stack>

    </Sheet>
  );
};

export default NavigationBar;
