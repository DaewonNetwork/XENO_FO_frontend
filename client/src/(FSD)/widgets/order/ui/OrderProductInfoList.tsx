"use client";

import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import AppInner from "../../app/ui/AppInner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OrderProductInfoListState, OrderProductOptionRequestListState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { useOrderProductInfoListRead } from "@/(FSD)/entities/order/api/useOrderProductInfoListRead";
import { OrderProductInfoReadType } from "@/(FSD)/shareds/types/orders/OrderProductInfoRead.type";
import OrderProductInfo from "@/(FSD)/entities/order/ui/OrderProductInfo";

const OrderProductInfoList = () => {
    const orderProductOptionRequestListState = useRecoilValue(OrderProductOptionRequestListState);
    const setOrderPrdouctInfoListState = useSetRecoilState(OrderProductInfoListState)

    const [isOpen, handleOpen] = useReducer((state) => !state, true);

    const router = useRouter();

    useEffect(() => {
        if (!orderProductOptionRequestListState.length) {
            router.push("/");
        }
    }, [orderProductOptionRequestListState]);

    const { data } = useOrderProductInfoListRead(orderProductOptionRequestListState);

    useEffect(() => { }, [data]);

    useEffect(() => { }, [orderProductOptionRequestListState]);

    if (!data) return <></>;

    const orderProductInfoList: OrderProductInfoReadType[] = data;
    setOrderPrdouctInfoListState(orderProductInfoList)
    return (
        <div className={`bg-background ${styles.order_product_info_list}`}>
            <AppInner>
                <div className={styles.list_header}>
                    <TextLargeShared>상품 정보</TextLargeShared>
                    <Button onClick={handleOpen} size={"sm"} isIconOnly variant={"light"}><IconShared iconType={isOpen ? "top" : "bottom"} /></Button>
                </div>
                <div className={styles.list_body} style={{ display: isOpen ? "block" : "none" }}>
                    {
                        orderProductInfoList.map(orderProductInfo => (
                            <React.Fragment key={orderProductInfo.productOptionId}>
                                <OrderProductInfo orderProductInfoRead={orderProductInfo} />
                            </React.Fragment>
                        ))
                    }
                </div>
            </AppInner>
        </div>
    );
};

export default React.memo(OrderProductInfoList);