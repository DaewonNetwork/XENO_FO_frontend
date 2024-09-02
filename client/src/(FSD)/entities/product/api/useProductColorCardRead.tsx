import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorCardRead = (productd: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_card_read", productd],
        queryFn: () => fetchData({
            path: `/product/color/read/info?productd=${productd}`,
        }),
    });
};