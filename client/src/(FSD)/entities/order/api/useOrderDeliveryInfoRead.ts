import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useOrderDeliveryInfoRead = () => {
    const fetchData = useFetchData();

    return useQuery({
        queryKey: ["order_delivery_info_read"],
        queryFn: () => fetchData({ path: "/orders/delivery/info/read", isAuthRequired: true }),
    });
};