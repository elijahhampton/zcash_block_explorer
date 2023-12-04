// @ts-nocheck
import { Box, Skeleton } from "@mui/material";
import Table from "../components/Table";
import React, { useMemo } from "react";
import { ITableColumn } from "../types";
import { TransactionData } from "../types";
import { DefinedQueryObserverResult } from "@tanstack/react-query";
import { StyledBodyTableTypography } from "../styled/typography.styled";
import { useRouter } from "next/router";

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

  const router = useRouter()
  const isTableLoading = isFetching;
  const rowDataAsLoading = new Array(10).fill({} as TransactionData);
  const rowData =
    Array.isArray(data) && data.length > 0
      ? data.slice(data.length - 11, data.length - 1).reverse()
      : [];

  const columns: Array<ITableColumn<TransactionData>> = useMemo(
    () => [
      {
        dataKey: "height",
        label: "Block #",
        style: {},
        width: 8,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography fontWeight="400">
              {item["height"]}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "tx_id",
        label: "Transaction ID",
        style: {},
        width: 42,
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
        width: 9,
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
        dataKey: "version",
        label: "Version",
        style: {},
        width: 5,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography>
              {item["version"]}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "is_overwintered",
        label: "Overwintered?",
        style: {},
        width: 10,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography>
              {item["is_overwintered"]}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "num_inputs",
        label: "# Inputs",
        style: {},
        width: 12,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography>
              {item["num_inputs"]}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "num_outputs",
        label: "# Outputs",
        style: {},
        width: 12,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography>
              {item["num_outputs"]}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "total_public_output",
        label: "Public Output (ZEC)",
        style: {},
        width: 28,
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
      router={router}
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
