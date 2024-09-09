"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { Button } from "@nextui-org/button";
import AppContainer from "@/(FSD)/widgets/app/ui/AppContainer";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import { Checkbox } from "@nextui-org/checkbox";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { CartListState } from "@/(FSD)/shareds/stores/CartAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCartListDelete } from "../api/useCartListDelete";
import { useQueryClient } from "@tanstack/react-query";

const CartProductAllSelectBox = () => {
    const [cartListState, setCartListState] = useRecoilState(CartListState);

    const queryClient = useQueryClient();

    const onSuccess = (data: any) => {
        queryClient.refetchQueries({ queryKey: ["cart_product_list_read"] });
    };

    const { mutate } = useCartListDelete({ onSuccess });

    return (
        <div className={styles.cart_product_all_select_box}>
            <AppContainer>
                <AppInner>
                    <div className={styles.box_inner}>
                        <div className={styles.left_item}>
                            <Checkbox onValueChange={e => {
                                setCartListState(cartInfoList => {
                                    return cartInfoList.map(cartInfo => {
                                        return {
                                            ...cartInfo,
                                            isSelected: e
                                        };
                                    });
                                })
                            }} id={"cart_product_all_select_btn"} disableAnimation radius={"sm"}>
                                <TextSmallShared fontWeight={"semibold"}>전체 선택</TextSmallShared>
                            </Checkbox>
                        </div>
                        <div className={styles.right_item}>
                            <Button onClick={_ => {
                                cartListState.filter(cartInfo => cartInfo.isSelected).map(cartInfo => {
                                    mutate(cartInfo.cartId);
                                });
                            }} size={"sm"} variant={"light"}><TextSmallShared className={"text-foreground-500"} fontWeight={"normal"}>선택 삭제</TextSmallShared></Button>
                        </div>
                    </div>
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartProductAllSelectBox;