import React from "react";
import { Button, Box, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

function FilterButton() {
  return (
    <Box
      sx={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // subtle shadow for sleekness
        borderRadius: "50%", // fully rounded button
        overflow: "hidden", // to ensure child components (like the icon) also adhere to the rounded design
      }}
    >
      <IconButton
        //     color="default"

        sx={{
          textTransform: "none", // maintains original text casing
          borderRadius: 999, // fully rounded button
          padding: "8px 8px", // padding to give the button a round appearance
          fontSize: "1rem", // comfortable font size
          backgroundColor: "grey.100", // greyish white background to match the search bar
          "&:hover": {
            backgroundColor: "grey.200", // slightly darker on hover
          },
        }}
      >
        <FilterListIcon style={{ width: 15, height: 15 }} />
      </IconButton>
    </Box>
  );
}

export default FilterButton;
