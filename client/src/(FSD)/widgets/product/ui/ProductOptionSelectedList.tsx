"use client";

import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";
import ProductOptionSelectedBox from "./ProductOptionSelectedBox";

interface ProductOptionSelectedListProps { };

const ProductOptionSelectedList = ({ }: ProductOptionSelectedListProps) => {
    const productOptionListState = useRecoilValue(ProductOptionListState);

    useEffect(() => {}, [productOptionListState]);

    if(productOptionListState && !productOptionListState.length) return <></>;

    return (
        <div className={styles.product_option_selected_list}>
            {
                productOptionListState.map(productOptionListState => (
                    <React.Fragment key={productOptionListState.productOptionId}>
                        <ProductOptionSelectedBox productOption={productOptionListState} />
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default React.memo(ProductOptionSelectedList);