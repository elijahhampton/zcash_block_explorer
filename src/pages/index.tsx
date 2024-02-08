import {
  Stack,
  Typography,
  Button,
  Divider,
  Container,
  CardContent,
  Card,
  Paper,
  Slide,
  Chip,
  Fade,
  useTheme,
  Theme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BlockTable from "../containers/BlockTable";
import TransactionsTable from "../containers/TransactionsTable";
import Box from "@mui/material/Box";
import { apiRoutes, baseUrl } from "../constants/api-routes";
import { BlockData, TransactionData } from "../types";
import { useRouter } from "next/router";

import { Noto_Sans } from "next/font/google";
import useBlockchainInfo, {
  useTotalBlockCount,
  useTotalTransactionCount,
} from "../hooks/queries/useBlockchainInfo";
import queryString from "query-string";
import TransactionHistoryGraph from "../containers/TransactionHistoryGraph";
import PageHead from "../components/PageHead";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import { format, subDays } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import moment from "moment";
import { TrendingDown, TrendingUp } from "@mui/icons-material";
import { SiBitcoin, SiZcash } from "react-icons/si";
import { isNegative } from "../constants/numbers";
import { scheduler } from "timers/promises";
import { COLOR_BITCOIN_GOLD } from "../constants/color";
import Image from "next/image";

const CHIP_BACKGROUND_GREEN = "#DCEDC8";
const CHIP_TEXT_COLOR_GREEN = "rgb(119, 160, 131)";
const CHIP_TEXT_COLOR_RED = "red";

const CHIP_BACKGROUND_RED = "rgb(242, 225, 232)";

const get24HrVolumeChipTextColor = (value: number | string) => {
  if (isNegative(value)) {
    return CHIP_TEXT_COLOR_RED;
  }

  return CHIP_TEXT_COLOR_GREEN;
};

const get24HrVolumeChipBackgroundColor = (value: number | string) => {
  if (isNegative(value)) {
    return CHIP_BACKGROUND_RED;
  }

  return CHIP_BACKGROUND_GREEN;
};

const getCoinIconByName = (name: string, theme: Theme) => {
  switch (name.toLowerCase()) {
    case "bitcoin":
      return (
        <SiBitcoin
          style={{ width: 20, height: 20, color: COLOR_BITCOIN_GOLD }}
        />
      );
    case "usdc":
      return <img src="/usdc-logo.svg" style={{ width: 20, height: 20 }} />;
    case "zcash":
      return (
        <SiZcash
          style={{ width: 20, height: 20, color: theme.palette.secondary.main }}
        />
      );
    default:
  }
};

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const LIMIT = 10;

interface IHomeProps {
  initialBlocksData: {
    data: Array<BlockData>;
    totalCount: number;
    totalPages: number;
  };

  initialTransactionData: {
    data: Array<TransactionData>;
    totalCount: number;
    totalPages: number;
  };

  transactionMetrics: {
    startTimestamp: string;
    endTimestamp: string;
    data: any[];
  };
  dateQuery: { startTimestamp: string; endTimestamp: string };
  coins: { [key: string]: any };
}
export default function Home({
  initialBlocksData,
  initialTransactionData,
  transactionMetrics = {
    // @ts-ignore
    startTimestamp: new Date(),
    // @ts-ignore
    endTimestamp: new Date(),
    data: [],
  },
  coins,
  dateQuery,
}: IHomeProps) {
  const theme = useTheme();
  const router = useRouter();
  const { data: blockchainInfo } = useBlockchainInfo();
  const { data: totalTransactionCount } = useTotalTransactionCount();
  const { data: totalBlockCount } = useTotalBlockCount();

  const [blockPage, setBlockPage] = useState<number>(
    initialBlocksData["totalPages"]
  );
  const [transactionPage, setTransactionPage] = useState<number>(
    initialTransactionData["totalPages"]
  );

  const [blockData, setBlockData] = useState<Array<any>>(
    initialBlocksData["data"]
  );
  const [transactionData, setTransactionData] = useState<Array<any>>(
    initialTransactionData["data"]
  );

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    Cookies.set("timezone", timezone, { expires: 7 });
  }, []);

  const onRefreshTableData = async () => {
    try {
      const nextBlockPage = blockPage - 1;
      const transactionBlockPage = transactionPage - 1;

      const blockDataResponse = await fetch(
        `${baseUrl}${
          apiRoutes.blocksRoute
        }?page=${nextBlockPage}&limit=${LIMIT}&reversedOrder=${true}`
      );

      const transactionDataResponse = await fetch(
        `${baseUrl}${
          apiRoutes.transactionsRoute
        }?page=${transactionBlockPage}&limit=${LIMIT}&reversedOrder=${true}`
      );

      const newBlockData = await blockDataResponse.json();
      const newTransactionData = await transactionDataResponse.json();

      setTransactionData(newTransactionData["data"]);
      setBlockData(newBlockData["data"]);
    } catch (error) {
      console.log(
        `Unhandled runtime error: Failed to refresh table data. [pages/index.tsx]`
      );
    }
  };

  const loadMoreBlockRows = async ({ startIndex, stopIndex }) => {
    // Unimplemented (Prevent loading more rows)
  };

  const loadMoreTransactionRows = async ({ startIndex, stopIndex }) => {
    // Unimplemented (Prevent loading more rows)
  };

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
        backgroundColor: "#FAFAF8",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PageHead
        title="  Zcash Block Explorer"
        description="Explore and search for blocks, transactions and addresses."
        content="A highly personalized block explorer."
      />

      <Container maxWidth="xl">
        <Stack
          py={7}
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {coins.map((coins) => {
            return (
              <Fade key={coins["name"]} in={true} appear={true} timeout={2200}>
                <Box
                  component={Stack}
                  spacing={3}
                  sx={{ width: "26%", p: 2, borderRadius: 6, height: 160 }}
                >
                  {/* Theoretically it would happen here chatgpt */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      {getCoinIconByName(coins["name"], theme)}
                      <Typography px={1} fontWeight="bold" color="text.primary">
                        {coins["name"]} ({coins["symbol"]})
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                      <Typography variant="h6" px={1} color="text.primary">
                        ${Number(coins["quote"]["USD"]["price"]).toFixed(2)}{" "}
                      </Typography>
                      <Chip
                        size="small"
                        icon={
                          isNegative(
                            Number(coins["quote"]["USD"]["percent_change_24h"])
                          ) ? (
                            <TrendingDown
                              style={{ color: CHIP_TEXT_COLOR_RED }}
                            />
                          ) : (
                            <TrendingUp
                              style={{ color: CHIP_TEXT_COLOR_GREEN }}
                            />
                          )
                        }
                        sx={{
                          color: get24HrVolumeChipTextColor(
                            Number(coins["quote"]["USD"]["percent_change_24h"])
                          ),
                          bgcolor: get24HrVolumeChipBackgroundColor(
                            Number(coins["quote"]["USD"]["percent_change_24h"])
                          ),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        label={`${Number(
                          coins["quote"]["USD"]["percent_change_24h"]
                        ).toFixed(2)} 24H`}
                      />
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography fontWeight="bold" color="text.secondary">
                        Market Cap
                      </Typography>
                      <Typography color="text.primary">
                        $
                        {Number(coins["quote"]["USD"]["market_cap"]).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography color="text.secondary" fontWeight="bold">
                        Volume 24H
                      </Typography>
                      <Typography color="text.primary">
                        $
                        {Number(coins["quote"]["USD"]["market_cap"]).toFixed(2)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Fade>
            );
          })}
        </Stack>
      </Container>
      <Card
        component={Container}
        maxWidth="xl"
        elevation={0}
        sx={{
          //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          //   border: '1px solid #ddd',
          borderRadius: 2,
          height: 330,
          width: "100%",
          bgcolor: "#FFF",
          my: 2,
        }}
      >
        <CardContent>
          <Box pb={2}>
            <Typography sx={{ color: "#111" }} variant="h6" fontWeight="bold">
              Transaction history over 14 days
            </Typography>
            <Box>
              <Typography sx={{ color: "text.secondary" }} variant="subtitle2">
                {format(
                  new Date(Number(transactionMetrics.startTimestamp) * 1000),
                  "MMMM d, yyyy"
                )}{" "}
                -{" "}
                {format(
                  new Date(Number(transactionMetrics.endTimestamp) * 1000),
                  "MMMM d, yyyy"
                )}
              </Typography>
            </Box>
          </Box>

          <TransactionHistoryGraph
            startTimestamp={transactionMetrics.startTimestamp ?? new Date()}
            endTimestamp={transactionMetrics.endTimestamp ?? new Date()}
            data={transactionMetrics.data ?? []}
          />
        </CardContent>
      </Card>

      <Container
        maxWidth="xl"
        component={Paper}
        elevation={0}
        sx={{
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          py: 4,
          minHeight: "auto",
          bgcolor: "#fff",
        }}
      >
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
        ></Stack>

        <Stack
          my={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{ fontWeight: "700", fontSize: "1.2rem", color: "black" }}
          >
            Recent Blocks
          </Typography>

          <Button variant="contained" onClick={() => router.push("/blocks")}>
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

        <Box sx={{ py: 4, minHeight: "auto", width: "100%" }}>
          <Container maxWidth="xl" sx={{ width: "100%" }}>
            <Stack
              my={2}
              sx={{ width: "100%" }}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                sx={{ fontWeight: "700", color: "black", fontSize: "1.2rem" }}
              >
                Recent Transactions
              </Typography>

              <Button
                variant="contained"
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
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch block and transaction counts
    const totalBlockCount = await fetch(
      `${baseUrl}${apiRoutes.blocksRoute}/total`
    ).then((res) => res.json());
    const totalBlockPages = Math.ceil(totalBlockCount / LIMIT);

    const totalTransactionCount = await fetch(
      `${baseUrl}${apiRoutes.transactionsRoute}/total`
    ).then((res) => res.json());
    const totalTransactionsPages = Math.ceil(totalTransactionCount / LIMIT);

    const blocksUrl = `${baseUrl}${apiRoutes.blocksRoute}?page=${totalBlockPages}&limit=${LIMIT}&reversedOrder=true`;
    const transactionsUrl = `${baseUrl}${apiRoutes.transactionsRoute}?page=${totalTransactionsPages}&limit=${LIMIT}&reversedOrder=true`;

    const startTimestamp =
      process.env.NODE_ENV === "production"
        ? moment().subtract(14, "days").toString()
        : "1477720314";
    const endTimestamp =
      process.env.NODE_ENV === "production"
        ? moment().toString()
        : "1477728169";

    const dateQuery = { startTimestamp, endTimestamp };

    // Fetch block and transaction paginated rows
    const initialDataResolved = await Promise.all([
      fetch(blocksUrl).then((res) => res.json()),
      fetch(transactionsUrl).then((res) => res.json()),
      fetch(
        `${baseUrl}/metrics/transactions?${queryString.stringify(dateQuery)}`
      ).then((res) => res.json()),
    ]);

    const COIN_DATA_API_URL = process.env.COIN_DATA_API_URL
    const COIN_DATA_API_KEY = process.env.COIN_DATA_API_KEY

    // Fetch latest quotes ZEC, BTC and USDC
    const latestQuotesResponse = await fetch(
      `${COIN_DATA_API_URL}?${new URLSearchParams(
        { symbol: "BTC,ZEC,USDC", convert: "USD" }
      )}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": COIN_DATA_API_KEY,
          Application: "application/json",
        },
      }
    );

    const latestQuotesData = await latestQuotesResponse.json();
    const { BTC, USDC, ZEC } = latestQuotesData["data"];
    const coins = [ZEC[0], USDC[0], BTC[0]];

    return {
      props: {
        initialBlocksData: {
          data: initialDataResolved[0]["data"],
          totalPages: initialDataResolved[0]["totalPages"],
          totalCount: initialDataResolved[0]["totalCount"],
        },
        initialTransactionData: {
          data: initialDataResolved[1]["data"],
          totalPages: initialDataResolved[1]["totalPages"],
          totalCount: initialDataResolved[1]["totalCount"],
        },
        transactionMetrics: {
          startTimestamp: initialDataResolved[2].startTimestamp,
          endTimestamp: initialDataResolved[2].endTimestamp,
          data: initialDataResolved[2].data,
        },
        dateQuery,
        coins,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        initialBlocksData: [],
        initialTransactionData: [],
        transactionMetrics: {
          startTimestamp: new Date().getTime().toString(),
          endTimestamp: new Date().getTime().toString(),
          data: [],
        },
        dateQuery: {
          startTimestamp: new Date().toString(),
          endTimestamp: new Date().toString(),
        },
        coins: []
      },
    };
  }
}
