import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorOrderBarRead = (productd: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_order_bar_read", productd],
        queryFn: () => fetchData({
            path: `/product/color/readOrderBar?productd=${productd}`,
            isAuthRequired: true,
        }),
    });
};