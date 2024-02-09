import { useQuery } from "@tanstack/react-query";
import { fetchPaginatedBlocks, fetchPaginatedTransactions } from "../../constants/api-routes";
import { openSnackbar, useSnackbarManager } from "../../utility/snackbar_manager";
import { BlockData, HookError, PaginationParameters, TransactionData } from "../../types";
import { AxiosError } from "axios";

function usePaginatedBlocks(paginationParameters: PaginationParameters) {
    const { snackbarConfig, closeSnackbar } = useSnackbarManager()
    
    return useQuery<Array<BlockData>, HookError, Array<BlockData>>({
        queryKey: ['use_paginated_blocks'],
        queryFn: () => fetchPaginatedBlocks(paginationParameters),
        onError(err) {
            openSnackbar(snackbarConfig)
        },
    })
}

function usePaginatedTransactions(paginationParameters: PaginationParameters) {
    const { snackbarConfig, closeSnackbar } = useSnackbarManager()
    
    return useQuery<Array<TransactionData>, HookError, Array<TransactionData>>({
        queryKey: ['use_paginated_transactions'],
        queryFn: () => fetchPaginatedTransactions(paginationParameters),
        onError(err) {
            openSnackbar(snackbarConfig)
        },
    })
}

export { usePaginatedBlocks, usePaginatedTransactions }


