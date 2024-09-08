"use client";

import React, { useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { AppModalType } from "../../app/types/AppModal.type";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useParams, useRouter } from "next/navigation";
import { useProductColorOrderBarRead } from "@/(FSD)/entities/product/api/useProductColorOrderBarRead";
import ProductOptionSelectBox from "@/(FSD)/features/product/ui/ProductOptionSelectBox";
import { Button } from "@nextui-org/button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { OrderProductOptionRequestListState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";
import ProductOptionSelectedList from "./ProductOptionSelectedList";
import ProductOptionResultBox from "@/(FSD)/entities/product/ui/ProductOptionResultBox";
import { useCartListAdd } from "@/(FSD)/features/cart/api/useCartListAdd";

interface ProductOrderModalProps extends AppModalType { };

const ProductOrderModal = ({ isOpen, onOpenChange }: ProductOrderModalProps) => {
    const { productId } = useParams<{ productId: string }>();

    const { data } = useProductColorOrderBarRead(+productId);

    const [productOptionListState, setProductOptionListState] = useRecoilState(ProductOptionListState);

    const setOrderProductOptionRequestList = useSetRecoilState(OrderProductOptionRequestListState);

    const router = useRouter();

    const onSuccess = (data: any) => {
        router.push("/cart");
    };

    const { mutate } = useCartListAdd({ onSuccess });

    useEffect(() => {
        setProductOptionListState([]);
    }, [productId]);

    if (!data) return <></>;

    const orderInfoList: any[] = data.orderInfo;


    return (
        <Modal
            disableAnimation
            size={"2xl"}
            classNames={{
                base: `rounded-none rounded-t-medium ${styles.product_order_modal_base}`,
                wrapper: styles.product_order_modal_wrapper,
            }} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={styles.modal_header} onClick={onClose}>
                            <div className={`bg-default ${styles.bar_line}`}></div>
                        </ModalHeader>
                        <ModalBody className={styles.modal_body}>
                            <ProductOptionSelectBox orderInfoList={orderInfoList} price={data.price} productId={+productId} />
                            <ProductOptionSelectedList />
                            <ProductOptionResultBox />
                        </ModalBody>
                        <ModalFooter className={styles.modal_footer}>
                            <Button onClick={_ => {
                                mutate(productOptionListState.map(item => {
                                    return {
                                        productOptionId: item.productOptionId,
                                        quantity: item.quantity,
                                        price: item.price
                                    };
                                }));
                            }} radius={"sm"} variant={"ghost"} size={"lg"} fullWidth>장바구니</Button>
                            <Button onClick={_ => {
                                setOrderProductOptionRequestList(productOptionListState);

                                router.push("/order");
                            }} variant={"solid"} radius={"sm"} className={"bg-foreground text-background"} size={"lg"} fullWidth>구매하기</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default React.memo(ProductOrderModal);