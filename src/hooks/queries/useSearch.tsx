import { useQuery, useMutation } from "@tanstack/react-query";
import { searchId } from "../../constants/api-routes";

function useSearch(id: string) {
    return useMutation({
        mutationFn: searchId,
        mutationKey: ['search', id]
    })
}

export default useSearch