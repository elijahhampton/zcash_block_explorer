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
import { withStyles } from "@mui/styles";
import { Typography, Theme } from "@mui/material";
import { StyledBodyTableTypography } from "../styled/typography.styled";

// const styles = (theme : Theme) => ({
//   tableCell: {
//     flex: 1,
//   },
//   flexContainer: {
//     width: "100%",
//     display: "flex",
//     alignItems: "center",
//     boxSizing: "border-box",
//   },
// });

function VirtualizedTable(props) {
  const {
    columns = [],
    data = [],
    loadMoreRows,
    isRowLoaded,
    classes,
    ...tableProps
  } = props;

  const cellRenderer: FC<TableCellProps> = ({ cellData, columnIndex }) => {
    return (
      <TableCell component="div" variant="body" align="left">
        <StyledBodyTableTypography>
          {cellData ? cellData : "-"}
        </StyledBodyTableTypography>
      </TableCell>
    );
  };

  return (
    <Paper
    elevation={0}
   // variant='outlined'
      sx={{
        //border: '0.5px solid #ddd',
        height: "calc(100vh - 200px)",
        flexGrow: 1,
        bgcolor: '#FFF',
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
                              <Typography variant="subtitle2" fontSize={13}>
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
