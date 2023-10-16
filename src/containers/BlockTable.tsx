import { Box, Link, Typography, Skeleton } from "@mui/joy";
import Table from "../components/Table";
import React, { useEffect, useMemo } from "react";
import { BlockData, ITableColumn } from "../types";
import useBlock from "../hooks/queries/useBlock";

export default function BlockTable() {
  const { data, refetch, status, isFetching } = useBlock()

  const isTableLoading = isFetching
  const rowDataAsLoading = new Array(10).fill({} as BlockData)
  const rowData = Array.isArray(data) && data.length > 0 ? data.slice(data.length - 11, data.length - 1).reverse() : []

  const columns: Array<ITableColumn<BlockData>> = useMemo(() => [
    {
      key: "height",
      label: "Height",
      style: {},
      width: "20%",
      render: (item) => isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">{item.height}</Typography>,
    },
    {
      key: "hash",
      label: "Hash",
      style: {},
      width: "80%",
      render: (item) => isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Link>{item.hash}</Link>,
    },
    {
      key: "timestamp",
      label: "Date Mined",
      style: {},
      width: "25%",
      render: (item) => (
        isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">{new Date(Number(item.timestamp) * 1000).toDateString()}</Typography>
      ),
    },
    {
      key: "num_transactions",
      label: "Num. Txs.",
      style: {},
      width: "15%",
      render: (item) => isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">{item.num_transactions}</Typography>,
    },
    {
      key: "size",
      label: "Size",
      style: {},
      width: "15%",
      render: (item) => isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">{item.size}</Typography>,
    },
    {
      key: "output",
      label: "Output ZEC",
      style: {},
      width: "15%",
      render: (item) => isTableLoading ? <Skeleton variant="text" level="body-sm" /> : <Typography fontWeight='400' level="body-xs">{item.output}</Typography>,
    },
  ], [data, isTableLoading]);

  return (
    <Box>
      <Typography py={2} level="title-lg" fontSize='sm'>Recent Blocks</Typography>
      <Table data={isTableLoading ? rowDataAsLoading : rowData} columns={columns} />
    </Box>
  );
}

