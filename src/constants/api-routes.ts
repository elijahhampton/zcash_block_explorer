import axios, {
  AxiosResponse,
} from "axios";
import { BlockData, TransactionData } from "../types";
//NEXT_PUBLIC_VERCEL_ENV
const baseUrl: String = "http://localhost:8000" //process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}` : 
const apiRoutes = {
  blocksRoute: "/blocks",
  transactionsRoute: "/transactions",
};

async function fetchBlocks(): Promise<Array<BlockData>> {
  try {
    const result = await fetch(
      baseUrl + apiRoutes.blocksRoute + "/all"
    );
    return result.json();
  } catch (error) {
    console.log(error);
    console.log('')
    return [];
  }
}

async function fetchTransactions(): Promise<Array<TransactionData>> {
  try {
    const result = await fetch(
      baseUrl + apiRoutes.transactionsRoute + "/all"
    );
    return result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}


export { baseUrl, fetchBlocks, apiRoutes, fetchTransactions };
