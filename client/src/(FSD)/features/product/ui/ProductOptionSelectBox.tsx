"use client";

import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";
import { ProductOptionType } from "@/(FSD)/shareds/types/product/ProductOption.type";
import { Select, SelectItem } from "@nextui-org/select";
import React from "react";
import { useSetRecoilState } from "recoil";

interface ProductOptionSelectBoxProps {
    orderInfoList: any[];
    productId: number;
    price: number
}

const ProductOptionSelectBox = ({ orderInfoList, price, productId }: ProductOptionSelectBoxProps) => {
    const setProductOptionListState = useSetRecoilState(ProductOptionListState);

    const handleClick = (option: any) => {
        const add_option: ProductOptionType = {
            productId: productId,
            productOptionId: option.productOptionId,
            quantity: 1,
            size: option.size,
            price: price
        };

        setProductOptionListState((prev) => {
            const existingOptions = new Set(prev.map(item => `${item.productId}-${item.productOptionId}`));
            const optionKey = `${add_option.productId}-${add_option.productOptionId}`;
            
            if (!existingOptions.has(optionKey)) {
                return [...prev, add_option];
            };
            
            return prev;
        });
    };

    return (
        <Select
            aria-label={"product_option_select"}
            radius={"sm"} size={"lg"} placeholder={"옵션을 선택 해주세요."}>
            {
                orderInfoList.map((option, index) => (
                    <SelectItem
                        onClick={_ => {
                            handleClick(option);
                        }}
                        aria-label={option.size} key={index}>{option.size}</SelectItem>
                ))
            }
        </Select>
    );
};

export default React.memo(ProductOptionSelectBox);