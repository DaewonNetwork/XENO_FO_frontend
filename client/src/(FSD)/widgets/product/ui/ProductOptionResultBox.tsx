import React from "react";
import { ProductOptionType } from "@/(FSD)/shareds/types/product/ProductOption.type";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import ProductOptionDeleteBtn from "@/(FSD)/features/product/ui/ProductOptionDeleteBtn";

interface ProductOptionResultBoxProps {
    productOption: ProductOptionType;
};

const ProductOptionResultBox = ({ productOption }: ProductOptionResultBoxProps) => {
    return (
        <div className={`bg-default-200 rounded-small ${styles.product_option_result_box}`}>
            <div className={styles.top_bar}>
                <TextSmallShared>{productOption.size}</TextSmallShared>
                <ProductOptionDeleteBtn productOptionId={productOption.productOptionId} />
            </div>
        </div>
    );
};

export default ProductOptionResultBox;