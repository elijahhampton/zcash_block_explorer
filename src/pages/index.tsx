import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Stack, Container, Typography, Button, Divider, darken } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlockTable from "../containers/BlockTable";
import TransactionsTable from "../containers/TransactionsTable";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { apiRoutes, baseUrl } from "../constants/api-routes";
import { BlockData, TransactionData } from "../types";
import SearchBarV2 from "../components/SearchBarV2";
import {
  AccountTree,
  FilterListOffRounded,
  FilterListRounded,
  KeyboardArrowRightRounded,
  Receipt,
  Refresh,
  RefreshRounded,
} from "@mui/icons-material";
import FilterButton from "../components/FilterButton";
import UiButton from "../components/FilterButton";
import Layout from "../components/Layout";
import axios from "axios";
import BuyMeACoffe from "../containers/BuyMeACoffee";

const LIMIT = 10;

interface IHomeProps {
  initialBlocksData: Array<BlockData>;
  initialTransactionData: Array<TransactionData>;
}
export default function Home({
  initialBlocksData = [],
  initialTransactionData = [],
}: IHomeProps) {
  const [value, setValue] = useState<string>("1");
  const [blockPage, setBlockPage] = useState<number>(1);
  const [blockData, setBlockData] = useState<Array<any>>(initialBlocksData);

  const [transactionPage, setTransactionPage] = useState<number>(1);
  const [transactionData, setTransactionData] = useState<Array<any>>(
    initialTransactionData
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onRefreshTableData = async () => {
    const response = await fetch(
      `${baseUrl}${apiRoutes.blocksRoute}?page=${blockPage}&limit=${LIMIT}&reverseOrder=${true}`
    );

    const transactionDataResponse = await fetch(
      `${baseUrl}${apiRoutes.transactionsRoute}?page=${transactionPage}&limit=${LIMIT}&reverseOrder=${true}`
    );

    const newBlockData = await response.json()
    const newTransactionData = await transactionDataResponse.json()

    setTransactionData(newTransactionData);
    setBlockData(newBlockData);
  };

  const loadMoreBlockRows = async ({ startIndex, stopIndex }) => {};

  const loadMoreTransactionRows = async ({ startIndex, stopIndex }) => {};

  const isRowBlockRowLoaded = ({ index }) => {
    return !!blockData[index];
  };

  const isTransactionRowLoaded = ({ index }) => {
    return !!transactionData[index];
  };

  useEffect(() => {
    onRefreshTableData()
  }, [])
  
  return (
    <div style={{ paddingTop: '60px' }}>
      <Head>
        <title>Block Explorer</title>
        <meta
          name="description"
          content="A highly personalized block explorer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {/* <Container
          maxWidth="xl"
          sx={{ overflow: "hidden", typography: "body1" }}
        > */}
        {/* <Stack
                spacing={2}
                alignItems="center"
                direction="row"
                sx={{ mt: 1.5 }}
              >
                <UiButton onClick={onRefreshTableData} Icon={RefreshRounded} />
                <UiButton Icon={FilterListRounded} />
              </Stack> */}

        <Box sx={{ py: 4, px: 25, minHeight: 'auto', bgcolor: "#fff" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ fontSize: 16, color: "#3e5a5b" }}>
              Latest {LIMIT} Blocks
            </Typography>

            <Button endIcon={<KeyboardArrowRightRounded />}>Explore blocks</Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* <BlockTable /> */}
          <BlockTable
            rowCount={2000000 }
        loadMoreRows={loadMoreBlockRows}
        isRowLoaded={isRowBlockRowLoaded}
        data={blockData}
        useQueryProps={{ isFetching: false }}
      />
        </Box>

        <Box sx={{ py: 4, px: 25,  minHeight: 'auto', bgcolor: "#fafafa" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ color: "#3e5a5b", fontSize: 16}}>
              Latest {LIMIT} Transactions
            </Typography>

            <Button endIcon={<KeyboardArrowRightRounded />}>Explore transactions</Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <TransactionsTable
                rowCount={2000000}
                loadMoreRows={loadMoreTransactionRows}
                isRowLoaded={isTransactionRowLoaded}
                data={transactionData}
                useQueryProps={{ isFetching: false }}
              />
        </Box>

        <Box
          sx={{
            py: 2,
            px: 4,
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "black" }}><BuyMeACoffe /></Typography>
        </Box>
        {/* </Container> */}
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialDataResolved = await Promise.all<Response>([
      fetch(
        `${baseUrl}${apiRoutes.blocksRoute}?page=${1}&limit=${LIMIT}&reverseOrder=${true}`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}${apiRoutes.transactionsRoute}?page=${1}&limit=${LIMIT}&reverseOrder=${true}`
      ).then((res) => res.json()),
    ]);

    return {
      props: {
        initialBlocksData: initialDataResolved[0],
        initialTransactionData: initialDataResolved[1],
      },
    };
  } catch (error) {
    return {
      props: {
        initialBlocksData: [],
        initialTransactionData: [],
      },
    };
  }
}
