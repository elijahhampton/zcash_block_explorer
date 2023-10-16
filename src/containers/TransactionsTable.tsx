import { Box, Typography, Skeleton } from "@mui/joy";
import Table from "../components/Table";
import React, { useMemo } from "react";
import { ITableColumn } from "../types";
import { TransactionData } from "../types";
import useFetchTransactions from "../hooks/queries/useFetchTransactions";

export default function TransactionsTable() {
  const { data, refetch, status, isFetching } = useFetchTransactions();

  const isTableLoading = isFetching
  const rowDataAsLoading = new Array(10).fill({} as TransactionData)
  const rowData = Array.isArray(data) && data.length > 0 ? data.slice(data.length - 11, data.length - 1).reverse() : []

  const columns: Array<ITableColumn<TransactionData>> = useMemo(() => [
    {
      key: "txid",
      label: "Transaction ID",
      style: {},
      width: "45%",
      render: (item) => isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">{item.txid}</Typography>,
    },
    {
      key: "sender",
      label: "Sender",
      style: {},
      width: "12%",
      render: (item) => (
        isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">
          {String(item.sender).toString() == "" ? "Unknown" : "Unknown"}
        </Typography>
      ),
    },
    {
      key: "fees",
      label: "Fees",
      style: {},
      width: "12%",
      render: (item) => isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">{item.fees}</Typography>,
    },
    {
      key: "timestamp",
      label: "Time (UTC)",
      style: {},
      width: "12%",
      render: (item) => (
        isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">
          {new Date(Number(item.timestamp) * 1000).toDateString()}
        </Typography>
      ),
    },
    {
      key: "public_output",
      label: "Public Output (ZEC)",
      style: {},
      width: "12%",
      render: (item) => (
        isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography level="body-xs">{item.public_output}</Typography>
      ),
    },
  ], [data, isTableLoading])

  return (
    <Box>
      <Typography py={2} level="title-lg" fontSize="sm">
        Recent Transactions
      </Typography>
      <Table data={isTableLoading ? rowDataAsLoading : rowData} columns={columns} />
    </Box>
  );
}
