'use client'

import { fetchTrackingData } from '@/(FSD)/features/order/api/useOrderTracking';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import React, { useEffect, useState } from 'react';

interface ShippingModalProps {
    trackingNumber: string;
    carrierId: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const OrderShippingModal = ({
    trackingNumber,
    carrierId,
    isOpen,
    onOpenChange,
}: ShippingModalProps) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen || !data) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {

                    const result = await fetchTrackingData(
                        carrierId,
                        trackingNumber,
                    );
                    setData(result);
                } catch (err) {
                    setError('Failed to fetch tracking data');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();

        }
    }, [isOpen, carrierId, trackingNumber]);

    const track = data?.data?.track; // 데이터 경로 확인
    const events = track?.events?.edges || [];
    const lastEvent = track?.lastEvent;

    console.log('Track:', track); // track 데이터 확인
    console.log('Events:', events); // events 데이터 확인
    console.log('Last Event:', lastEvent); // lastEvent 데이터 확인

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">배송 내역</ModalHeader>
                        <ModalBody>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                            {events.length > 0 ? (
                                <div>
                                    {events.map((event: any, index: number) => {
                                        // 마지막 이벤트를 결정
                                        const isLastEvent = index === events.length - 1;
                                        // 이벤트 수에 따라 스타일을 다르게 적용
                                        const textColorClass = events.length > 1 && !isLastEvent ? 'text-gray-500' : 'text-black';
                                        return (
                                            <div
                                                key={index}
                                                className={`mb-4 ${textColorClass}`} // 스타일 적용
                                            >
                                                <h4 className="text-md font-medium">
                                                    {new Date(event.node.time).toLocaleString()}
                                                </h4>
                                                <p>{event.node.description}</p>
                                                <p>배송 상태: {event.node.status.name}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p>배송 준비 중입니다.</p>
                            )}

                        </ModalBody>
                        <ModalFooter>
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

export default OrderShippingModal;
