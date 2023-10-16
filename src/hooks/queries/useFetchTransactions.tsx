import {fetchTransactions} from '../../constants/api-routes';
import { useQuery } from '@tanstack/react-query'

function useFetchTransactions() {
    return useQuery({
        queryKey: ['query_transactions'],
        queryFn: fetchTransactions,
        enabled: true,
        initialData: [],
     })
};

export default useFetchTransactions;