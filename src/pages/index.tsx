
// @ts-nocheck
import {
  Stack,
  Typography,
  Button,
  Divider,
  Container,
  CardContent,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BlockTable from "../containers/BlockTable";
import TransactionsTable from "../containers/TransactionsTable";
import Box from "@mui/material/Box";
import { apiRoutes, baseUrl } from "../constants/api-routes";
import { BlockData, TransactionData } from "../types";
import {
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { useRouter } from "next/router";

import { Noto_Sans } from "next/font/google";
import { test_SECONDARY_ACCENT_COLOR } from "../constants/color";
import useBlockchainInfo, {
  useTotalBlockCount,
  useTotalTransactionCount,
} from "../hooks/queries/useBlockchainInfo";
import queryString from "query-string";
import Search from "../components/Search";
import BlockchainMetrics from "../containers/BlockchainMetrics";
import TransactionHistoryGraph from "../containers/TransactionHistoryGraph";
import PageHead from "../components/PageHead";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dateQuery = {
  startTimestamp: "1477671596",
  endTimestamp: "1477728169",
};

const LIMIT = 10;

interface IHomeProps {
  initialBlocksData: Array<BlockData>;
  initialTransactionData: Array<TransactionData>;
  transactionMetrics: Array<any>;
}
export default function Home({
  initialBlocksData = [],
  initialTransactionData = [],
  transactionMetrics = [],
}: IHomeProps) {
  const router = useRouter();
  const { data: blockchainInfo } = useBlockchainInfo();
  const { data: totalTransactionCount } = useTotalTransactionCount();
  const { data: totalBlockCount } = useTotalBlockCount();

  const [blockData, setBlockData] = useState<Array<any>>(initialBlocksData);
  const [transactionData, setTransactionData] = useState<Array<any>>(
    initialTransactionData
  );

  const onRefreshTableData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}${
          apiRoutes.blocksRoute
        }?page=${1}&limit=${LIMIT}&reversedOrder=${true}`
      );

      const transactionDataResponse = await fetch(
        `${baseUrl}${
          apiRoutes.transactionsRoute
        }?page=${1}&limit=${LIMIT}&reversedOrder=${true}`
      );

      const newBlockData = await response.json();
      const newTransactionData = await transactionDataResponse.json();

      setTransactionData(newTransactionData);
      setBlockData(newBlockData);
    } catch (error) {
      console.log(
        `Unhandled runtime error: Failed to refresh table data. [pages/index.tsx]`
      );
    }
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
    onRefreshTableData();
  }, []);

  return (
    <div
      className={noto.className}
      style={{
        paddingTop: "60px",
        display: "flex",
        backgroundColor: '#FFF',
        flexDirection: "column",
        alignItems: "center",
      }}
    >

      <PageHead title="Voyager Block Explorer" description="Explore and search for blocks, transactions and addresses." content="A highly personalized block explorer." />

      <Box sx={{ bgcolor: '#F3F6F9'}}>
        <Container
          disableGutters
          maxWidth="xl"
          sx={{
            p: 2,
            px: 7,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: '#FFF'
          }}
        >
          <Typography sx={{ color: "#1E2B4D" }}>
            Explore Blocks, Verify Transactions, and Embrace Transparent Privacy
            - Your Gateway to Financial Insight
          </Typography>

          <Box />
        </Container>
      </Box>
      <Divider sx={{ width: "100%" }} />

      <Box
        p={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "rgb(248, 249, 250)",
        }}
      >
        <Search />

        <BlockchainMetrics
          orchardPoolValue={blockchainInfo["orchard_pool_value"] ?? "0"}
          totalTransactions={totalTransactionCount ?? "0"}
          totalBlocks={totalBlockCount ?? "0"}
          totalChainValue={
            Number(blockchainInfo["total_chain_value"]).toPrecision(4) ?? 0
          }
          chainSize={Number(blockchainInfo["size_on_disk"])?? 0}
        />
      </Box>

      <Divider sx={{ width: "100%" }} />
      <Container
        maxWidth="xl"
        sx={{ py: 4, minHeight: "auto", bgcolor: "#fff" }}
      >
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
        ></Stack>
        <Card
          variant="outlined"
          sx={{
            height: 280,
            borderRadius: 2,
            bgcolor: "#FFF",
            my: 2,
            mb: 3.5,
          }}
        >
          <CardContent>
            <Typography paragraph color="GrayText">
              Transaction history in 14 days
            </Typography>
            <TransactionHistoryGraph transactionMetrics={transactionMetrics} />
          </CardContent>
        </Card>

        <Stack
          my={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontSize: "1.2rem", color: "black" }}>
            Recent Blocks
          </Typography>

          <Button
                variant='contained'
            onClick={() => router.push("/blocks")}
          >
            Explore blocks
          </Button>
        </Stack>

        <BlockTable
          rowCount={2000000}
          loadMoreRows={loadMoreBlockRows}
          isRowLoaded={isRowBlockRowLoaded}
          data={blockData}
          useQueryProps={{ isFetching: false }}
        />
      </Container>

      <Box sx={{ py: 4, minHeight: "auto", bgcolor: "#fff", width: "100%" }}>
        <Container maxWidth="xl" sx={{ width: "100%" }}>
          <Stack
            my={2}
            sx={{ width: "100%" }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              sx={{ color: "black", fontSize: "1.2rem" }}
            >
              Recent Transactions
            </Typography>

            <Button
            variant='contained'
              onClick={() => router.push("/transactions")}
            
            >
              Explore transactions
            </Button>
          </Stack>

          <TransactionsTable
            rowCount={2000000}
            loadMoreRows={loadMoreTransactionRows}
            isRowLoaded={isTransactionRowLoaded}
            data={transactionData}
            useQueryProps={{ isFetching: false }}
          />
        </Container>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Construct URLs
    const blocksUrl = `${baseUrl}${apiRoutes.blocksRoute}?page=1&limit=${LIMIT}&reversedOrder=true`;
    const transactionsUrl = `${baseUrl}${apiRoutes.transactionsRoute}?page=1&limit=${LIMIT}&reversedOrder=true`;

    const dateQuery = {
      startTimestamp: "1477720314", //new Date().getTime().toString(),
      endTimestamp: "1477728169",
    };
    // Fetch data
    const initialDataResolved = await Promise.all([
      fetch(blocksUrl).then((res) => res.json()),
      fetch(transactionsUrl).then((res) => res.json()),
      fetch(
        `${baseUrl}/metrics/transactions?${queryString.stringify(dateQuery)}`
      ).then((res) => res.json()),
    ]);

    return {
      props: {
        initialBlocksData: initialDataResolved[0],
        initialTransactionData: initialDataResolved[1],
        transactionMetrics: initialDataResolved[2],
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        initialBlocksData: [],
        initialTransactionData: [],
      },
    };
  }
}
