import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { ProductOptionType } from "@/(FSD)/shareds/types/product/ProductOption.type";
import { useQuery } from "@tanstack/react-query";

export const useOrderProductInfoListRead = (OrderProductOptionRequestList: ProductOptionType[]) => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["order_product_info_list_read", OrderProductOptionRequestList],
        queryFn: () => {
            return fetchData({
                method: "POST",
                path: "/product/option/ids/read",
                isAuthRequired: true,
                body: OrderProductOptionRequestList
            });
        },
    });
};