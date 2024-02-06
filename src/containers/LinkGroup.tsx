import React, { useEffect, useState } from "react";
import {
  Stack,
  Link,
  Typography,
  Button,
  Popover,
  SxProps,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  ReceiptLong,
  RemoveRedEye,
  TravelExplore,
  ViewModule,
} from "@mui/icons-material";
import { SiStackblitz } from "react-icons/si";

const commonTypographyProps = (currentUrl, focusedUrl): SxProps => ({
  fontSize: 12,
  cursor: "pointer",
  textTransform: "none !important",
  textDecoration: "none !important",
  color: currentUrl === focusedUrl ?  "#DAA520" : "#111",
  fontWeight: "600",
  borderRadius: "4px", 
  padding: "6px 12px", 
  "&:hover": {
    color: "#DAA520", 
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)", 
  },
  "&:active": {
    color: "primary.light", 
  },
})

const LinkGroup = ({ pathname}: { pathname: string;}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(pathname)


  return (
    <Stack spacing={3} direction="row" alignItems="center">
      <Stack direction="row" alignItems="center">
        <TravelExplore fontSize="small" sx={{ color: "black" }} />
        <Link
          href="/"
          style={{
            color: "black",
            fontWeight: "500",
            textDecoration: "none !important",
            textTransform: 'none'
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              ...commonTypographyProps("/", pathname),
            }}
          >
            Explore
          </Typography>
        </Link>
      </Stack>

      <Stack direction="row" alignItems="center">
        <ViewModule fontSize="small" sx={{ color: "black" }} />
        <Link
          href="/blocks"
          style={{
            color: "black",
            fontWeight: "500",
            textDecoration: "none !important",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              ...commonTypographyProps("/blocks", pathname),
            }}
          >
            Blocks
          </Typography>
        </Link>
      </Stack>

      <Stack direction="row" alignItems="center">
        <ReceiptLong fontSize="small" sx={{ color: "black" }} />
        <Link
          href="/transactions"
          style={{ fontWeight: "500", textDecoration: "none !important" }}
        >
          <Typography
            variant="body2"
            sx={{
              ...commonTypographyProps("/transactions", pathname),
            }}
          >
            Transactions
          </Typography>
        </Link>
      </Stack>

      <Button
  
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<SiStackblitz style={{ width: 15, height: 15}} />}
        sx={{color: "rgb(55, 131, 190)", fontWeight: "600", textTransform: "none" }}
        variant="text"
      >
        Explorer Controls
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box component={Stack} spacing={0.8} sx={{ px: 2, pb: 1.2, color: '#111 !important'  }} onClick={handleClose}>
          <Typography variant='body2' sx={{ color: '#111 !important' }}>Network: testnet</Typography>
          </Box>
        <Divider />
        <MenuItem disabled dense onClick={handleClose}>View mainnet (Coming soon)</MenuItem>
        {/* <MenuItem dense disabled onClick={handleClose}>Toggle Dark Mode</MenuItem> */}
      </Menu>
    </Stack>
  );
};

export default LinkGroup;
