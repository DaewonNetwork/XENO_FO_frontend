import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { useQuery } from "@tanstack/react-query";

export const useProductRead = (productd: number) => {
   
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_read", productd],
        queryFn: () => fetchData({ 
            path: `/product/read?productd=${productd}`,
          }),
            
    });
};
