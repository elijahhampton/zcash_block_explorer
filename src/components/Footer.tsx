import React from 'react';
import { IconButton,  Typography, Divider, Stack, Box, Link } from '@mui/material'; 
import { GitHub } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{
      boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      width: '100%',
      paddingLeft: '6rem',
      paddingRight: '6rem',
      paddingTop: '1rem',
      backgroundColor: '#fff', 
    }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Box>
        <Typography color='black' variant='caption'>
          Explore private money
        </Typography>

        <Link href="https://github.com/elijahhampton/blockexplorer_ui" target="_blank" rel="noopener">
          <IconButton size='sm'>
            <GitHub fontSize="small" sx={{ fontSize: 15 }} />
          </IconButton>
        </Link>
        </Box>

        <Typography color='black' variant='caption'>
          2023© Private Apps
        </Typography>
      </Stack>

      <Divider sx={{ mt: 2 }} />
    </footer>
  );
};

export default Footer;
