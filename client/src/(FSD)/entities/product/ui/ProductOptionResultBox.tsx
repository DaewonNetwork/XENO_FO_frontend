import React, { useEffect } from "react";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";
import { useRecoilValue } from "recoil";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";

interface ProductOptionSelecResultBoxProps {}

const ProductOptionResultBox = ({  } : ProductOptionSelecResultBoxProps) => {
    const productOptionListState = useRecoilValue(ProductOptionListState);

    useEffect(() => {}, [productOptionListState]);

    if(!productOptionListState || !productOptionListState.length) return <></>;

    const quantity = productOptionListState.reduce((total, product) => total + product.quantity, 0);
    const price = productOptionListState.reduce((total, product) => total + (product.price * product.quantity), 0);


    return (
        <div className={styles.product_option_result_box}>
            <TextSmallShared fontWeight={"semibold"}>{quantity.toLocaleString()}개 선택</TextSmallShared>
            <TextSmallShared fontWeight={"semibold"}>{price.toLocaleString()}원</TextSmallShared>
        </div>
    );
};

export default ProductOptionResultBox;