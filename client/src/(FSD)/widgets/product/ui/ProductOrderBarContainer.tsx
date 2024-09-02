"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import ProductOrderBar from "@/(FSD)/widgets/product/ui/ProductOrderBar";
import { useProductColorOrderBarRead } from "@/(FSD)/entities/product/api/useProductColorOrderBarRead";


 export interface OrderProductInfoType {
    productd: number;
    productOptionId: number;
    color: string;
    size: string;
    stock: number;
}

export interface ProductOrderBarType {
    like?: boolean;
    likeIndex?: number;
    orderInfo: OrderProductInfoType[]
    price: number;
}

const ProductOrderBarContainer = () => {
    const { productd } = useParams<{ productd: string }>();
    const { data, isError, error, isPending, refetch } = useProductColorOrderBarRead(Number(productd));
    
    const orderBar: ProductOrderBarType = data || { orderInfo: [] };

    


    useEffect(() => {
        console.log(orderBar);
        refetch();
    }, [productd, orderBar, refetch]);

    if(!data && !orderBar) return <></>


   
    return (
        <ProductOrderBar orderBar={orderBar} parentRefetch={refetch}/>
    );
};

export default ProductOrderBarContainer;