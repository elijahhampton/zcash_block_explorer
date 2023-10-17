import React from "react";

/* eslint-disable jsx-a11y/anchor-is-valid */
import IconButton, { iconButtonClasses } from '@mui/material/IconButton'
import { Box, Button, Paper, Table as MuiTable, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ITableProps } from "../types";

const tableSx = {

};

export default function Table<T>(props: ITableProps<T>) {
  const { columns = [], data = [] } = props;

  return (
      <TableContainer component={Paper}
        className="OrderTableContainer"

        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "8px",
          bgcolor: "#FFF",
          borderColor: 'rgba(235, 184, 72, 0.6)',
          flexShrink: 1,
          overflow: "auto",
          maxHeight: 450,
          minHeight: 0,
        }}
      >
        <MuiTable
        sx={{  width: '100%' , borderRadius: 20 }}
        >
          <TableHead sx={{ padding: 0}}>
            <TableRow sx={{ padding: 0 }}>
              {columns.map((column, index) => {
                if (index === 0) {
                  return <TableCell  sx={{color: 'text.secondary', fontSize: 12, fontWeight: 600, padding: '5px 15px !important', backgroundColor: '#FAFAFA', width: column.width || 'auto' }} key={String(column.key)}>{column.label.toUpperCase()}</TableCell>;
                }

                return <TableCell sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 600, padding: '5px 15px !important', backgroundColor: '#FAFAFA', width: column.width || 'auto'}} key={String(column.key)}>{column.label.toUpperCase()}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(
              (item, rowIndex) => (
                <TableRow key={String(rowIndex)}>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} sx={{borderBottomWidth: 0.2, padding: '12px 15px !important', }}>{column.render(item)}</TableCell>
                  ))}
                </TableRow>
              )
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
  );
}