// @ts-nocheck
import { Box, Skeleton } from "@mui/material";
import Table from "../components/Table";
import React, { useMemo } from "react";
import { BlockData, ITableColumn } from "../types";
import { DefinedQueryObserverResult } from '@tanstack/react-query'
import { StyledBodyTableTypography } from "../styled/typography.styled";
import { useRouter } from "next/router";
interface IBlockTableProps<T> {
  data: Array<T>;
  useQueryProps?: Partial<DefinedQueryObserverResult>;
  loadMoreRows: ({ startIndex, stopIndex }) => Promise<void>;
  isRowLoaded: ({ index }) => void;
  rowCount?: number;
}

export default function BlockTable(props: IBlockTableProps<BlockData>) {
  const router = useRouter()
  const { data, useQueryProps: { isFetching }, loadMoreRows, isRowLoaded, rowCount  } = props;
  const isTableLoading = isFetching
  const rowDataAsLoading = new Array(100).fill({} as BlockData)
  const rowData = Array.isArray(data) && data.length > 0 ? data.slice(data.length - 400, data.length - 1).reverse() : []

  const columns: Array<ITableColumn<BlockData>> = useMemo(() => [
    {
      dataKey: "height",
      label: "Height",
      style: {},
      width: 10,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography sx={{ color: 'rgb(55, 190, 131)'}}>{item.height}</StyledBodyTableTypography>,
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
        isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' fontSize={12}>{format(new Date(Number(item.timestamp) * 1000), 'MM/dd/yyyy')}</StyledBodyTableTypography>
      ),
    },
    {
      dataKey: "num_transactions",
      label: "Num. Txs.",
      style: {},
      width: 10,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item.num_transactions}</StyledBodyTableTypography>,
    },
    {
      dataKey: "size",
      label: "Size",
      style: {},
      width: 6,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item.size}</StyledBodyTableTypography>,
    },
    {
      dataKey: "total_block_output",
      label: "Output ZEC",
      style: {},
      width: 12,
      render: (item) => isTableLoading ? <Skeleton variant="text" /> : <StyledBodyTableTypography fontWeight='400' variant='body2'>{item["total_block_output"]}</StyledBodyTableTypography>,
    },
  ], [data, isTableLoading]);

  return (
    <Box width='100%' sx={{ display: 'flex', flexGrow: 1}}>
      <Table 
      router={router}
      rowCount={2000000}
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