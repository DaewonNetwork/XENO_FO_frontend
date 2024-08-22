import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";
import { ProdcutRankType } from "../type/ProdcutRank.type";

export const useProductRankListRead = ({ type = "상의" }: ProdcutRankType) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_rank_list_read", type],
        queryFn: () => fetchData({
            path: `/product/rank/${type}`,
            isNotAuthRequired: true,
        }),
    });
};