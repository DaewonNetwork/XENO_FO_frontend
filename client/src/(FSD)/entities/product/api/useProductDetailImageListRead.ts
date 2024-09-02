import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductDetailImageListRead = (productd: number, size: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_detail_image_list_read", productd],
        queryFn: () => fetchData({
            path: `/product/color/readImages?productd=${productd}`,
            isNotAuthRequired: true
        }),
    });
};