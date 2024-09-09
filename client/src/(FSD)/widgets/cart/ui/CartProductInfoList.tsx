"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import CartProductInfo from "./CartProductInfo";
import { useRecoilValue } from "recoil";
import { CartListState } from "@/(FSD)/shareds/stores/CartAtom";

const CartProductInfoList = () => {
    const cartListState = useRecoilValue(CartListState);

    if(!cartListState) return <></>;

    return (
        <div className={styles.cart_product_info_list}>
            <AppContainer>
                <AppInner>
                    {
                        cartListState.map((cartInfo) => (
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