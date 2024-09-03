import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { ProductOptionInfoType } from "@/(FSD)/shareds/types/product/ProductOptionInfo.type";
import { useQuery } from "@tanstack/react-query";

export const useProductOptionIdsListRead = (productOptionInfo: ProductOptionInfoType[]) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["use_product_option_ids_list_read"],
        queryFn: () => fetchData({
            path: `/product/option/ids/read?productOptionInfo=${productOptionInfo}`,
            isNotAuthRequired: true,
        }),
    });
};