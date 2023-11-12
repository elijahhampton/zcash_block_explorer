import React from "react";
import {
  Typography,
  Stack,
  IconButton,
  AppBar,
  Toolbar,
  Container,
  Button,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import Link from "next/link";
import SearchBarV2 from "./SearchBarV2";

const NavigationBar = () => {
  return (
    <AppBar
      elevation={0}
      variant="elevation"
      sx={{
        px: 2,
        borderBottom: "1px solid #eee",
        backgroundColor: "#FFF",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography color="black" variant="h6" fontWeight="bold">
          Scrutinium Zcash Explorer
        </Typography>

        <Stack spacing={1} direction="row" alignItems="center">
          <Link href="/" style={{ color: "black", fontWeight: "500" }}>
            <Typography
              variant="subtitle2"
              sx={{
                textDecoration: "none", // Removes the underline from the link
                color: "primary.main", // Uses the primary color from the theme
                fontWeight: "medium", // Medium weight for the text
                borderRadius: "4px", // Slightly rounded corners for a soft look
                padding: "6px 12px", // Some padding around the text
                transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover effects
                "&:hover": {
                  backgroundColor: "action.hover", // Soft background color on hover from the theme
                  color: "primary.dark", // Darkens the text color slightly on hover
                  textDecoration: "underline", // Adds underline on hover for emphasis
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)", // Adds a soft glow when the link is focused
                },
                "&:active": {
                  color: "primary.light", // Lightens the text color when clicked
                },
              }}
            >
              Home
            </Typography>
          </Link>

          <Link href="/blocks" style={{ color: "black", fontWeight: "500" }}>
            <Typography
              variant="subtitle2"
              sx={{
                textDecoration: "none", // Removes the underline from the link
                color: "primary.main", // Uses the primary color from the theme
                fontWeight: "medium", // Medium weight for the text
                borderRadius: "4px", // Slightly rounded corners for a soft look
                padding: "6px 12px", // Some padding around the text
                transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover effects
                "&:hover": {
                  backgroundColor: "action.hover", // Soft background color on hover from the theme
                  color: "primary.dark", // Darkens the text color slightly on hover
                  textDecoration: "underline", // Adds underline on hover for emphasis
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)", // Adds a soft glow when the link is focused
                },
                "&:active": {
                  color: "primary.light", // Lightens the text color when clicked
                },
              }}
            >
              Blocks
            </Typography>
          </Link>
          <Link
            href="/transactions"
            style={{  fontWeight: "500" }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                textDecoration: "none", // Removes the underline from the link
                color: "primary.main", // Uses the primary color from the theme
                fontWeight: "medium", // Medium weight for the text
                borderRadius: "4px", // Slightly rounded corners for a soft look
                padding: "6px 12px", // Some padding around the text
                transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover effects
                "&:hover": {
                  backgroundColor: "action.hover", // Soft background color on hover from the theme
                  color: "primary.dark", // Darkens the text color slightly on hover
                  textDecoration: "underline", // Adds underline on hover for emphasis
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.5)", // Adds a soft glow when the link is focused
                },
                "&:active": {
                  color: "primary.light", // Lightens the text color when clicked
                },
              }}
            >
              Transactions
            </Typography>
          </Link>
        </Stack>


      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
