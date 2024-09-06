import { useMutation } from "@tanstack/react-query";

import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";


interface OrderCancelDTO {
    orderId: number;
    reason: string;
}


export const useOrderRefund = ({ onSuccess, onError }: MutationType) => {

    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (data:OrderCancelDTO) => {
            return fetchData({
                path: "/orders/request-refund",
                method: "PUT",
                body: data,
                isAuthRequired: true
            });
        },
        onSuccess: (data:any) => {
            console.log(data)
            onSuccess(data);
        },
        onError: () => {
            if (onError) {
                onError();
            }
        }
    });
};
