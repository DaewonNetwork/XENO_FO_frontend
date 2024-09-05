'use client';

import { useOrderCancle } from '@/(FSD)/features/order/api/useOrderCancle';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React, { useState } from 'react';
import { useOrderRefund } from '../api/useOrderRefund';
import { useOrderComplete } from '../api/useOrderComplete';

interface CancelModalProps {
    orderId: number;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const OrderCompleteModal = ({
    orderId,
    isOpen,
    onOpenChange,
}: CancelModalProps) => {



    const onSuccess = (data: any) => {
        window.location.reload();
    };

    const { mutate } = useOrderComplete({ onSuccess });




    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">구매 확정</ModalHeader>
                        <ModalBody>


                            <div className="flex flex-col gap-1">구매 확정시 반품 및 교환 요청할 수 없어요. </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onClick={() => mutate(orderId)}>
                                구매 확정하기
                            </Button>
                            <Button color="danger" variant="light" onClick={onClose}>
                                닫기
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default OrderCompleteModal;
