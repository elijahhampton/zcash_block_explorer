import {fetchBlocks} from '../../constants/api-routes';
import { useQuery } from '@tanstack/react-query'

function useBlock() {
    return useQuery({
        queryKey: ['query_blocks'],
        queryFn: fetchBlocks,
        enabled: true,
        initialData: [],
     })
};

export default useBlock;