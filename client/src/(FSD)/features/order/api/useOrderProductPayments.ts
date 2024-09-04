import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { OrderProductPaymentsRequest } from "@/(FSD)/shareds/types/orders/OrderProductPaymentsRequest.type";

export const useOrderProductPayments = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (orderProductPaymentsRequestList: OrderProductPaymentsRequest[]) => {
            return fetchData({
                path: "/orders",
                method: "POST",
                body: orderProductPaymentsRequestList,
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