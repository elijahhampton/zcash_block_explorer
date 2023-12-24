import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ReceiptLongSharp, WidgetsSharp } from "@mui/icons-material";
import { test_SECONDARY_ACCENT_COLOR } from "../constants/color";
import { Tooltip } from "@mui/material";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

interface ISearchProps {
  onSearch: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

export default function Search(props: ISearchProps) {
  const { onSearch, onChange, searchValue } = props

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.code === "Enter") {
      onSearch()
    }
  }

  return (
    <Paper
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
        value={searchValue}
        sx={{ ml: 1, flex: 1, color: test_SECONDARY_ACCENT_COLOR }}
        placeholder="Search Blocks / Transactions"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Tooltip title="Explore Blocks, Verify Transactions">
        <SearchIcon
          sx={{ color: test_SECONDARY_ACCENT_COLOR }}
          fontSize="small"
        />
      </Tooltip>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title="Explore blocks">
        <IconButton
          href="/blocks"
          color="primary"
          sx={{ color: "rgb(91, 148, 242)", p: "10px" }}
          aria-label="directions"
        >
          <WidgetsSharp fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Explore transactions">
        <IconButton
          color="primary"
          href="/transactions"
          sx={{ color: "rgb(91, 148, 242)", p: "10px" }}
          aria-label="directions"
        >
          <ReceiptLongSharp fontSize="small" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
