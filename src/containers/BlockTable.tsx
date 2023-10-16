import { Box, Link, Typography } from "@mui/joy";
import Table from "../components/Table";
import React, { useEffect } from "react";
import { BlockData, ITableColumn } from "../types";
import useBlock from "../hooks/queries/useBlock";

// TODO: 
const columns: Array<ITableColumn<BlockData>> = [
  {
    key: "height",
    label: "Height",
    style: {},
    width: "20%",
    render: (item) => <Typography level="body-xs">{item.height}</Typography>,
  },
  {
    key: "hash",
    label: "Hash",
    style: {},
    width: "80%",
    render: (item) => (
      <Link>{item.hash}</Link>
    ),
  },
  {
    key: "timestamp",
    label: "Date Mined",
    style: {},
    width: "25%",
    render: (item) => (
      <Typography level="body-xs">{new Date(Number(item.timestamp)).toUTCString()}</Typography>
    ),
  },
  {
    key: "num_transactions",
    label: "Num. Txs.",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">{item.num_transactions}</Typography>,
  },
  {
    key: "size",
    label: "Size",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">{item.size}</Typography>,
  },
  {
    key: "output",
    label: "Output ZEC",
    style: {},
    width: "15%",
    render: (item) => <Typography level="body-xs">{item.output}</Typography>,
  },
];

export default function BlockTable() {
  const { data, refetch } = useBlock()
  // useEffect(() => {
  //   console.log('hi :)');
  //   refetch();

  //   return () => {
  //   };
  // }, []); 
  console.log(data);

  return (
    <Box>
      <Typography py={2} level="title-lg" fontSize='sm'>Recent Blocks</Typography>
      <Table data={(data as Array<any>).slice(data.length - 11, data.length - 1).reverse()} columns={columns} />
    </Box>
  );
}

