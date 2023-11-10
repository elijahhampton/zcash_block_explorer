import axios, {
  AxiosResponse,
} from "axios";
import { BlockData, TransactionData } from "../types";
//NEXT_PUBLIC_VERCEL_ENV
const baseUrl: String = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}` : "localhost:8000" 
console.log(process.env)
const apiRoutes = {
  blocksRoute: "/blocks",
  transactionsRoute: "/transactions",
};

async function fetchBlocks(): Promise<Array<BlockData>> {
  try {
    const result: AxiosResponse = await axios.get(
      baseUrl + apiRoutes.blocksRoute + "/all"
    );
    return result.data;
  } catch (error) {
    console.log(error);
    console.log('')
    return [];
  }
}

async function fetchTransactions(): Promise<Array<TransactionData>> {
  try {
    const result = await axios.get(
      baseUrl + apiRoutes.transactionsRoute + "/all"
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}


export { baseUrl, fetchBlocks, apiRoutes, fetchTransactions };
