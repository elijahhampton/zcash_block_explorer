import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import {
  Stack,
  Container,
  Typography,
  Button,
  Divider,
  darken,
  Card,
  CardContent,
} from "@mui/material";
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
  Launch,
  Receipt,
  Refresh,
  RefreshRounded,
} from "@mui/icons-material";
import FilterButton from "../components/FilterButton";
import UiButton from "../components/FilterButton";
import Layout from "../components/Layout";
import axios from "axios";
import BuyMeACoffe from "../containers/BuyMeACoffee";
import CustomizedInputBase from "../components/SearchBar";
import { useRouter } from "next/router";
import { StyledCard } from "../styled/card.styled";

const LIMIT = 10;
const Zcash_Upgrade_Information = [
  {
    "name": "Overwinter",
    "activation_height": 347500,
    "activation_date": "June 25, 2018",
    "description": "The first network upgrade for Zcash, strengthening the protocol for future upgrades, including versioning, replay protection, performance improvements, and transaction expiry."
  },
  {
    "name": "Sapling",
    "activation_height": 419200,
    "description": "A network upgrade introducing significant efficiency improvements for shielded transactions, paving the way for broader adoption."
  },
  {
    "name": "Blossom",
    "activation_height": 653600,
    "activation_date": "December 11, 2019",
    "description": "The third network upgrade for Zcash."
  },
  {
    "name": "Heartwood",
    "activation_height": 903000,
    "activation_date": "July 16, 2020",
    "description": "The fourth major network upgrade for Zcash."
  },
  {
    "name": "Canopy",
    "activation_height": 1046400,
    "activation_date": "November 18, 2020",
    "description": "The fifth major network upgrade for Zcash, coinciding with the first Zcash halving."
  },
  {
    "name": "NU5",
    "activation_height": 1687104,
    "activation_date": "May 31, 2022",
    "description": "The sixth major network upgrade for Zcash, part of the Halo Arc product suite, removing reliance on the trusted setup."
  }
]

interface IHomeProps {
  initialBlocksData: Array<BlockData>;
  initialTransactionData: Array<TransactionData>;
}
export default function Home({
  initialBlocksData = [],
  initialTransactionData = [],
}: IHomeProps) {
  const router = useRouter()
  const [blockData, setBlockData] = useState<Array<any>>(initialBlocksData);
  const [transactionData, setTransactionData] = useState<Array<any>>(
    initialTransactionData
  );

  const onRefreshTableData = async () => {
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
    <div style={{ paddingTop: "60px" }}>
      <Head>
        <title>Block Explorer</title>
        <meta
          name="description"
          content="A highly personalized block explorer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ py: 4, bgcolor: '#fafafa'}}>
        <Box sx={{ px: 5, pb: 2,}}>
        <Typography pb={2} variant='h6'>
          Zcash Upgrades
        </Typography>
        <Divider sx={{ width: 'auto', flexGrow: 1 }} />
        </Box>

        <Stack direction='row' alignItems='center' justifyContent='space-evenly' spacing={5}>
          {
            Zcash_Upgrade_Information.map((info) => {
              return (
                <StyledCard>
                <CardContent sx={{ width: 200 }}>
                    <Typography color='primary.dark' variant='subtitle1'>
                      {info.name}
                    </Typography>
                    <Typography color='text.primary' variant='body2'>
                      Upgrade Height: {info.activation_height}
                    </Typography>
                </CardContent>
              </StyledCard>
              )
            })
          }
        </Stack>

          <Button disableElevation disableFocusRipple disableRipple disableTouchRipple sx={{ px: 5, pt: 2 }} variant='text' endIcon={<Launch />}>
          Learn more about zcash upgrades
          </Button>
      </Box>
      <Box sx={{ py: 4, px: 25, minHeight: "auto", bgcolor: "#fff" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontSize: 16, color: "#3e5a5b" }}>
            Latest {LIMIT} Blocks
          </Typography>

          <Button onClick={() => router.push('/blocks')} endIcon={<KeyboardArrowRightRounded />}>
            Explore blocks
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* <BlockTable /> */}
        <BlockTable
          rowCount={2000000}
          loadMoreRows={loadMoreBlockRows}
          isRowLoaded={isRowBlockRowLoaded}
          data={blockData}
          useQueryProps={{ isFetching: false }}
        />
      </Box>

      <Box sx={{ py: 4, px: 25, minHeight: "auto", bgcolor: "#fafafa" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ color: "#3e5a5b", fontSize: 16 }}>
            Latest {LIMIT} Transactions
          </Typography>

          <Button onClick={() => router.push('/transactions')} endIcon={<KeyboardArrowRightRounded />}>
            Explore transactions
          </Button>
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
        <Typography sx={{ color: "black" }}>
          <BuyMeACoffe />
        </Typography>
      </Box>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialDataResolved = await Promise.all<Response>([
      fetch(
        `${baseUrl}${
          apiRoutes.blocksRoute
        }?page=${1}&limit=${LIMIT}&reversedOrder=${true}`
      ).then((res) => res.json()),
      fetch(
        `${baseUrl}${
          apiRoutes.transactionsRoute
        }?page=${1}&limit=${LIMIT}&reversedOrder=${true}`
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
