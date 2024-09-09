"use client";

import React, { useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import OrderDeliveryInfoBox from "./OrderDeliveryInfoBox";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { useOrderDeliveryInfoRead } from "@/(FSD)/entities/order/api/useOrderDeliveryInfoRead";
import { OrderDeliveryInfoType } from "@/(FSD)/shareds/types/orders/OrderDeliveryInfo.type";

const OrderDeliveryContainer = () => {    
    const { data } = useOrderDeliveryInfoRead();

    const orderDeliveryInfo: OrderDeliveryInfoType = data;

    useEffect(() => {}, [orderDeliveryInfo]);
    
    return (
        <div className={styles.order_delivery_container}>
            <AppContainer>
                <AppInner>
                    <OrderDeliveryInfoBox orderDeliveryInfo={orderDeliveryInfo} />
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default OrderDeliveryContainer;