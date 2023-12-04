// @ts-nocheck
// TODO: Props
import React, { FC } from "react";
import {
  Table,
  Column,
  TableCellProps,
  AutoSizer,
  InfiniteLoader,
} from "react-virtualized";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import { Typography, Theme, Box, CardContent, Divider } from "@mui/material";
import { StyledBodyTableTypography } from "../styled/typography.styled";
import { NextRouter } from "next/router";
import { test_SECONDARY_ACCENT_COLOR } from "../constants/color";

function VirtualizedTable(props: { router: NextRouter }) {
  const {
    columns = [],
    data = [],
    loadMoreRows,
    isRowLoaded,
    classes,
    minHeight,
    router,
    ...tableProps
  } = props;

  const handleOnClickTableCell = (dataKey: string, cellData: string) => {
    if (!cellData) {
      return;
    }

    if (!router) {
      throw new Error("Router object undefined");
    }

    switch (dataKey) {
      case "tx_id":
        router.push(`/transaction/${cellData}`);
        break;
      case "hash":
        router.push(`/block/${cellData}`);
        break;
      default:
        console.log("Default");
    }
  };

  const getTableBodyCellColor = (dataKey: string) => {
    if (
      dataKey.toLowerCase() == "hash" ||
      dataKey.toLowerCase() == "tx_id" ||
      dataKey.toLowerCase() == "height"
    ) {
      return `${test_SECONDARY_ACCENT_COLOR} !important`;
    }

    return "black";
  };

  const cellRenderer: FC<TableCellProps> = ({ cellData, dataKey }) => {
    return (
      <TableCell component="div" variant="body" align="left">
        <StyledBodyTableTypography
          onClick={() => handleOnClickTableCell(dataKey, cellData)}
          sx={{
            ":hover": {
              color:
                dataKey.toLowerCase() == "hash" ||
                dataKey.toLowerCase() == "tx_id"
                  ? "secondary.main"
                  : "black",
              cursor:
                dataKey.toLowerCase() == "hash" ||
                dataKey.toLowerCase() == "tx_id"
                  ? "pointer"
                  : "inherit",
            },
            color: getTableBodyCellColor(dataKey),
          }}
        >
          {cellData ? cellData : "-"}
        </StyledBodyTableTypography>
      </TableCell>
    );
  };

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        borderRadius: "7px",
     //   boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        display: "flex",
        flexDirection: "column",
        minHeight: minHeight ? minHeight : "580px",
        flexGrow: 1,
        bgcolor: "#FFF",
        width: "100%",
        flex: 1,
      }}
    >
      <AutoSizer style={{ width: "100%", height: "100%" }}>
        {({ width, height }) => {
          const computedColumns = columns.map((column) => ({
            ...column,
            width: (column.width / 100) * width,
          }));

          return (
            <InfiniteLoader
              loadMoreRows={loadMoreRows}
              isRowLoaded={isRowLoaded}
              rowCount={2000000}
            >
              {({ onRowsRendered }) => (
                <Table
                  {...tableProps}
                  width={width}
                  height={height - 48}
                  rowHeight={48}
                  headerHeight={48}
                  onRowsRendered={onRowsRendered}
                >
                  {computedColumns.map(
                    ({ dataKey, width, ...other }, index) => {
                      return (
                        <Column
                          width={width}
                          key={dataKey}
                          headerRenderer={(headerProps) => (
                            <TableCell
                              component="div"
                              variant="head"
                              align="left"
                            >
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  color: `${test_SECONDARY_ACCENT_COLOR} !important`, //"text.primary",
                                  fontWeight: 600,
                                }}
                                variant="subtitle2"
                                fontSize={13}
                              >
                                {headerProps.label}
                              </Typography>
                            </TableCell>
                          )}
                          cellRenderer={cellRenderer}
                          dataKey={dataKey}
                          {...other}
                        />
                      );
                    }
                  )}
                </Table>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </Paper>
  );
}

export default VirtualizedTable;
