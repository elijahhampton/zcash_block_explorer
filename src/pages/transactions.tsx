import { useState } from "react";
import TransactionsTable from "../containers/TransactionsTable";
import { apiRoutes, baseUrl } from "../constants/api-routes";
import { TransactionData } from "../types";

interface IHomeProps {
    initialTransactionData: Array<TransactionData>;
  }

const LIMIT = 50;
export default function TransactionPage({  initialTransactionData = [] }) {
    const [transactionPage, setTransactionPage] = useState<number>(1);
    const [transactionData, setTransactionData] = useState<Array<any>>(
      initialTransactionData
    );
  
    const onRefreshTableData = async () => {
      const transactionDataResponse = await fetch(
        `${baseUrl}${apiRoutes.transactionsRoute}?page=${transactionPage}&limit=${LIMIT}`
      );

      const newTransactionData = await transactionDataResponse.json();
  
      setTransactionData((prevData) => [...prevData, ...newTransactionData]);
    }
  
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
  
    const isTransactionRowLoaded = ({ index }) => {
      return !!transactionData[index];
    };
  
    return (
        <TransactionsTable
                loadMoreRows={loadMoreTransactionRows}
                isRowLoaded={isTransactionRowLoaded}
                data={transactionData}
                useQueryProps={{ isFetching: false }}
              />
    )
}

export async function getServerSideProps() {
  try {
    const initialDataResolved = await Promise.all<Response>([
      fetch(
        `${baseUrl}${apiRoutes.transactionsRoute}?page=${1}&limit=${LIMIT}`
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
