import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { UserDeliveryRequestType } from "@/(FSD)/shareds/types/user/UserDeliveryRequest.type";

export const useUserDeliveryUpdate = ({ onSuccess, onError }: MutationType) => {
    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (userDeliveryRequest: UserDeliveryRequestType) => {
            return fetchData({
                path: "/user/update",
                method: "PUT",
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