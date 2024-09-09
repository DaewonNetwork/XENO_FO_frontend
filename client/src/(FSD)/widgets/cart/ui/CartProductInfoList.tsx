"use client";

import { useCartProductListRead } from "@/(FSD)/entities/cart/api/useCartProductListRead";
import { CartInfoType } from "@/(FSD)/shareds/types/CartInfo.type";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import React from "react";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import ProductCardList from "../../product/ui/ProductCardList";
import { ProductCardType } from "@/(FSD)/shareds/types/product/ProductCard.type";

const CartProductInfoList = () => {
    const { data } = useCartProductListRead();

    console.log(data);

    const cartInfoList: CartInfoType[] = data;

    const productCardList: ProductCardType[] = cartInfoList.map((cartInfo) => {
        return {
            productId: cartInfo.productId,
            productOptionId: cartInfo.productOptionId,
            name: cartInfo.productName,
            brandName: cartInfo.brandName,
            productImage: cartInfo.productImage,
            price: cartInfo.price,
            priceSale: 300,
            sale: cartInfo.sale,
            like: true
        }
    })

    if(!data) return <></>;
    
    return (
        <div className={styles.cart_product_info_list}>
            <AppContainer>
                <AppInner>
                    ㅁ
                    {/* <ProductCardList productList={} /> */}
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartProductInfoList;