import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Stack, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import BlockTable from "../containers/BlockTable";
import TransactionsTable from "../containers/TransactionsTable";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  apiRoutes,
  baseUrl,
} from "../constants/api-routes";
import { BlockData, TransactionData } from "../types";
import SearchBarV2 from "../components/SearchBarV2";
import { AccountTree, Receipt } from "@mui/icons-material";
import FilterButton from "../components/FilterButton";

const inter = Inter({ subsets: ["latin"] });

const LIMIT = 50;

interface IHomeProps {
  initialBlocksData: Array<BlockData>;
  initialTransactionData: Array<TransactionData>;
}
export default function Home({
  initialBlocksData,
  initialTransactionData,
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

  const loadMoreBlockRows = async ({ startIndex, stopIndex }) => {
    // Increment the page since we're fetching the next set of data
    const nextPage = blockPage + 1;

    try {
      const response = await fetch(
        `${baseUrl}${apiRoutes.blocksRoute}?page=${nextPage}&limit=${LIMIT}`
      );
      const newData = await response.json();

      setBlockData((prevData) => [...prevData, ...newData]);

      setBlockPage(nextPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadMoreTransactionRows = async ({ startIndex, stopIndex }) => {
    // Increment the page since we're fetching the next set of data
    const nextPage = transactionPage + 1;

    try {
      const response = await fetch(
        `${baseUrl}${apiRoutes.transactionsRoute}?page=${nextPage}&limit=${LIMIT}`
      );
      const newData = await response.json();

      setTransactionData((prevData) => [...prevData, ...newData]);

      setTransactionPage(nextPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isRowBlockRowLoaded = ({ index }) => {
    return !!blockData[index];
  };

  const isTransactionRowLoaded = ({ index }) => {
    return !!transactionData[index];
  };

  return (
    <div style={{ position: "relative" }}>
      <Head>
        <title>Block Explorer</title>
        <meta
          name="description"
          content="A highly personalized block explorer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <main className={`${styles.main} ${inter.className}`}>
        <Container
          maxWidth="xl"
          sx={{ overflow: "hidden", typography: "body1" }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                mx: 2.8,

                borderBottom: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TabList
                textColor="secondary"
                TabIndicatorProps={{ style: { display: "none" } }}
                onChange={handleChange}
                sx={{
                  paddingLeft: "0px !important",
                  paddingRight: "0px !important",
                  paddingBottom: "0px !important",
                  borderBottom: "0x !important ",
                }}
              >
                <Tab
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  color="primary"
                  label="Recent Blocks"
                  value="1"
                  sx={{ textTransform: "none" }}
                  icon={
                    <AccountTree
                      fontSize="small"
                      sx={{ width: 14, height: 14 }}
                    />
                  }
                  iconPosition="start"
                />
                <Tab
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  color="primary"
                  label="Recent Transactions"
                  sx={{ textTransform: "none" }}
                  value="2"
                  iconPosition="start"
                  icon={
                    <Receipt fontSize="small" sx={{ width: 14, height: 14 }} />
                  }
                />
              </TabList>

              <Stack
                spacing={2}
                alignItems="center"
                direction="row"
                sx={{ mt: 1.5 }}
              >
                <FilterButton />
                <SearchBarV2 />
              </Stack>
            </Box>

            <TabPanel value="1">
              {" "}
              <BlockTable
                loadMoreRows={loadMoreBlockRows}
                isRowLoaded={isRowBlockRowLoaded}
                data={blockData}
                useQueryProps={{ isFetching: false }}
              />
            </TabPanel>
            <TabPanel value="2">
              <TransactionsTable
                loadMoreRows={loadMoreTransactionRows}
                isRowLoaded={isTransactionRowLoaded}
                data={transactionData}
                useQueryProps={{ isFetching: false }}
              />
            </TabPanel>
          </TabContext>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialDataResolved = await Promise.all<Response>([
      fetch(`${baseUrl}${apiRoutes.blocksRoute}?page=${1}&limit=${LIMIT}`).then(
        (res) => res.json()
      ),
      fetch(
        `${baseUrl}${apiRoutes.transactionsRoute}?page=${1}&limit=${LIMIT}`
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
