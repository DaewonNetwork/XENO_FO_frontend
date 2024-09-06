"use client";

import React from "react";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";

const ProductInfoBox = ({ product }: { product: ProductInfoType }) => {
    const calculateDiscountPercent = (price: number, priceSale: number): number => {
        return Math.round(((price - priceSale) / price) * 100);
    };

    const discountPercent = calculateDiscountPercent(product.price, product.priceSale);

    return (
        <div className={styles.product_info_box}>
            <AppContainer>
                <AppInner>
                    <div className={styles.left_box}>
                        <TextMediumShared className={styles.product_name_text} fontWeight={"semibold"}>{product.name}</TextMediumShared>
                        <div className={styles.product_price_text}>
                            <TextLargeShared>
                                <span className={"text-primary"}>{discountPercent}%</span>
                                {product.priceSale.toLocaleString()}원
                            </TextLargeShared>
                            <TextMediumShared className={"text-default-400"} fontWeight={"semibold"}>
                                {product.price.toLocaleString()}원
                            </TextMediumShared>
                        </div>
                    </div>
                    <div className={styles.right_box}>
                        <Button onClick={_ => {
                            if(!window) return;
                            navigator.clipboard.writeText(window.location.href);
                        }} size={"sm"} isIconOnly variant={"light"} endContent={<IconShared iconType={"share"} />} />
                    </div>
                </AppInner>
            </AppContainer>
        </div>
    );
};

export default ProductInfoBox;