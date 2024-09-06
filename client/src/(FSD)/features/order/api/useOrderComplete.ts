import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { OrderProductPaymentsRequest } from "@/(FSD)/shareds/types/orders/OrderProductPaymentsRequest.type";

export const useOrderComplete = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (orderId:number) => {
            return fetchData({
                path: "/orders/complete",
                method: "POST",
                body: orderId,
                isAuthRequired: true
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