import { AxiosResponse } from "axios";
import { BlockData, TransactionData } from "../types";
import { assertAndManipulateObjectSchema } from "../utility/validate";
import queryString from "query-string";
import { cacheableFetch } from "../utility/cache";

//NEXT_PUBLIC_VERCEL_ENV
const baseUrl: String =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_API_URL}`
    : "http://localhost:8000";

const apiRoutes = {
  blocksRoute: "/blocks",
  blockRoute: "/block",
  transactionsRoute: "/transactions",
  transactionRoute: "/transaction",
  outputsRoute: "/outputs",
  inputsRoute: "/inputs",
  detailsRoute: "/details",
  peerRoute: "/peers",
  chainRoute: "/chain",
  searchRoute: "/search",
};

/**
 * Returns an array of all blocks in the blockchain. Do not use this function unless absolutely necessary,
 * @returns Array of blocks
 */
async function fetchBlocks(): Promise<Array<BlockData>> {
  try {
    const result = await fetch(baseUrl + apiRoutes.blocksRoute + "/all");
    return result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

/**
 * Returns an array of all transactions in the blockchain. Do not use this function unless absolutely necessary,
 * @returns Array of transactions
 */
async function fetchTransactions(): Promise<Array<TransactionData>> {
  try {
    const result = await fetch(baseUrl + apiRoutes.transactionsRoute + "/all");
    return result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchTransactionByHash(tx_hash: string): Promise<any> {
  try {
    const result = await fetch(
      baseUrl + apiRoutes.transactionRoute + `/${tx_hash}`
    );
    return await result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchBlockByHash(block_hash: string): Promise<any> {
  try {
    const result = await fetch(
      baseUrl + apiRoutes.blockRoute + `/${block_hash}`
    );

    return await result.json();
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function fetchOutputsByTransactionHash(
  transaction_hash: string
): Promise<any> {
  try {
    const response = await fetch(
      `${baseUrl}${apiRoutes.transactionRoute}${apiRoutes.outputsRoute}/${transaction_hash}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchInputsByTransactionHash(
  transaction_hash: string
): Promise<any> {
  try {
    const response = await fetch(
      `${baseUrl}${apiRoutes.transactionRoute}${apiRoutes.inputsRoute}/${transaction_hash}`
    );

    if (response.status === 200) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchTransactionsDetailsFromIds(ids: Array<string>) {
  try {
    const response = await fetch(
      `${baseUrl}${apiRoutes.transactionsRoute}/details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      }
    );

    if (response.status === 200) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchPeerInfo() {
  try {
    const response = await fetch(`${baseUrl}${apiRoutes.peerRoute}/details`, {
      method: "POST",
    });
    const jsonResponse = await response.json();
    if (response.status === 200) {
      console.log(jsonResponse);
      return jsonResponse;
    }

    return [];
  } catch (error) {
    return [];
  }
}

async function fetchBlockchainInfo() {
  try {
    const response = await fetch(`${baseUrl}${apiRoutes.chainRoute}`, {
      method: "POST",
    });

    if (!response.ok || response.status !== 200) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const jsonResponse = await response.json();
    if (!jsonResponse || typeof jsonResponse == "undefined") {
      throw new Error("Empty Response");
    }

    const result = assertAndManipulateObjectSchema(
      JSON.parse(jsonResponse),
      {
        best_block_hash: "string",
        best_height: "string",
        orchard_pool_value: "string",
        size_on_disk: "string",
        total_chain_value: "string",
      },
      {
        best_block_hash: "",
        best_height: "0",
        orchard_pool_value: "0",
        size_on_disk: "0",
        total_chain_value: "0",
      }
    );

    return result;
  } catch (error) {
    console.log(error);
    return {
      total_chain_value: "0",
      best_block_hash: "Unknown",
      best_height: "0",
      orchard_pool_value: "0",
      size_on_disk: "0",
    };
  }
}

async function fetchTransactionCount() {
  try {
    return (
      await fetch(`${baseUrl}${apiRoutes.transactionsRoute}/total`)
    ).json();
  } catch (error) {
    return 0;
  }
}

async function fetchBlockCount() {
  try {
    return (await fetch(`${baseUrl}${apiRoutes.blocksRoute}/total`)).json();
  } catch (error) {
    return 0;
  }
}

async function searchId(id: string): Promise<any | undefined> {
  try {
    const response = await cacheableFetch(
      `${baseUrl}${apiRoutes.searchRoute}/?id=${id}`,
      {
        method: "GET",
      },
      [apiRoutes.searchRoute, id]
    );

    return await response.json();
  } catch (error) {
    return undefined;
  }
}

export {
  baseUrl,
  fetchBlocks,
  apiRoutes,
  fetchTransactions,
  fetchTransactionByHash,
  fetchBlockByHash,
  fetchInputsByTransactionHash,
  fetchOutputsByTransactionHash,
  fetchTransactionsDetailsFromIds,
  fetchPeerInfo,
  fetchBlockchainInfo,
  fetchTransactionCount,
  fetchBlockCount,
  searchId,
};
