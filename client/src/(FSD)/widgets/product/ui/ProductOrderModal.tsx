"use client";

import styles from "@/(FSD)/shareds/styles/ProductStyle.module.scss";
import { AppModalType } from "../../app/types/AppModal.type";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { useParams } from "next/navigation";
import { useProductColorOrderBarRead } from "@/(FSD)/entities/product/api/useProductColorOrderBarRead";
import { Select, SelectItem } from "@nextui-org/select";
import LinkBtnShared from "@/(FSD)/shareds/ui/LinkBtnShared";

interface ProductOrderModalProps extends AppModalType { };

const ProductOrderModal = ({ isOpen, onOpenChange }: ProductOrderModalProps) => {
    const { productId } = useParams<{ productId: string }>();

    const { data, isError, isPending } = useProductColorOrderBarRead(+productId);

    if (!data) return <></>;

    const orderInfoList: any[] = data.orderInfo;

    console.log(orderInfoList);
    

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
                            <Select radius={"sm"} size={"md"} placeholder={"옵션을 선택 해주세요."}>
                                {
                                    orderInfoList.map((option, index) => (
                                        <SelectItem key={index}>{option.size}</SelectItem>
                                    ))
                                }
                            </Select>
                        </ModalBody>
                        <ModalFooter className={styles.modal_footer}>
                            <LinkBtnShared href={"/order"} radius={"sm"} variant={"ghost"} size={"lg"} fullWidth>장바구니</LinkBtnShared>
                            <LinkBtnShared href={"/order"} variant={"solid"} radius={"sm"} className={"bg-foreground text-background"} size={"lg"} fullWidth>구매하기</LinkBtnShared>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ProductOrderModal;