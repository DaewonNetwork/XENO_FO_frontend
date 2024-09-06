import React, { useEffect } from "react";
import { ProductOptionType } from "@/(FSD)/shareds/types/product/ProductOption.type";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import ProductOptionDeleteBtn from "@/(FSD)/features/product/ui/ProductOptionDeleteBtn";
import ProductOptionQuantityContoller from "@/(FSD)/features/product/ui/ProductOptionQuantityContoller";
import ProductOptionPriceItem from "@/(FSD)/entities/product/ui/ProductOptionPriceItem";

interface ProductOptionSelectedBoxProps {
    productOption: ProductOptionType;
};

const ProductOptionSelectedBox = ({ productOption }: ProductOptionSelectedBoxProps) => {
    useEffect(() => {}, [productOption]);

    return (
        <div className={`border-medium ${styles.product_option_selected_box}`}>
            <div className={styles.top_bar}>
                <TextSmallShared>{productOption.size}</TextSmallShared>
                <ProductOptionDeleteBtn productOptionId={productOption.productOptionId} />
            </div>
            <div className={styles.btm_bar}>
                <ProductOptionPriceItem productOption={productOption} />
                <ProductOptionQuantityContoller productOption={productOption} />
            </div>
        </div>
    );
};

export default ProductOptionSelectedBox;