import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";
import IconBtnShared from "@/(FSD)/shareds/ui/IconBtnShared";
import React from "react";
import { useSetRecoilState } from "recoil";

interface ProductOptionDeleteBtnProps {
    productOptionId: number;
}

const ProductOptionDeleteBtn = ({ productOptionId }: ProductOptionDeleteBtnProps) => {
    const setProductOptionListState = useSetRecoilState(ProductOptionListState);

    const handleDelete = () => {
        setProductOptionListState((prev) => prev.filter((item) => item.productOptionId !== productOptionId));
    };

    return <IconBtnShared onClick={handleDelete} iconProps={{ iconType: "close" }} />;
};

export default ProductOptionDeleteBtn;