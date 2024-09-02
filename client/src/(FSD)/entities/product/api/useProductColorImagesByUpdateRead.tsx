import useFetchData from "@/(FSD)/shareds/fetch/useFetchData";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProductColorImagesByUpdateRead = (productd: number) => {
  


    const fetchData = useFetchData();
    
    return useQuery({
        queryKey: ["product_color_images_by_update_read", productd],
        queryFn: () => fetchData({ 
            path: `/product/color/image/read?productd=${productd}`,
         
          }),
            
    });
};
