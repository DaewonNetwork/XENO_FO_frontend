import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductDetailImageListRead = (productColorId: number, size: number) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["product_detail_image_list_read", productColorId],
        queryFn: () => fetchData({
            path: `/product/color/readImages?productColorId=${productColorId}`,
            isNotAuthRequired: true
        }),
    });
};