import { Box, Link, Typography } from "@mui/joy";
import Table from "../components/Table";
import React, { useTransition } from "react";
import { BlockData, ITableColumn } from "../types";
import { TransactionData } from "../types";
import useFetchTransactions from "../hooks/queries/useFetchTransactions";

const rows: Array<BlockData> = new Array(10).fill({
  transactionId: "0",
  blockId: "0",
  timestamp: "0",
  publicOutput: "0",
  type: "Coinbase"
});

const columns: Array<ITableColumn<TransactionData>> = [
  {
    key: "txid",
    label: "Transaction ID",
    style: {},
    width: "20%",
    render: (item) => <Typography level="body-xs">{item.txid}</Typography>,
  },
  {
    key: "sender",
    label: "Sender",
    style: {},
    width: "20%",
    render: (item) => <Typography level="body-xs">{item.sender}</Typography>,
  },
  {
    key: "fees",
    label: "Fees",
    style: {},
    width: "80%",
    render: (item) => (
      <Typography level="body-xs">{item.fees}</Typography>
    ),
  },
  {
    key: "timestamp",
    label: "Time (UTC)",
    style: {},
    width: "25%",
    render: (item) => (
      <Typography level="body-xs">{new Date(item.timestamp).toDateString()}</Typography>
    ),
  },
  {
    key: "public_output",
    label: "Public Output (ZEC)",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">{item.public_output}</Typography>,
  },
];

export default function TransactionsTable() {
  const { data, refetch } = useFetchTransactions()
  
  return (
    <Box>
      <Typography py={2} level="title-lg" fontSize='sm'> Recent Transactions</Typography>
      <Table data={(data as Array<any>).slice(data.length - 11, data.length - 1).reverse()} columns={columns} />
    </Box>
  );
}
