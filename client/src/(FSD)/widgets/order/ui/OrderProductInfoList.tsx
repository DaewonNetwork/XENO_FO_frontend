"use client";

import React, { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import AppInner from "../../app/ui/AppInner";
import { useRecoilValue } from "recoil";
import { OrderProductListState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { useProductOptionIdsListRead } from "@/(FSD)/entities/product/api/useProductOptionIdsListRead";

const OrderProductInfoList = () => {
    const orderProductListState = useRecoilValue(OrderProductListState);

    const [isOpen, handleOpen] = useReducer((state) => !state, true);

    const router = useRouter();

    const { data } = useProductOptionIdsListRead(orderProductListState);
    

    return (
        <div className={`bg-background ${styles.order_product_info_list}`}>
            <AppInner>
                <div className={styles.list_header}>
                    <TextLargeShared>상품 정보</TextLargeShared>
                    <Button onClick={handleOpen} size={"sm"} isIconOnly variant={"light"}><IconShared iconType={isOpen ? "top" : "bottom"} /></Button>
                </div>
                <div className={styles.list_body} style={{ display: isOpen ? "block" : "none" }}>
                    {/* {
                        newProducts.map((product) => (
                            <React.Fragment key={product.productOptionId}>
                                <OrderProductInfo product={product} />
                            </React.Fragment>
                        ))
                    } */}
                </div>
            </AppInner>
        </div>
    );
};

export default React.memo(OrderProductInfoList);
