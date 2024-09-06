import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { OrderDeliveryCreateRequestType } from "@/(FSD)/shareds/types/orders/OrderDeliveryCreateRequest.type";

export const useOrderDeliveryCreate = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (userDeliveryRequest: OrderDeliveryCreateRequestType) => {
            return fetchData({
                path: "/orders/delivery",
                method: "POST",
                isAuthRequired: true,
                body: userDeliveryRequest
            });
        },
        onSuccess: (data: any) => {
            onSuccess(data);
        },
        onError: () => {
            if (onError) {
                onError();
            }
        }
    });
};