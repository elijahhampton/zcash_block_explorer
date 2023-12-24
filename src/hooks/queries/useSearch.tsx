import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { directSearch } from '../../constants/api-routes'
import { openSnackbar } from '../../utility/snackbar_manager'

function useSearch() {}

function useTableSearch(pattern: string) {
    const useMutationresults = useMutation({
        mutationFn: () => directSearch(pattern),
        mutationKey: ['use_table_search', pattern]
    });

    const {error, isError} = useMutationresults
    useEffect(() => {
        if (isError && error instanceof Error) {
            openSnackbar({
                message: error.message,
                variant: 'error',
                duration: 3000,
            });
        }
    }, [isError, error]);

    return useMutationresults
}

export { useTableSearch }
export default useSearch