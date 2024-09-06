"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductColorRead } from "../../../entities/product/api/useProductColorRead";
import { ProductInfoType } from "@/(FSD)/shareds/types/product/ProductInfo.type";
import ProductImageSlideList from "@/(FSD)/widgets/product/ui/ProductImageSlideList";
import { useSetRecoilState } from "recoil";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import AppContainer from "../../app/ui/AppContainer";
import AppInner from "../../app/ui/AppInner";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { nameState } from "@/(FSD)/shareds/stores/ProductAtom";
import ProductInfoBox from "./ProductInfoBox";
import ProductDetailImage from "./ProductDetailImage";
import ReviewInfoList from "../../review/ui/ReviewInfoList";

const ProductInfoContainer = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data, isError, error, isPending, refetch } = useProductColorRead(+productId);

    const setName = useSetRecoilState(nameState);

    const productInfo: ProductInfoType = data;

    useEffect(() => {
        refetch();
    }, [productId, data, refetch]);

    if (!productInfo) return <></>;

    setName(productInfo.name);

    return (
        <div className={styles.product_info_container}>
            <ProductImageSlideList productImageList={productInfo.productImages} />
            <div className={`border-b ${styles.product_brand_box}`}>
                <AppContainer>
                    <AppInner>
                        <div className={styles.left_box}>
                            <TextSmallShared fontWeight={"semibold"}>{productInfo.brandName}</TextSmallShared>
                        </div>
                        <div className={styles.right_box}>
                            <Button size={"sm"} isIconOnly variant={"light"} endContent={<IconShared iconType={"right"} />} />
                        </div>
                    </AppInner>
                </AppContainer>
            </div>
            <ProductInfoBox product={productInfo} />
            <ProductDetailImage productDetailImage={productInfo.productDetailImage} />
            <ReviewInfoList productId={productId} />
        </div>
    );
};

export default ProductInfoContainer;