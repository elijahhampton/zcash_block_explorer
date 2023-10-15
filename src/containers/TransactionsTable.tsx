import { Box, Link, Typography } from "@mui/joy";
import Table from "../components/Table";
import React from "react";
import { BlockData, ITableColumn } from "../types";
import { TransactionData } from "../types";

const rows: Array<BlockData> = new Array(10).fill({
  transactionId: "0",
  blockId: "0",
  timestamp: "0",
  publicOutput: "0",
  type: "Coinbase"
});

const columns: Array<ITableColumn<TransactionData>> = [
  {
    key: "transactionId",
    label: "Transaction ID",
    style: {},
    width: "20%",
    render: (item) => <Typography level="body-xs">0</Typography>,
  },
  {
    key: "blockId",
    label: "Block ID",
    style: {},
    width: "80%",
    render: (item) => (
      <Link>c0ffeeabcdef1234567890deadbeef1234567890c0ffeeabcdef1234567890</Link>
    ),
  },
  {
    key: "timestamp",
    label: "Time (UTC)",
    style: {},
    width: "25%",
    render: (item) => (
      <Typography level="body-xs">{new Date().toDateString()}</Typography>
    ),
  },
  {
    key: "timestamp",
    label: "Time (UTC)",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">4</Typography>,
  },
  {
    key: "publicOutput",
    label: "Public Output (ZEC)",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">18MB</Typography>,
  },
  {
    key: "type",
    label: "Tx Type",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">3.06 ZEC</Typography>,
  },
];

export default function TransactionsTable() {
  return (
    <Box>
      <Typography py={2} level="title-lg"> Recent Transactions</Typography>
      <Table data={rows} columns={columns} />
    </Box>
  );
}
