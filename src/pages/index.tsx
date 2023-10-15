import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Table from "../components/Table";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import { Typography, Box, Avatar, Stack, CssBaseline, Chip } from "@mui/joy";
import React from "react";
import BlockTable from "../containers/BlockTable";
import TransactionsTable from "../containers/TransactionsTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <CssBaseline />
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
      <main style={{ backgroundColor: '#FAFAFA'}} className={`${styles.main} ${inter.className}`}>
        <Stack
          sx={{ pt: 2 }}
          spacing={2}
          direction="row"
          width="100%"
          alignItems="flex-start"
        >
          <Chip size="sm" sx={{ borderRadius: "20px", px: 2, py: 0.4 }}>
            Blocks: 200,324,329
          </Chip>

          <Chip size="sm" sx={{ borderRadius: "20px", px: 2, py: 0.4 }}>
            Transparent Value Pool: 200,324,329
          </Chip>

          <Chip size="sm" sx={{ borderRadius: "20px", px: 2, py: 0.4 }}>
            Sprout Value Pool: 200,324,329
          </Chip>

          <Chip size="sm" sx={{ borderRadius: "20px", px: 2, py: 0.4 }}>
            Sapling Value Pool: 200,324,329
          </Chip>

          <Chip size="sm" sx={{ borderRadius: "20px", px: 2, py: 0.4 }}>
            Orchard Value Pool: 200,324,329
          </Chip>
        </Stack>

        <Stack spacing={2} width="100%" alignItems="flex-start">
          <BlockTable />
          <TransactionsTable />
        </Stack>
      </main>
      <Footer />
    </>
  );
}
