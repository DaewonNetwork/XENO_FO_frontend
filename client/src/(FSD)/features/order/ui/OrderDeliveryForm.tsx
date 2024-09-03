"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import styles from "@/(FSD)/shareds/styles/OrderStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import FormTextareaShared from "@/(FSD)/shareds/ui/FormTextareaShared";
import AppInner from "@/(FSD)/widgets/app/ui/AppInner";
import { useOrderDeliveryInfoRead } from "@/(FSD)/entities/order/api/useOrderDeliveryInfoRead";
import { OrderDeliveryInfoType } from "@/(FSD)/shareds/types/orders/OrderDeliveryInfo.type";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import AppPostcodeModal from "@/(FSD)/widgets/app/ui/AppPostcodeModal";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";

const OrderDeliveryForm = () => {
    const schema = z.object({
        address: z.string().min(10).max(200),
        phoneNumber: z.string().min(11).max(15),
        req: z.string().optional(),
    });

    const [address, setAddress] = useState<string>();
    const [postcode, setPostcode] = useState<string>();

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit = (data: any) => {
    };

    const { isOpen: postcodeModalIsOpen, onOpen: postcodeModalOnOpen, onOpenChange: postcodeModalOnOpenChange } = useDisclosure();

    const completeHandler = (data: any) => {
        if (!data) return;
        setAddress(data.address);
        setPostcode(data.zonecode);
    }

    const { data } = useOrderDeliveryInfoRead();

    const orderDeliveryInfo: OrderDeliveryInfoType = data;

    return (
        <>
            <form className={`bg-background ${styles.order_form}`} onSubmit={handleSubmit(onSubmit)}>
                <AppInner>
                    <div className={styles.form_header}>
                        <TextLargeShared>배송 정보</TextLargeShared>
                    </div>
                    <div className={styles.form_body}>
                        <div className={styles.input_box}>
                            <TextMediumShared isLabel htmlFor={"address"}>우편 번호</TextMediumShared>
                            <Input onClick={postcodeModalOnOpen} isReadOnly={true} isClearable={false} value={postcode || ""} placeholder={"01234"} />
                        </div>
                        <div className={styles.input_box}>
                            <TextMediumShared isLabel htmlFor={"address"}>주소</TextMediumShared>
                            <Input onClick={postcodeModalOnOpen} isReadOnly={true} isClearable={false} value={address ? address : (orderDeliveryInfo && orderDeliveryInfo.address) && orderDeliveryInfo.address.split(" / ")[0]} placeholder={"서울특별시 서대문구 노고산동 57-1 7층"} />
                        </div>
                        <div className={styles.input_box}>
                            <TextMediumShared isLabel htmlFor={"address"}>상세주소</TextMediumShared>
                            <FormInputShared value={(orderDeliveryInfo && orderDeliveryInfo.address) && orderDeliveryInfo.address.split(" / ")[1]} isClearable isInvalid={!!errors.address} radius={"sm"} errorMessage={errors.address && <TextXSmallShared>{String(errors.address.message)}</TextXSmallShared>} name={"address"} control={control} placeholder={"상세주소를 입력해주세요."} />
                        </div>
                        <div className={styles.input_box}>
                            <TextMediumShared isLabel={true} htmlFor={"phoneNumber"}>전화번호</TextMediumShared>
                            <FormInputShared value={(orderDeliveryInfo && orderDeliveryInfo.phoneNumber) && orderDeliveryInfo.phoneNumber} radius={"sm"} isClearable isInvalid={!!errors.phoneNumber} size={"md"} control={control} name={"phoneNumber"} placeholder={"01012345678"} />
                        </div>
                        <div className={styles.input_box}>
                            <TextMediumShared isLabel={true} htmlFor={"req"}>배송 메세지</TextMediumShared>
                            <FormTextareaShared value={(orderDeliveryInfo && orderDeliveryInfo.req) && orderDeliveryInfo.req} radius={"sm"} size={"lg"} isInvalid={!!errors.req} control={control} name={"req"} placeholder={"배송 메세지를 입력해주세요."} />
                        </div>
                    </div>
                </AppInner>
            </form>
            <AppPostcodeModal isOpen={postcodeModalIsOpen} onOpenChange={postcodeModalOnOpenChange} completeHandler={completeHandler} />
        </>
    )
}

export default OrderDeliveryForm;