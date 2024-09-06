"use client";

import React from "react";
import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { AppModalType } from "../../app/types/AppModal.type";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useParams, useRouter } from "next/navigation";
import { useProductColorOrderBarRead } from "@/(FSD)/entities/product/api/useProductColorOrderBarRead";
import ProductOptionSelectBox from "@/(FSD)/features/product/ui/ProductOptionSelectBox";
import ProductOptionResultList from "./ProductOptionResultList";
import { Button } from "@nextui-org/button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CartProductListState } from "@/(FSD)/shareds/stores/CartProductAtom";
import { OrderProductOptionRequestListState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { ProductOptionListState } from "@/(FSD)/shareds/stores/ProductDetailAtom";

interface ProductOrderModalProps extends AppModalType { };

const ProductOrderModal = ({ isOpen, onOpenChange }: ProductOrderModalProps) => {
    const { productId } = useParams<{ productId: string }>();

    const { data, isError, isPending } = useProductColorOrderBarRead(+productId);    

    const productOptionListState = useRecoilValue(ProductOptionListState);

    const setCartProductListState = useSetRecoilState(CartProductListState);
    const setOrderProductOptionRequestList = useSetRecoilState(OrderProductOptionRequestListState);

    const router = useRouter();

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
                            <ProductOptionResultList />
                        </ModalBody>
                        <ModalFooter className={styles.modal_footer}>
                            <Button onClick={_ => {
                                // setCartProductListState((prev) => [...prev, ...productOptionListState]);
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