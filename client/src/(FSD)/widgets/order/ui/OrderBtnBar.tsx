"use client";

import React, { useEffect } from "react";
import AppInner from "../../app/ui/AppInner";
import OrderPaymentBtn from "@/(FSD)/features/order/ui/OrderPaymentBtn";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import { OrderProductOptionRequestListState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { useOrderProductInfoListRead } from "@/(FSD)/entities/order/api/useOrderProductInfoListRead";
import { OrderProductInfoReadType } from "@/(FSD)/shareds/types/orders/OrderProductInfoRead.type";

const OrderBtnBar = () => {
    const orderProductOptionRequestListState = useRecoilValue(OrderProductOptionRequestListState);

    const router = useRouter();

    useEffect(() => {
        if (!orderProductOptionRequestListState.length) {
            router.push("/");
        }
    }, [orderProductOptionRequestListState])

    const { data } = useOrderProductInfoListRead(orderProductOptionRequestListState);

    useEffect(() => { }, [data]);
    useEffect(() => { }, [orderProductOptionRequestListState]);

    if (!data) return <></>;

    const orderProductInfoList: OrderProductInfoReadType[] = data;

    return (
        <div className={styles.order_btn_bar}>
            <AppContainer>
                <AppInner>
                    <OrderPaymentBtn orderProductInfoList={orderProductInfoList} />
                </AppInner>
            </AppContainer>
        </div>
    );
};

export default OrderBtnBar;