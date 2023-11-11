import React from "react";
import {
  Typography,
  Stack,
  IconButton,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <AppBar
      elevation={0}
      variant="elevation"
      sx={{
        borderBottom: "1px solid #eee",
        backgroundColor: "#FFF",
      }}
    >
      <Toolbar
        component={Container}
        maxWidth="xl"
        disableGutters={true}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography ml={5} color="black" variant="h5" fontWeight="bold">
          ZCash BlockExplorer
        </Typography>

        <Stack spacing={3} direction='row' alignItems='center'>
          <Link href="/blocks" style={{ color: 'black', fontWeight: '500' }}>
            Blocks
          </Link>
          <Link href="/transactions" style={{ color: 'black', fontWeight: '500'  }}>
            Transactions
          </Link>
        </Stack>

        <Stack
        mr={1.5}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
                    <IconButton>
                      <GitHub />
          </IconButton>
      
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
