"use client";

import React from "react";
import { useCartProductListRead } from "@/(FSD)/entities/cart/api/useCartProductListRead";
import { CartInfoType } from "@/(FSD)/shareds/types/CartInfo.type";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import CartProductInfo from "./CartProductInfo";

const CartProductInfoList = () => {
    const { data } = useCartProductListRead();

    const cartInfoList: CartInfoType[] = data;

    if (!data) return <></>;

    return (
        <div className={styles.cart_product_info_list}>
            <AppContainer>
                <AppInner>
                    {
                        cartInfoList.map((cartInfo) => (
                            <React.Fragment key={cartInfo.cartId}>
                                <CartProductInfo cartInfo={cartInfo} />
                            </React.Fragment>
                        ))
                    }
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartProductInfoList;