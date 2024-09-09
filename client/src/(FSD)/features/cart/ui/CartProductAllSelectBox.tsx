import React from "react";
import styles from "@/(FSD)/shareds/styles/CartStyle.module.scss";
import { Button } from "@nextui-org/button";
import AppContainer from "@/(FSD)/widgets/app/ui/AppContainer";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import { Checkbox } from "@nextui-org/checkbox";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";

const CartProductAllSelectBox = () => {
    return (
        <div className={styles.cart_product_all_select_box}>
            <AppContainer>
                <AppInner>
                    <div className={styles.box_inner}>
                        <div className={styles.left_item}>
                            <Checkbox id={"cart_product_all_select_btn"} disableAnimation radius={"sm"}>
                                <TextSmallShared fontWeight={"semibold"}>전체 선택</TextSmallShared>
                            </Checkbox>
                        </div>
                        <div className={styles.right_item}>
                            <Button size={"sm"} variant={"light"}><TextSmallShared className={"text-foreground-500"} fontWeight={"normal"}>선택 삭제</TextSmallShared></Button>
                        </div>
                    </div>
                </AppInner>
            </AppContainer>
        </div>
    )
}

export default CartProductAllSelectBox;