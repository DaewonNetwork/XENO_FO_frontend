import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductColorSizeStockRead = (productd: number) => {
   
    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_color_size_stock_read", productd],
        queryFn: () => fetchData({ 
            path: `/product/color/size/read?productd=${productd}`,
          }),
            
    });
};
