// @ts-nocheck
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
import { Typography, Skeleton } from "@mui/material";
import { StyledBodyTableTypography } from "../styled/typography.styled";
import { NextRouter } from "next/router";
import { test_SECONDARY_ACCENT_COLOR } from "../constants/color";
import { format, formatDistanceStrict } from "date-fns";
import {
  BlockDatabaseKeys,
  TransactionDatabaseKeys,
} from "../constants/schema";

interface IVirtualizedTableProps {
  router: NextRouter;
  isLoadingTableData: boolean;
}

function VirtualizedTable(props: IVirtualizedTableProps) {
  const {
    columns = [],
    data = [],
    isLoadingTableData,
    loadMoreRows,
    isRowLoaded,
    classes,
    minHeight,
    router,
    ...tableProps
  } = props;

  const handleOnClickTableCell = (dataKey: string, cellData: string) => {
    try {
      if (!cellData) {
        throw new Error("No data for table cell with data key: " + dataKey);
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
          console.log(
            "default::Unhandled switch case in handleOnClickTableCell()"
          );
      }
    } catch (error) {
      router.reload();
    }
  };

  const renderLoadingCell = (dataKey: string) => (
    <TableCell component="div" variant="body" align="left">
      <Skeleton
        animation="pulse"
        sx={{ width: dataKey === "tx_id" ? 400 : 50 }}
        height={24}
        style={{ marginBottom: 6, transform: "scale(1, 0.6)" }}
      />
    </TableCell>
  );

  const cellRenderer: FC<TableCellProps> = ({
    cellData,
    dataKey,
    rowIndex,
  }) => {
    if (isLoadingTableData) {
      return renderLoadingCell()
    }

    if (dataKey.toLowerCase() == BlockDatabaseKeys.TIMESTAMP) {
      const date = new Date(Number(cellData) * 1000);
      return (
        <TableCell>
          <StyledBodyTableTypography>
            {format(date, "yyyy-MM-dd HH:mm:ss")}
            {" (" + formatDistanceStrict(date, new Date()) + " ago)"}
          </StyledBodyTableTypography>
        </TableCell>
      );
    }

    if (
      dataKey.toLowerCase() == BlockDatabaseKeys.TOTAL_PUBLIC_OUTPUT ||
      dataKey.toLowerCase() == BlockDatabaseKeys.TOTAL_BLOCK_OUTPUT
    ) {
      return (
        <TableCell>
          <StyledBodyTableTypography>
            {Number(cellData).toFixed(4)}
          </StyledBodyTableTypography>
        </TableCell>
      );
    }

    return (
      <TableCell component="div" variant="body" align="left">
        <StyledBodyTableTypography
          onClick={() => handleOnClickTableCell(dataKey, cellData)}
          sx={{
            ":hover": {
              color:
                dataKey.toLowerCase() == BlockDatabaseKeys.HASH ||
                dataKey.toLowerCase() == TransactionDatabaseKeys.TRANSACTION_ID
                  ? "#DAA520"
                  : "#FFF",
              cursor:
                dataKey.toLowerCase() == BlockDatabaseKeys.HASH ||
                dataKey.toLowerCase() == TransactionDatabaseKeys.TRANSACTION_ID
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
                  rowStyle={(index) => ({
                    backgroundColor: index.index % 2 === 0 ? "#f5f5f5" : "#FFF",
                  })}
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
