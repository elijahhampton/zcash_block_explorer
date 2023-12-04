import React from "react";
import {
  Typography,
  Stack,
  AppBar,
  Toolbar,
  Container,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import LinkGroup from "../containers/LinkGroup";

interface INavigationBarProps {
  pathname: string;
}

const NavigationBar = (props: INavigationBarProps) => {
  const { pathname } = props;
  return (
    <AppBar
      variant="elevation"
      position="fixed"
      elevation={0}
      sx={{
        display: { xs: "none", sm: "block" },
        px: 2,
        bgcolor: "#F3F6F9",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack spacing={1} direction="row" alignItems="center">
            <IconButton size="small" href="/">
              <Image alt="logo" src="/logo.png" width={35} height={35} />
            </IconButton>
            <Typography sx={{ color: "black" }} variant="h6" fontWeight="bold">
              Voyager Explorer
            </Typography>
          </Stack>

          <LinkGroup />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
