import { fetchBlocks } from "../../constants/api-routes";
import { useQuery } from "@tanstack/react-query";
import { BlockData } from "../../types";
import { AxiosError } from "axios";
import { query_blocks_query_key } from "../../../query-client";

function useBlock() {
  return useQuery<any, AxiosError, Array<BlockData>>({
    queryKey: [query_blocks_query_key],
    queryFn: fetchBlocks,
    enabled: true,
    initialData: [],
    staleTime: 75000,
  });
}

export default useBlock;
