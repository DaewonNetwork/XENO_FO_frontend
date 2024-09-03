"use client";

import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import ProductOptionResultBox from "./ProductOptionResultBox";
import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";

interface ProductOptionResultListProps { };

const ProductOptionResultList = ({ }: ProductOptionResultListProps) => {
    const productOptionListState = useRecoilValue(ProductOptionListState);

    useEffect(() => {}, [productOptionListState]);

    if(productOptionListState && !productOptionListState.length) return <></>;

    return (
        <div className={styles.product_option_result_list}>
            {
                productOptionListState.map(productOptionListState => (
                    <React.Fragment key={productOptionListState.productOptionId}>
                        <ProductOptionResultBox productOption={productOptionListState} />
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default React.memo(ProductOptionResultList);