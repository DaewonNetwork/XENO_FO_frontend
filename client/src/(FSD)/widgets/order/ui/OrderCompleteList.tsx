"use client";

import React, { useEffect, useReducer, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { useRouter } from "next/navigation";
import OrderProductInfo from "@/(FSD)/entities/order/ui/OrderProductInfo";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import AppInner from "../../app/ui/AppInner";
import { OrderProductInfoType } from "@/(FSD)/shareds/types/orders/OrderProductInfotype";
import { OrderProductInfoListState, OrderProductOptionRequestListState } from "@/(FSD)/shareds/stores/OrderProductAtom";

const OrderCompleteList = () => {
    const [isOpen, handleOpen] = useReducer((state) => !state, true);
   
    const orderProductInfoList = useRecoilValue(OrderProductInfoListState);
    
    console.log(orderProductInfoList);

    return (
        <div className={`bg-background ${styles.order_product_info_list}`}>
            <AppInner>
                <div className={styles.list_header}>
                    <TextLargeShared>상품 정보</TextLargeShared>
                    <Button onClick={handleOpen} size={"sm"} isIconOnly variant={"light"}><IconShared iconType={isOpen ? "top" : "bottom"} /></Button>
                </div>
                <div className={styles.list_body} style={{ display: isOpen ? "block" : "none" }}>
                    {
                        orderProductInfoList.map((product) => (
                            <React.Fragment key={product.productOptionId}>
                                <OrderProductInfo orderProductInfoRead={product} />
                            </React.Fragment>
                        ))
                    }
                </div>
            </AppInner>
        </div>
    );
};

export default OrderCompleteList;