// Footer.js


import React from 'react';
import { Container, Typography } from '@mui/joy';


// Footer.js
const Footer = () => {
  return (
    <React.Fragment>
    <footer style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', minHeight: '20vh' }}>
      <Container>
        <Typography color="primary" font-size="28">
          This is your footer content. Customize it as you need.
        </Typography>
      </Container>
    </footer>
     </React.Fragment>
  );
};

export default Footer;
