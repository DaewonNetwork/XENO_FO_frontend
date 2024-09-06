'use client';

import { useOrderCancle } from '@/(FSD)/features/order/api/useOrderCancle';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React, { useState } from 'react';
import { useOrderRefund } from '../api/useOrderRefund';

interface CancelModalProps {
    orderId: number;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const OrderRefundRequestModal = ({
    orderId,
    isOpen,
    onOpenChange,
}: CancelModalProps) => {
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const onSuccess = (data: any) => {
        // 성공적으로 처리된 후 실행할 로직을 여기에 추가
        console.log('Order cancelled successfully:', data);
        window.location.reload(); // 페이지 새로 고침
        onOpenChange(false); // 모달 닫기
    };

    const { mutate } = useOrderRefund({ onSuccess });


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지

        setIsSubmitting(true); // 제출 중 상태 설정
        console.log(orderId)
        const requestData = { orderId, reason };
        console.log(requestData)
        try {
            // 요청 본문에 JSON 형태로 데이터를 포함
            await mutate(requestData);
        } catch (error) {
            console.error('Failed to cancel order:', error);
            // 오류 처리 로직 추가
        } finally {
            setIsSubmitting(false); // 제출 완료 상태로 복구
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">환불 요청</ModalHeader>
                        <ModalBody>

                            <label htmlFor="reason">환불 사유를 적어 주세요.</label>
                            <textarea
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                maxLength={100}
                                placeholder="100자 까지 적을 수 있어요."
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type='submit'
                                color="primary" variant="light"
                                onClick={onSubmit}
                                disabled={isSubmitting} // 제출 중일 때 버튼 비활성화
                            >
                                {isSubmitting ? '신청 중...' : '환불 신청하기'}
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

export default OrderRefundRequestModal;
