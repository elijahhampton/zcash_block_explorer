import React from 'react';
import { Container, Typography, Divider } from '@mui/joy'; 

const Footer = () => {
  return (
    <footer style={{
      bottom: 0,
      position: 'fixed',
      textAlign: "center",
      marginTop: "10px",
      width: '100%',
      backgroundColor: '#f8f8f8', 
      padding: '10px 22',
    }}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>
          Explore private money with no transfer
        </Typography>
        <Typography>
          2023 c Private Apps
        </Typography>
      </Container>
      <Divider sx={{ mt: 2 }} />
    </footer>
  );
};

export default Footer;
