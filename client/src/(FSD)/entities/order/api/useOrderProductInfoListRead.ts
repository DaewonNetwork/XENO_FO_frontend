import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { OrderProductOptionRequestType } from "@/(FSD)/shareds/types/orders/OrderProductOptionRequest.type";
import { useQuery } from "@tanstack/react-query";

export const useOrderProductInfoListRead = (OrderProductOptionRequestList: OrderProductOptionRequestType[]) => {
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