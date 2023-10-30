import React from "react";
import { Paper, InputBase, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBarV2() {
  return (
    <Paper
      component="form"
      variant='outlined'
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "2px 2px",
        width: 400,
        border: '1px solid #eee',
        height: 38,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // subtle shadow for sleekness
        borderRadius: 25, // slightly rounded edges
      }}
    >
      <InputBase
        sx={{
          marginLeft: 1,
          flex: 1,
          fontSize: "1rem",
          padding: "8px 16px", // comfortable padding
        }}
        placeholder="Jump to:  "
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        size="small"
        type="submit"
        sx={{
          padding: "10px",
          color: "rgba(0, 0, 0, 0.5)", // slightly dimmed color for the icon
        }}
        aria-label="search"
      >
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

export default SearchBarV2;