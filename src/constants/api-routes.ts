import axios, {
  AxiosResponse,
} from "axios";
import { BlockData, TransactionData } from "../types";

const baseUrl: String =
  process.env.NODE_ENV === "production"
    ? "http://0.0.0.0:4000"
    : "http://0.0.0.0:4000";

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
