// @ts-nocheck
import { Box, Skeleton } from "@mui/material";
import Table from "../components/Table";
import React, { useMemo } from "react";
import { ITableColumn } from "../types";
import { TransactionData } from "../types";
import { DefinedQueryObserverResult } from "@tanstack/react-query";
import { StyledBodyTableTypography } from "../styled/typography.styled";

interface ITransactionsTableProps<T> {
  data: Array<T>;
  useQueryProps?: Partial<DefinedQueryObserverResult>;
  loadMoreRows: ({ startIndex, stopIndex }) => Promise<void>;
  isRowLoaded: ({ index }) => void;
  rowCount?: number;
  minHeight?: string;
}

export default function TransactionsTable(
  props: ITransactionsTableProps<TransactionData>
) {
  const {
    data,
    useQueryProps: { isFetching },
    loadMoreRows, 
    isRowLoaded,
    minHeight,
    rowCount
  } = props;

  const isTableLoading = isFetching;
  const rowDataAsLoading = new Array(10).fill({} as TransactionData);
  const rowData =
    Array.isArray(data) && data.length > 0
      ? data.slice(data.length - 11, data.length - 1).reverse()
      : [];

  const columns: Array<ITableColumn<TransactionData>> = useMemo(
    () => [
      {
        dataKey: "tx_id",
        label: "Transaction ID",
        style: {},
        width: 60,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography fontWeight="400">
              {item.tx_id}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "timestamp",
        label: "Time (UTC)",
        style: {},
        width: 20,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography fontWeight="400">
              {new Date(Number(item.timestamp) * 1000).toDateString()}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "public_output",
        label: "Public Output (ZEC)",
        style: {},
        width: 20,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography>
              {item.public_output}
            </StyledBodyTableTypography>
          ),
      },
    ],
    [data, isTableLoading]
  );

  return (
    <Box width="100%" sx={{ display: 'flex', flexGrow: 1}}>
      <Table
        minHeight={minHeight}
        rowCount={2000000}
        loadMoreRows={loadMoreRows}
        isRowLoaded={isRowLoaded}
        data={rowData}
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
        columns={columns}
      />
    </Box>
  );
}
