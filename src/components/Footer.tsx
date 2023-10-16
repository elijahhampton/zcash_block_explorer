import React from 'react';
import { Container, Typography, Divider, Stack } from '@mui/joy'; 

const Footer = () => {
  return (
    <footer style={{
      boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      bottom: 0,
      position: 'fixed',
      width: '100%',
      paddingLeft: '6rem',
      paddingRight: '6rem',
      paddingTop: '1rem',
      backgroundColor: '#fff', 
      zIndex: 999
    }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography level="body-sm">
          Explore private money
        </Typography>
        <Typography level="body-sm">
          2023© Private Apps
        </Typography>
      </Stack>

      <Divider sx={{ mt: 2 }} />
    </footer>
  );
};

export default Footer;
