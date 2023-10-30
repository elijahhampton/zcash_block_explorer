import { Box, Skeleton, Typography, Link } from "@mui/material";
import Table from "../components/Table";
import React, { useMemo } from "react";
import { ITableColumn } from "../types";
import { TransactionData } from "../types";
import useFetchTransactions from "../hooks/queries/useFetchTransactions";
import { DefinedQueryObserverResult } from "@tanstack/react-query";
import { StyledBodyTableTypography } from "../styled/typography.styled";

interface ITransactionsTableProps<T> {
  data: Array<T>;
  useQueryProps?: Partial<DefinedQueryObserverResult>;
  loadMoreRows: ({ startIndex, stopIndex }) => Promise<void>;
  isRowLoaded: ({ index }) => void;
}

export default function TransactionsTable(
  props: ITransactionsTableProps<TransactionData>
) {
  const {
    data,
    useQueryProps: { isFetching },
    loadMoreRows, 
    isRowLoaded
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
        dataKey: "txid",
        label: "Transaction ID",
        style: {},
        width: 45,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography fontWeight="400">
              {item.txid}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "sender",
        label: "Sender",
        style: {},
        width: 12,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography fontWeight="400">
              {String(item.sender).toString() ? "Unknown" : "Unknown"}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "fees",
        label: "Fees",
        style: {},
        width: 12,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography fontWeight="400">
              {item.fees}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "timestamp",
        label: "Time (UTC)",
        style: {},
        width: 12,
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
        width: 12,
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
    <Box width="100%" sx={{ display: 'flex'}}>
      <Table
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
