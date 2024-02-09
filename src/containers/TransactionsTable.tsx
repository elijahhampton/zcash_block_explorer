// @ts-nocheck
import { Box, Skeleton } from "@mui/material";
import Table from "../components/Table";
import React, { useMemo } from "react";
import { ITableColumn } from "../types";
import { TransactionData } from "../types";
import {
  DefinedQueryObserverResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { StyledBodyTableTypography } from "../styled/typography.styled";
import { useRouter } from "next/router";
import { format, formatDistanceStrict } from "date-fns";

interface ITransactionsTableProps<T> {
  data: Array<T>;
  useQueryProps?: UseQueryResult;
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
    loadMoreRows,
    useQueryProps,
    isRowLoaded,
    minHeight,
    rowCount,
  } = props;

  const router = useRouter();
  const isTableLoading = useQueryProps
    ? useQueryProps.isRefetching ||
      useQueryProps.isFetching ||
      useQueryProps.isLoading
    : false;
  const rowData = Array.isArray(data) && data.length > 0 ? data : [];

  const columns: Array<ITableColumn<TransactionData>> = useMemo(
    () => [
      {
        dataKey: "tx_id",
        label: "Transaction ID",
        style: {},
        width: 65,
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
        dataKey: "height",
        label: "Block #",
        style: {},
        width: 12,
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
        dataKey: "timestamp",
        label: "Block Time",
        style: {},
        width: 33,
        render: (item) =>
          isTableLoading ? (
            <Skeleton variant="text" />
          ) : (
            <StyledBodyTableTypography fontWeight="400">
              {format(
                new Date(Number(item.timestamp) * 1000),
                "yyyy-MM-dd HH:mm:ss"
              )}
              {formatDistanceStrict(
                new Date(Number(item.timestamp) * 1000) + " ago"
              )}
            </StyledBodyTableTypography>
          ),
      },
      {
        dataKey: "num_inputs",
        label: "# Inputs",
        style: {},
        width: 15,
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
        width: 15,
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
        width: 25,
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
    <Box width="100%" sx={{ display: "flex", flexGrow: 1 }}>
      <Table
        router={router}
        minHeight={minHeight}
        rowCount={2000000}
        isLoadingTableData={isTableLoading}
        loadMoreRows={loadMoreRows}
        isRowLoaded={isRowLoaded}
        data={rowData}
        rowCount={data?.length ?? 0}
        rowGetter={({ index }) => data[index]}
        columns={columns}
      />
    </Box>
  );
}
