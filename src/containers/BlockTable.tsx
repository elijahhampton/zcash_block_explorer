import { Box, Link, Typography } from "@mui/joy";
import Table from "../components/Table";
import React from "react";
import { BlockData, ITableColumn } from "../types";

const rows: Array<BlockData> = new Array(10).fill({
  height: "",
  hash: "",
  dateMined: "",
  numTxs: "",
  size: 0,
  output: 0,
});

const columns: Array<ITableColumn<BlockData>> = [
  {
    key: "height",
    label: "Height",
    style: {},
    width: "20%",
    render: (item) => <Typography level="body-xs">0</Typography>,
  },
  {
    key: "hash",
    label: "Hash",
    style: {},
    width: "80%",
    render: (item) => (
      <Link>c0ffeeabcdef1234567890deadbeef1234567890c0ffeeabcdef1234567890</Link>
    ),
  },
  {
    key: "dateMined",
    label: "Date Mined",
    style: {},
    width: "25%",
    render: (item) => (
      <Typography level="body-xs">{new Date().toDateString()}</Typography>
    ),
  },
  {
    key: "numTxs",
    label: "Num. Txs.",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">4</Typography>,
  },
  {
    key: "size",
    label: "Size",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">18MB</Typography>,
  },
  {
    key: "output",
    label: "Output ZEC",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">3.06 ZEC</Typography>,
  },
];

export default function BlockTable() {
  return (
    <Box>
      <Typography py={2} level="title-lg" fontSize='sm'>Recent Blocks</Typography>
      <Table data={rows} columns={columns} />
    </Box>
  );
}

