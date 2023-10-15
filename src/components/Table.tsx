import React from "react";

/* eslint-disable jsx-a11y/anchor-is-valid */
import JoyTable from "@mui/joy/Table";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import { Box, Button, Sheet } from "@mui/joy";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ITableProps } from "@/types";

const tableSx = {
  "--Table-headerUnderlineThickness": "1px",
  "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
  "--TableCell-paddingY": "10px",
  "--TableCell-paddingX": "8px",
};

export default function Table<T>(props: ITableProps<T>) {
  const { columns, data } = props;

  columns.forEach((column, columnIndex) => {
    if (column?.width) {
      tableSx[`& thead th:nth-child(${columnIndex + 1})`] = {
        width: column?.width,
      };
    }
  });

  return (
    <React.Fragment>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          bgcolor: "#FFF",
          flexShrink: 1,
          overflow: "auto",
          maxHeight: 450,
          minHeight: 0,
        }}
      >
        <JoyTable
          aria-labelledby="tableTitle"
          stickyHeader
          size="sm"
          hoverRow
          sx={tableSx}
        >
          <thead >
            <tr >
              {columns.map((column, index) => {
                if (index === 0) {
                  return <th style={{ backgroundColor: '#FAFAFA'}} key={String(column.key)}>{column.label}</th>;
                }

                return <th style={{ backgroundColor: '#FAFAFA'}} key={String(column.key)}>{column.label}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.map(
              (item, rowIndex) => (
                <tr key={String(rowIndex)}>
                  {columns.map((column) => (
                    <td key={String(column.key)}>{column.render(item)}</td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </JoyTable>
      </Sheet>
      {/* <TablePagination /> */}
    </React.Fragment>
  );
}

const TablePagination = () => {
  return (
    <Box
      className="Pagination-laptopUp"
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Button
        size="sm"
        variant='plain'
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
      >
        Previous
      </Button>

      <Box sx={{ flex: 1 }} />
      {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
        <IconButton
          key={page}
          size='sm'
          variant={Number(page) ? "outlined" : "plain"}
          color="neutral"
        >
          {page}
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />

      <Button
        size="sm"
        variant='plain'
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
      >
        Next
      </Button>
    </Box>
  );
};
