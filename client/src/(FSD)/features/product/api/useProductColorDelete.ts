import { useMutation } from "@tanstack/react-query";
import { MutationType } from "../../types/mutation.type";
import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";


export const useProductColorDelete = ({ onSuccess, onError }: MutationType) => {

    const fetchData = useFetchData();

    return useMutation({
        mutationFn: (productd: number) => {
            return fetchData({ path: `/product/color/delete?productId=${productd}`,method:"DELETE", isAuthRequired: true })
        },
        onSuccess: (data: any) => {
            onSuccess(data);
        },
        onError: _ => {
            if (onError) {
                onError();
            }
        }
    });
};