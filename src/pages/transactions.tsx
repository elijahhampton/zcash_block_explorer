import { useState } from "react";
import TransactionsTable from "../containers/TransactionsTable";
import { apiRoutes, baseUrl } from "../constants/api-routes";
import { TransactionData } from "../types";
import { Box } from "@mui/material";
import PageHead from "../components/PageHead";

interface IHomeProps {
  initialTransactionData: Array<TransactionData>;
}

const LIMIT = 50;
export default function TransactionPage({
  initialTransactionData = [],
}: IHomeProps) {
  const [transactionPage, setTransactionPage] = useState<number>(1);
  const [transactionData, setTransactionData] = useState<Array<any>>(
    initialTransactionData
  );

  const onRefreshTableData = async () => {
    const transactionDataResponse = await fetch(
      `${baseUrl}${
        apiRoutes.transactionsRoute
      }?page=${transactionPage}&limit=${LIMIT}&reversedOrder=${true}`
    );

    const newTransactionData = await transactionDataResponse.json();

    setTransactionData((prevData) => [...prevData, ...newTransactionData]);
  };

  const loadMoreTransactionRows = async ({ startIndex, stopIndex }) => {
    // Increment the page since we're fetching the next set of data
    const nextPage = transactionPage + 1;

    try {
      const response = await fetch(
        `${baseUrl}${
          apiRoutes.transactionsRoute
        }?page=${nextPage}&limit=${LIMIT}&reversedOrder=${true}`
      );
      const newData = await response.json();

      setTransactionData((prevData) => [...prevData, ...newData]);

      setTransactionPage(nextPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isTransactionRowLoaded = ({ index }) => {
    return !!transactionData[index];
  };

  return (
    <Box sx={{ paddingTop: "60px", display: "flex", height: "100vh" }}>
             <PageHead title="Voyager Block Explorer - Transactions" description="Explore chain transactions" content="Scroll and view a table of chain transactions." />
      <TransactionsTable
        loadMoreRows={loadMoreTransactionRows}
        isRowLoaded={isTransactionRowLoaded}
        data={transactionData}
        useQueryProps={{ isFetching: false }}
      />
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    const initialDataResolved = await Promise.all<Response>([
      fetch(
        `${baseUrl}${
          apiRoutes.transactionsRoute
        }?page=${1}&limit=${LIMIT}&reversedOrder=${true}`
      ).then((res) => res.json()),
    ]);

    return {
      props: {
        initialTransactionData: initialDataResolved[0],
      },
    };
  } catch (error) {
    return {
      props: {
        initialTransactionData: [],
      },
    };
  }
}
