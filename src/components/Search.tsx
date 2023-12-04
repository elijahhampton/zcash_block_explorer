import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  ReceiptLongSharp,
  WidgetsSharp,
} from "@mui/icons-material";
import { test_SECONDARY_ACCENT_COLOR } from "../constants/color";
import { Tooltip } from "@mui/material";

export default function Search() {
  return (
    <Paper
      component="form"
      sx={{
        bgcolor: "#FFF",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 800,
      }}
    >
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        sx={{ ml: 1, flex: 1, color: test_SECONDARY_ACCENT_COLOR }}
        placeholder="Search Blocks / Transactions"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <Tooltip title="Explore Blocks, Verify Transactions">
        <IconButton
          type="button"
          sx={{ color: test_SECONDARY_ACCENT_COLOR, p: "10px" }}
          aria-label="search"
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title="Explore blocks">
        <IconButton
          color="primary"
          sx={{ color: test_SECONDARY_ACCENT_COLOR, p: "10px" }}
          aria-label="directions"
        >
          <WidgetsSharp fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Explore transactions">
        <IconButton
          color="primary"
          sx={{ color: test_SECONDARY_ACCENT_COLOR, p: "10px" }}
          aria-label="directions"
        >
          <ReceiptLongSharp fontSize="small" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
