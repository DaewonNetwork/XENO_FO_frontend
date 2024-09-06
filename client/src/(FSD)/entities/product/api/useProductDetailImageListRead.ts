import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductDetailImageListRead = (productId: number, size: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_detail_image_list_read", productId],
        queryFn: () => fetchData({
            path: `/product/color/readImages?productId=${productId}`,
            isNotAuthRequired: true
        }),
    });
};