import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query"

export const useReviewInfoListRead = (productd:number,pageIndex:number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["review_info_list_read"],
        queryFn: () => fetchData({ path: `/review/read/list?productd=${productd}&pageIndex=${pageIndex}&size=10` }),
    });
};