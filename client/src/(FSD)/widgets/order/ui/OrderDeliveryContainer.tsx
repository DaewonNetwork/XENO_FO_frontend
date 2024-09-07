"use client";

import React, { useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import OrderDeliveryDefaultBox from "./OrderDeliveryDefaultBox";
import OrderDeliveryForm from "@/(FSD)/features/order/ui/OrderDeliveryForm";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { useRecoilValue } from "recoil";
import { IsViewOrderDeliveryFormState } from "@/(FSD)/shareds/stores/OrderProductAtom";

const OrderDeliveryContainer = () => {
    const isViewOrderDeliveryFormState = useRecoilValue(IsViewOrderDeliveryFormState);

    useEffect(() => {}, [isViewOrderDeliveryFormState]);
    
    return (
        <div className={styles.order_delivery_container}>
            <AppContainer>
                <AppInner>
                    <OrderDeliveryDefaultBox />
                    {isViewOrderDeliveryFormState && <OrderDeliveryForm />}
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default OrderDeliveryContainer;