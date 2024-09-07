"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import FormTextareaShared from "@/(FSD)/shareds/ui/FormTextareaShared";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import AppPostcodeModal from "@/(FSD)/widgets/app/ui/AppPostcodeModal";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";
import { useSetRecoilState } from "recoil";
import { OrderDeliveryFormIsValidState, OrderProductReqState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { useOrderDeliveryCreate } from "../api/useOrderDeliveryCreate";
import { OrderDeliveryCreateRequestType } from "@/(FSD)/shareds/types/orders/OrderDeliveryCreateRequest.type";

const OrderDeliveryForm = () => {
    const addressRegex = /^.{1,50}$/;
    const phoneNumberRegex = /^\d{11,15}$/;
    const reqRegex = /^.{0,200}$/;

    const schema = z.object({
        detailAddress: z.string().regex(addressRegex, {
            message: "알맞은 주소를 입력해주세요."
        }),
        phoneNumber: z.string().regex(phoneNumberRegex, {
            message: "알맞은 전화번호를 입력해주세요."
        }),
        req: z.string().regex(reqRegex, {
            message: "알맞은 요청사항을 입력해주세요."
        }).optional(),
    });

    const [address, setAddress] = useState<string>();

    const { isOpen: postcodeModalIsOpen, onOpen: postcodeModalOnOpen, onOpenChange: postcodeModalOnOpenChange } = useDisclosure();

    const setOrderProductReq = useSetRecoilState(OrderProductReqState);
    const setOrderDeliveryFormIsValid = useSetRecoilState(OrderDeliveryFormIsValidState);

    const completeHandler = (data: any) => {
        if (!data) return;
        setAddress(data.address);
    }

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data: any) => {
        setOrderProductReq(data.req);

        const newAddress = JSON.stringify({ address: address, detailAddress: data.detailAddress });

        const orderDeliveryCreateRequest: OrderDeliveryCreateRequestType = {
            address: newAddress,
            phoneNumber: data.phoneNumber,
        };

        mutate(orderDeliveryCreateRequest);
    };

    const onSuccess = (data: any) => { };

    const onError = () => {
        console.log("error");
    }

    const { mutate } = useOrderDeliveryCreate({ onSuccess, onError });

    useEffect(() => {
        setOrderDeliveryFormIsValid(isValid);
    }, [isValid]);

    return (
        <>
            <form className={styles.order_delivery_form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form_body}>
                    <div className={styles.input_box}>
                        <TextMediumShared><span onClick={postcodeModalOnOpen}>주소</span></TextMediumShared>
                        <Input onClick={postcodeModalOnOpen} value={address} isReadOnly={true} isClearable={false} placeholder={"서울특별시 서대문구 노고산동 57-1"} />
                    </div>
                    <div className={styles.input_box}>
                        <TextMediumShared isLabel htmlFor={"detailAddress"}>상세주소</TextMediumShared>
                        <FormInputShared isClearable={false} isInvalid={!!errors.detailAddress} radius={"sm"} errorMessage={errors.detailAddress && <TextXSmallShared>{String(errors.detailAddress.message)}</TextXSmallShared>} name={"detailAddress"} control={control} placeholder={"상세주소를 입력해주세요."} />
                    </div>
                    <div className={styles.input_box}>
                        <TextMediumShared isLabel={true} htmlFor={"phoneNumber"}>전화번호</TextMediumShared>
                        <FormInputShared radius={"sm"} isClearable={false} isInvalid={!!errors.phoneNumber} size={"md"} control={control} name={"phoneNumber"} placeholder={"01012345678"} />
                    </div>
                    <div className={styles.input_box}>
                        <TextMediumShared isLabel={true} htmlFor={"req"}>배송 메세지</TextMediumShared>
                        <FormTextareaShared radius={"sm"} size={"lg"} isInvalid={!!errors.req} control={control} name={"req"} placeholder={"배송 메세지를 입력해주세요."} />
                    </div>
                    <input type={"submit"} id={"order_delivery_submit_btn"} hidden />
                </div>
            </form>
            <AppPostcodeModal isOpen={postcodeModalIsOpen} onOpenChange={postcodeModalOnOpenChange} completeHandler={completeHandler} />
        </>
    )
}

export default OrderDeliveryForm;