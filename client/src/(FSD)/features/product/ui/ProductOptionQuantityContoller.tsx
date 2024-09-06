"use client";

import React, { useState } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";
import { ProductOptionType } from "@/(FSD)/shareds/types/product/ProductOption.type";
import { useSetRecoilState } from "recoil";
import IconBtnShared from "@/(FSD)/shareds/ui/IconBtnShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";

interface ProductOptionQuantityContollerProps {
    productOption: ProductOptionType;
}

const ProductOptionQuantityContoller = ({ productOption }: ProductOptionQuantityContollerProps) => {
    const setProductOptionListState = useSetRecoilState(ProductOptionListState);
    
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = async (type: "plus" | "minus") => {
        let newQuantity = quantity;
    
        if (type === "plus") {
            newQuantity = quantity + 1;
        } else if (type === "minus" && quantity > 1) {
            newQuantity = quantity - 1;
        }
    
        setQuantity(newQuantity);
    
        setProductOptionListState((prev) => prev.map((item) => item.productOptionId === productOption.productOptionId ? { ...item, quantity: newQuantity } : item));
    };

    return (
        <div className={styles.product_option_quantity_contoller}>
            <IconBtnShared onClick={_ => {
                handleQuantityChange("minus");
            }} radius={"full"} variant={"bordered"} iconProps={{ iconType: "minus" }} />
            <TextSmallShared>{quantity}</TextSmallShared>
            <IconBtnShared onClick={_ => {
                handleQuantityChange("plus");
            }} radius={"full"} variant={"bordered"} iconProps={{ iconType: "plus" }} />
        </div>
    );
};

export default ProductOptionQuantityContoller;