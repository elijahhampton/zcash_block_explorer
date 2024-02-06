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
import { Typography, Theme, Box, CardContent, Divider, Skeleton } from "@mui/material";
import { StyledBodyTableTypography } from "../styled/typography.styled";
import { NextRouter } from "next/router";
import { test_SECONDARY_ACCENT_COLOR } from "../constants/color";
import { format } from "date-fns";

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
        console.log("default::Unhandled switch case in handleOnClickTableCell()");
    }
  };

  const getTableBodyCellColor = (dataKey: string) => {
    if (
      dataKey.toLowerCase() == "hash" ||
      dataKey.toLowerCase() == "tx_id" ||
      dataKey.toLowerCase() == "height"
    ) {
      return `F`;
    }

    return "#FFF";
  };

   
  const renderLoadingCell = (dataKey: string) => (
    <TableCell component="div" variant="body" align="left">
      <Skeleton animation="pulse" sx={{ width: dataKey === "tx_id" ? 400 : 50 }} height={24} style={{ marginBottom: 6, transform: 'scale(1, 0.6)' }} />
    </TableCell>
  );

  const cellRenderer: FC<TableCellProps> = ({ cellData, dataKey, rowIndex }) => {
    const isLoaded = isRowLoaded({ index: rowIndex });

    if (!isLoaded) {
      return renderLoadingCell(dataKey);
    }

    if (dataKey.toLowerCase() == "timestamp") {
      return <TableCell><StyledBodyTableTypography>{format(new Date(Number(cellData) * 1000), 'MM/dd/yyyy')}</StyledBodyTableTypography></TableCell> 
    }

    if (dataKey.toLowerCase() == "total_public_output" || dataKey.toLowerCase() == "total_block_output") {
      return <TableCell><StyledBodyTableTypography>{Number(cellData).toFixed(4)}</StyledBodyTableTypography></TableCell> 
    }



    return (
      <TableCell component="div" variant="body" align="left">
        <StyledBodyTableTypography
          onClick={() => handleOnClickTableCell(dataKey, cellData)}
          sx={{
            ":hover": {
              color:
                dataKey.toLowerCase() == "hash" ||
                dataKey.toLowerCase() == "tx_id"
                  ? "#DAA520"
                  : "#FFF",
              cursor:
                dataKey.toLowerCase() == "hash" ||
                dataKey.toLowerCase() == "tx_id"
                  ? "pointer"
                  : "inherit",
            },
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
      sx={{
        borderRadius: "7px",
        display: "flex",
        flexDirection: "column",
        minHeight: minHeight ? minHeight : "580px",
        flexGrow: 1,
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
                  rowStyle={(index) => ({ backgroundColor: index.index % 2 === 0 ? '#f5f5f5' : '#FFF' })}
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
                                  color: `${test_SECONDARY_ACCENT_COLOR} !important`, 
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
