import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Table from "../components/Table";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Typography, Box, Avatar, Stack, CssBaseline, Chip } from "@mui/material";
import React from "react";
import BlockTable from "../containers/BlockTable";
import TransactionsTable from "../containers/TransactionsTable";
import useBlock from "../hooks/queries/useBlock";
import useFetchTransactions from "../hooks/queries/useFetchTransactions";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: blockData, refetch: onRefetchBlocks, status: blockStatus, isFetching: isFetchingBlocks } = useBlock()
  const { data: transactionData, refetch: onRefetchTransactions, status: fetchTransactionsStatus, isFetching: isFetchingTransactions } = useFetchTransactions();
  return (
    <>
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
      <main
        style={{ backgroundColor: "#FFF" }}
        className={`${styles.main} ${inter.className}`}
      >
        <Typography sx={{ pt: 3 }} color='black' variant='h5'>Blockchain Statistics</Typography>
        <Stack
          sx={{ pt: 2 }}
          spacing={2}
          direction="row"
          width="100%"
          flexWrap="wrap"
          alignItems="flex-start"
        >
          <Chip
         //   variant="outlined"
         label="'🌎 Blocks: {blockData.length}'"
            sx={{ backgroundColor: '#FEFEFE', border: '1px solid #ddd', margin: '10px !important', borderRadius: "20px", fontWeight: '400', px: 2, py: 0.4 }}
          />

          <Chip
          label="🌎 Transactions: {transactionData.length}"
       //     variant="outlined"
            sx={{ backgroundColor: '#FEFEFE', border: '1px solid #ddd', margin: '10px !important',borderRadius: "20px", fontWeight: '400', px: 2, py: 0.4 }}
          />

          <Chip
           // variant="outlined"
           label="💰 Transparent Value Pool: 200,324,329"
            sx={{ backgroundColor: '#FEFEFE', border: '1px solid #ddd', margin: '10px !important', borderRadius: "20px", fontWeight: '400', px: 2, py: 0.4 }}
          />

          <Chip
         //   variant="outlined"
         label="💰 Sprout Value Pool: 200,324,329"
            sx={{ backgroundColor: '#FEFEFE', border: '1px solid #ddd', margin: '10px !important', borderRadius: "20px", fontWeight: '400', px: 2, py: 0.4 }}
          />

          <Chip
     //       variant="outlined"
            sx={{ backgroundColor: '#FEFEFE', border: '1px solid #ddd', margin: '10px !important', borderRadius: "20px", fontWeight: '400', px: 2, py: 0.4 }}
            label="💰 Sapling Value Pool: 200,324,329"
          />

          <Chip
        //    variant="outlined"
            sx={{ backgroundColor: '#FEFEFE', border: '1px solid #ddd', margin: '10px !important', borderRadius: "20px", fontWeight: '400', px: 2, py: 0.4 }}
         label="💰 Orchard Value Pool: 200,324,329"
         />
        </Stack>

        <Stack spacing={2} width="100%" alignItems="flex-start">
          <BlockTable data={blockData} useQueryProps={{ isFetching: isFetchingBlocks }} />
          <TransactionsTable data={transactionData} useQueryProps={{ isFetching: isFetchingTransactions }} />
        </Stack>
      </main>
      <Footer />
    </>
  );
}
