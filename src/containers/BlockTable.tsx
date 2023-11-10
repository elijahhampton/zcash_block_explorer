// @ts-nocheck
import { Box, Link, Typography, Skeleton } from "@mui/material";
import Table from "../components/Table";
import React, { useEffect, useMemo } from "react";
import { BlockData, ITableColumn } from "../types";
import useBlock from "../hooks/queries/useBlock";
import { DefinedQueryObserverResult } from '@tanstack/react-query'
import styles from '../styles/Home.module.css'
import { StyledBodyTableTypography } from "../styled/typography.styled";
import { fetchBlocks, fetchTransactions } from "../constants/api-routes";
interface IBlockTableProps<T> {
  data: Array<T>;
  useQueryProps?: Partial<DefinedQueryObserverResult>;
  loadMoreRows: ({ startIndex, stopIndex }) => Promise<void>;
  isRowLoaded: ({ index }) => void;
}

export default function BlockTable(props: IBlockTableProps<BlockData>) {
  const { data, useQueryProps: { isFetching }, loadMoreRows, isRowLoaded  } = props;
  const isTableLoading = isFetching
  const rowDataAsLoading = new Array(100).fill({} as BlockData)
  const rowData = Array.isArray(data) && data.length > 0 ? data.slice(data.length - 400, data.length - 1).reverse() : []

  const columns: Array<ITableColumn<BlockData>> = useMemo(() => [
    {
      dataKey: "height",
      label: "Height",
      style: {},
      width: 10,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography>{item.height}</StyledBodyTableTypography>,
    },
    {
      dataKey: "hash",
      label: "Hash",
      style: {},
      width: 50,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400'>{item.hash}</StyledBodyTableTypography>,
    },
    {
      dataKey: "timestamp",
      label: "Date Mined",
      style: {},
      width: 12, 
      render: (item) => (
        isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' fontSize={12}>{new Date(Number(item.timestamp) * 1000).toDateString()}</StyledBodyTableTypography>
      ),
    },
    {
      dataKey: "num_transactions",
      label: "Num. Txs.",
      style: {},
      width: 8,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item.num_transactions}</StyledBodyTableTypography>,
    },
    {
      dataKey: "size",
      label: "Size",
      style: {},
      width: 8,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item.size}</StyledBodyTableTypography>,
    },
    {
      dataKey: "output",
      label: "Output ZEC",
      style: {},
      width: 12,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item.output}</StyledBodyTableTypography>,
    },
  ], [data, isTableLoading]);

  return (
    <Box width='100%' sx={{ display: 'flex'}}>
      <Table 
      loadMoreRows={loadMoreRows}
      isRowLoaded={isRowLoaded}
      data={isTableLoading ? rowDataAsLoading : rowData}  
      rowCount={data.length} 
      rowGetter={({ index }) => data[index]}
      columns={columns} 
      />
    </Box>
  );
}