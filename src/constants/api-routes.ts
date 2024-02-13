import { AxiosResponse } from "axios";
import { BlockData, PaginationParameters, TransactionData } from "../types";
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

async function fetchPaginatedBlocks(paginationParameters: PaginationParameters): Promise<Array<BlockData>> {
  const { page, limit, isReverseOrder } = paginationParameters

  if (page < 0 || limit < 0 || typeof isReverseOrder != 'boolean') {
    throw new Error('Invalid pagination parameters.');
  }

  const blockDataResponse = await fetch(
    `${baseUrl}${
      apiRoutes.blocksRoute
    }?page=${page}&limit=${limit}&reversedOrder=${isReverseOrder}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": String(baseUrl)
      }
    }
  );

  const newBlockData = await blockDataResponse.json();
  return newBlockData["data"]
}

async function fetchPaginatedTransactions(paginationParameters: PaginationParameters): Promise<Array<TransactionData>> {
  const { page, limit, isReverseOrder } = paginationParameters

  if (page < 0 || limit < 0 || typeof isReverseOrder != 'boolean') {
    throw new Error('Invalid pagination parameters.');
  }

  const transactionDataResponse = await fetch(
    `${baseUrl}${
      apiRoutes.transactionsRoute
    }?page=${page}&limit=${limit}&reversedOrder=${isReverseOrder}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": String(baseUrl)
      }
    }
  );

  const newTransactionData = await transactionDataResponse.json();
  return newTransactionData["data"]
}

/**
 * Returns an array of all blocks in the blockchain. Do not use this function unless absolutely necessary,
 * @returns Array of blocks
 */
async function fetchBlocks(): Promise<Array<BlockData>> {
  try {
    const result = await fetch(baseUrl + apiRoutes.blocksRoute + "/all", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": String(baseUrl)
      }
    });
    return result.json();
  } catch (error) {
    console.error("Unhandled error fetchBlocks(): ", error);
    return [];
  }
}

/**
 * Returns an array of all transactions in the blockchain. Do not use this function unless absolutely necessary,
 * @returns Array of transactions
 */
async function fetchTransactions(): Promise<Array<TransactionData>> {
  try {
    const result = await fetch(baseUrl + apiRoutes.transactionsRoute + "/all", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": String(baseUrl)
      }
    });
    return result.json();
  } catch (error) {
    console.error("Unhandled error fetchTransactions(): ", error);
    return [];
  }
}

async function fetchTransactionByHash(tx_hash: string): Promise<any> {
  try {
    const result = await fetch(
      baseUrl + apiRoutes.transactionRoute + `/${tx_hash}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": String(baseUrl)
        }
      }
    );
    return await result.json();
  } catch (error) {
    console.error("Unhandled error fetchTransactionByHash(): ", error);
    return [];
  }
}

async function fetchBlockByHash(block_hash: string): Promise<any> {
  try {
    const result = await fetch(
      baseUrl + apiRoutes.blockRoute + `/${block_hash}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": String(baseUrl)
        }
      }
    );
    
    const json = await result.json();
    return json
  } catch (error) {
    console.error("Unhandled error fetchBlockByHash(): ", error);
    return {};
  }
}

async function fetchOutputsByTransactionHash(
  transaction_hash: string
): Promise<any> {
  try {
    const response = await fetch(
      `${baseUrl}${apiRoutes.transactionRoute}${apiRoutes.outputsRoute}/${transaction_hash}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": String(baseUrl)
        }
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Unhandled error fetchOutputsByTransactionHash(): ", error);
    return [];
  }
}

async function fetchInputsByTransactionHash(
  transaction_hash: string
): Promise<any> {
  try {
    const response = await fetch(
      `${baseUrl}${apiRoutes.transactionRoute}${apiRoutes.inputsRoute}/${transaction_hash}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": String(baseUrl)
        }
      }
    );

    if (response.status === 200) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.error("Unhandled error fetchInputsByTransactionHash(): ", error);
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
            "Access-Control-Allow-Origin": String(baseUrl)
        },
        body: JSON.stringify(ids),
      }
    );

    if (response.status === 200) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.error("Unhandled error fetchTransactionsDetailsFromIds(): ", error);
    return [];
  }
}

async function fetchPeerInfo() {
  try {
    const response = await fetch(`${baseUrl}${apiRoutes.peerRoute}/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": String(baseUrl)
      }
    });
    const jsonResponse = await response.json();
    if (response.status === 200) {
      return jsonResponse
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
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": String(baseUrl)
      }
    });

    if (!response.ok || response.status !== 200) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const jsonResponse = await response.json();
    if (!jsonResponse || typeof jsonResponse == "undefined") {
      throw new Error("Empty Response");
    }

    const result = jsonResponse
    return result;
  } catch (error) {
    console.error("Unhandled error fetchBlockchainInfo(): ", error);
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
      await fetch(`${baseUrl}${apiRoutes.transactionsRoute}/total`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": String(baseUrl)
        }
      })
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

async function directSearch(pattern: string): Promise<{ identifier: string; source_table: string; } | never> {
  const response = await fetch(`${baseUrl}${apiRoutes.searchRoute}?pattern=${pattern}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": String(baseUrl)
    }
  });
  const retVal = await response.json();

  if ('error' in retVal) {
    throw new Error(retVal.error);
  }

  return retVal as { identifier: string; source_table: string };
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
  directSearch,
  fetchPaginatedBlocks,
  fetchPaginatedTransactions
};
