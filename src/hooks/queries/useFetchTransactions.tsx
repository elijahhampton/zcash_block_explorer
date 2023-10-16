import { fetchTransactions } from "../../constants/api-routes";
import { useQuery } from "@tanstack/react-query";
import { TransactionData } from "../../types";
import { AxiosError } from "axios";
import { query_transactions_query_key } from "../../../query-client";

function useFetchTransactions() {
  return useQuery<unknown, AxiosError, Array<TransactionData>>({
    queryKey: [query_transactions_query_key],
    queryFn: fetchTransactions,
    enabled: true,
    initialData: [],
    staleTime: 75000,
  });
}

export default useFetchTransactions;
