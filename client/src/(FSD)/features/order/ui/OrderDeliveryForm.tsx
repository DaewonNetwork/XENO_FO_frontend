"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import AppPostcodeModal from "@/(FSD)/widgets/app/ui/AppPostcodeModal";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";
import { useOrderDeliveryCreate } from "../api/useOrderDeliveryCreate";
import { OrderDeliveryCreateRequestType } from "@/(FSD)/shareds/types/orders/OrderDeliveryCreateRequest.type";
import { Button } from "@nextui-org/button";
import AppLoadingModal from "@/(FSD)/widgets/app/ui/AppLoadingModal";
import AppConfirmModal from "@/(FSD)/widgets/app/ui/AppConfirmModal";
import { useRouter } from "next/navigation";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import AppAlertModal from "@/(FSD)/widgets/app/ui/AppAlertModal";
import { useQueryClient } from "@tanstack/react-query";

const OrderDeliveryForm = () => {
    const addressRegex = /^.{1,50}$/;
    const phoneNumberRegex = /^\d{11,15}$/;

    const schema = z.object({
        detailAddress: z.string().regex(addressRegex, {
            message: "알맞은 주소를 입력해주세요."
        }),
        phoneNumber: z.string().regex(phoneNumberRegex, {
            message: "알맞은 전화번호를 입력해주세요."
        }),
    });

    const [address, setAddress] = useState<string>();

    const router = useRouter();

    const { isOpen: isPostcodeModalOpen, onOpen: onPostcodeModalOpen, onOpenChange: onPostcodeModalOpenChange } = useDisclosure();
    const { isOpen: isLoadingModalOpen, onOpenChange: onLoadingModalOpenChange } = useDisclosure();
    const { isOpen: isSuccessModalOpen, onOpen: onSuccessModalOpen, onOpenChange: onSuccessModalOpenChange } = useDisclosure();
    const { isOpen: isErrorModalOpen, onOpen: onErrorModalOpen, onOpenChange: onErrorModalOpenChange } = useDisclosure();

    const completeHandler = (data: any) => {
        if (!data) return;
        setAddress(data.address);
    }

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data: any) => {
        const newAddress = JSON.stringify({ address: address, detailAddress: data.detailAddress });

        const orderDeliveryCreateRequest: OrderDeliveryCreateRequestType = {
            address: newAddress,
            phoneNumber: data.phoneNumber,
        };

        mutate(orderDeliveryCreateRequest);
    };

    const queryClient = useQueryClient();

    const onSuccess = (data: any) => { 
        queryClient.refetchQueries({ queryKey: ["order_delivery_info_read"] });

        onSuccessModalOpen();
    };

    const onError = () => {
        console.log("error");
    }

    const { mutate, isError, isPending } = useOrderDeliveryCreate({ onSuccess, onError });

    return (
        <>
            <form className={styles.order_delivery_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_body}>
                    <div className={styles.input_box}>
                        <TextMediumShared><span onClick={onPostcodeModalOpen}>주소</span></TextMediumShared>
                        <Input onClick={onPostcodeModalOpen} value={address} isReadOnly={true} isClearable={false} placeholder={"서울특별시 서대문구 노고산동 57-1"} />
                    </div>
                    <div className={styles.input_box}>
                        <TextMediumShared isLabel htmlFor={"detailAddress"}>상세주소</TextMediumShared>
                        <FormInputShared isClearable={false} isInvalid={!!errors.detailAddress} radius={"sm"} errorMessage={errors.detailAddress && <TextXSmallShared>{String(errors.detailAddress.message)}</TextXSmallShared>} name={"detailAddress"} control={control} placeholder={"상세주소를 입력해주세요."} />
                    </div>
                    <div className={styles.input_box}>
                        <TextMediumShared isLabel={true} htmlFor={"phoneNumber"}>전화번호</TextMediumShared>
                        <FormInputShared radius={"sm"} isClearable={false} isInvalid={!!errors.phoneNumber} size={"md"} control={control} name={"phoneNumber"} placeholder={"01012345678"} />
                    </div>
                    <Button className={(!isValid) || (submitCount >= 5) ? "" : "bg-foreground text-background"} isDisabled={(!isValid) || (submitCount >= 5)} type={"submit"} variant={"solid"} color={(!isValid) || (submitCount >= 5) ? "default" : "primary"} size={"lg"} radius={"sm"} fullWidth>입력하기</Button>
                </div>
            </form>
            <AppAlertModal header={<TextLargeShared>다시 한번 확인해주세요.</TextLargeShared>} content={<TextMediumShared>배송 정보가 일치하지 않습니다.</TextMediumShared>} isDetect={isError} isOpen={isErrorModalOpen} onOpen={onErrorModalOpen} onOpenChange={onErrorModalOpenChange} />
            <AppPostcodeModal isOpen={isPostcodeModalOpen} onOpenChange={onPostcodeModalOpenChange} completeHandler={completeHandler} />
            <AppLoadingModal isDetect={isPending} isOpen={isLoadingModalOpen} onOpenChange={onLoadingModalOpenChange} />
            <AppConfirmModal header={<TextLargeShared>배송 정보가 업데이트 되었습니다.</TextLargeShared>} content={<TextSmallShared>홈으로 이동하기</TextSmallShared>} onAction={() => {
                router.push("/");
            }} isOpen={isSuccessModalOpen} onOpenChange={onSuccessModalOpenChange} />
        </>
    )
}

export default OrderDeliveryForm;