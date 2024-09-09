"use client";

import React, { useEffect } from "react";
import { AppModalType } from "../../app/types/AppModal.type";
import { useParams, useRouter } from "next/navigation";
import { useProductColorOrderBarRead } from "@/(FSD)/entities/product/api/useProductColorOrderBarRead";
import ProductOptionSelectBox from "@/(FSD)/features/product/ui/ProductOptionSelectBox";
import { useRecoilState, useSetRecoilState } from "recoil";
import { OrderProductOptionRequestListState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";
import ProductOptionSelectedList from "./ProductOptionSelectedList";
import ProductOptionResultBox from "@/(FSD)/entities/product/ui/ProductOptionResultBox";
import { useCartListAdd } from "@/(FSD)/features/cart/api/useCartListAdd";
import AppPromptModal from "../../app/ui/AppPromptModal";
import { useQueryClient } from "@tanstack/react-query";

interface ProductOrderModalProps extends AppModalType { };

const ProductOrderModal = ({ isOpen, onOpenChange }: ProductOrderModalProps) => {
    const { productId } = useParams<{ productId: string }>();

    const { data } = useProductColorOrderBarRead(+productId);

    const [productOptionListState, setProductOptionListState] = useRecoilState(ProductOptionListState);

    const setOrderProductOptionRequestList = useSetRecoilState(OrderProductOptionRequestListState);

    const router = useRouter();

    const queryClient = useQueryClient();

    const onSuccess = (data: any) => {
        queryClient.refetchQueries({ queryKey: ["cart_product_list_read"] });
        
        router.push("/cart");
    };

    const { mutate } = useCartListAdd({ onSuccess });

    useEffect(() => {
        setProductOptionListState([]);
    }, [productId]);

    if (!data) return <></>;

    const orderInfoList: any[] = data.orderInfo;

    const onCartBtnAction = () => {
        mutate(productOptionListState.map(item => {
            return {
                productOptionId: item.productOptionId,
                quantity: item.quantity,
                price: item.price
            };
        }));
    }

    const onOrderBtnAction = () => {
        setOrderProductOptionRequestList(productOptionListState);

        router.push("/order");
    }

    return (
        <AppPromptModal actionButtonProps={{ text: "구매하기", onAction: onOrderBtnAction }} subButtonProps={{ text: "장바구니", onAction: onCartBtnAction }} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ProductOptionSelectBox orderInfoList={orderInfoList} price={data.price} productId={+productId} />
            <ProductOptionSelectedList />
            <ProductOptionResultBox />
        </AppPromptModal>
    );
};

export default React.memo(ProductOrderModal);