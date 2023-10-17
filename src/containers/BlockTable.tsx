import { Box, Link, Typography, Skeleton } from "@mui/material";
import Table from "../components/Table";
import React, { useEffect, useMemo } from "react";
import { BlockData, ITableColumn } from "../types";
import useBlock from "../hooks/queries/useBlock";
import { DefinedQueryObserverResult } from '@tanstack/react-query'
import styles from '../styles/Home.module.css'
import { StyledBodyTableTypography } from "../styled/typography.styled";
interface IBlockTableProps<T> {
  data: Array<T>;
  useQueryProps: Partial<DefinedQueryObserverResult>;
}

export default function BlockTable(props: IBlockTableProps<BlockData>) {
  const { data, useQueryProps: { isFetching }  } = props;
  const isTableLoading = isFetching
  const rowDataAsLoading = new Array(10).fill({} as BlockData)
  const rowData = Array.isArray(data) && data.length > 0 ? data.slice(data.length - 11, data.length - 1).reverse() : []

  const columns: Array<ITableColumn<BlockData>> = useMemo(() => [
    {
      key: "height",
      label: "Height",
      style: {},
      width: "10%",
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography>{item.height}</StyledBodyTableTypography>,
    },
    {
      key: "hash",
      label: "Hash",
      style: {},
      width: "50%",
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400'>{item.hash}</StyledBodyTableTypography>,
    },
    {
      key: "timestamp",
      label: "Date Mined",
      style: {},
      width: "12%",
      render: (item) => (
        isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' fontSize={12}>{new Date(Number(item.timestamp) * 1000).toDateString()}</StyledBodyTableTypography>
      ),
    },
    {
      key: "num_transactions",
      label: "Num. Txs.",
      style: {},
      width: "8%",
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item.num_transactions}</StyledBodyTableTypography>,
    },
    {
      key: "size",
      label: "Size",
      style: {},
      width: "8%",
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item.size}</StyledBodyTableTypography>,
    },
    {
      key: "output",
      label: "Output ZEC",
      style: {},
      width: "12%",
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item.output}</StyledBodyTableTypography>,
    },
  ], [data, isTableLoading]);

  return (
    <Box width='100%'>
      <Typography py={2} component='h6' fontSize='sm' color='black'>Recent Blocks</Typography>
      <Table data={isTableLoading ? rowDataAsLoading : rowData} columns={columns} />
    </Box>
  );
}

