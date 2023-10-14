import React from 'react';
import { Typography, Sheet, Link } from '@mui/joy'; 

const NavigationBar = () => {
  return (
    <Sheet sx={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography fontWeight="bold" fontSize="15">
        BlockExplorer
      </Typography>

      <Link href="/Explore" underline="none" fontWeight="bold" fontSize="12">
        Explore
      </Link>
    </Sheet>
  );
};

export default NavigationBar;
