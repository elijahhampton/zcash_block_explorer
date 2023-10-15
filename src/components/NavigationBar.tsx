import React from 'react';
import { Typography, Sheet, Stack, Button, IconButton, Link } from '@mui/joy'; 
import { GitHub } from '@mui/icons-material';
import SearchBar from './SearchBar';

const NavigationBar = () => {
  return (
    <Sheet sx={{padding: '0.2rem 6rem', borderBottom: '1px solid #ddd', backgroundColor: '#FFF',  display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography fontWeight="bold" fontSize="15">
        ZCash BlockExplorer
      </Typography>

      <Stack direction='row' alignItems='center' spacing={1}>
        <SearchBar placeholder='Search Block Hash / Transaction ID' onSearch={() => {}} />
        <Button variant='plain' size="sm" sx={{ fontSize: 13  }}>
          Roadmap
        </Button>

        {/* Wrap IconButton with Link */}
        <Link href="https://github.com/elijahhampton/blockexplorer_ui" target="_blank" rel="noopener">
          <IconButton size='sm'>
            <GitHub fontSize="small" />
          </IconButton>
        </Link>
      </Stack>
    </Sheet>
  );
};

export default NavigationBar;
