import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductColorFirstImegeListRead = (productd: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_first_image_read", productd],
        queryFn: () => fetchData({
            path: `/product/color/readFirstImages?productd=${productd}`,
        }),
    });
};