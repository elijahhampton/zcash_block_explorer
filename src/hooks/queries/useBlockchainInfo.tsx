import { useQueries, useQuery } from "@tanstack/react-query";
import {
  fetchBlockCount,
  fetchBlockchainInfo,
  fetchTransactionCount,
} from "../../constants/api-routes";

export default () =>
  useQuery<any, any, {best_block_hash: string; best_height: string; orchard_pool_value: string; size_on_disk: string; total_chain_value: string;}>({
    queryKey: ["query_blockchain_info_key"],
    queryFn: fetchBlockchainInfo,
    refetchInterval: 1200000,
    initialData: {
      best_block_hash: "",
      best_height: "0",
      orchard_pool_value: "0",
      size_on_disk: "0",
      total_chain_value: "0"
    }
  });

export function useTotalTransactionCount() {
    return useQuery({
        queryKey: ["query_total_transactions_key"],
        queryFn: fetchTransactionCount
    })
}

export function useTotalBlockCount() {
    return useQuery({
        queryKey: ["query_total_blocks_key"],
        queryFn: fetchBlockCount
    })
}
