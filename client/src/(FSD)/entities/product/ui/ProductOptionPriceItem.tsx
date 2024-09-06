"use client";

import { ProductOptionType } from "@/(FSD)/shareds/types/product/ProductOption.type";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import React from "react";

interface ProductOptionPriceItemProps {
    productOption: ProductOptionType;
}

const ProductOptionPriceItem = ({ productOption }: ProductOptionPriceItemProps) => {
    return <TextMediumShared fontWeight={"semibold"}>{ (productOption.price * productOption.quantity).toLocaleString() }원</TextMediumShared>;
}

export default ProductOptionPriceItem;