"use client";

import { OrderProductReqState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { Textarea } from "@nextui-org/input";
import React from "react";
import { useSetRecoilState } from "recoil";

const OrderReqForm = () => {
    const setOrderProductReq = useSetRecoilState(OrderProductReqState);

    return (
        <Textarea onChange={e => {
            setOrderProductReq(e.target.value);
        }} radius={"sm"} size={"lg"} name={"req"} placeholder={"배송 메세지를 입력해주세요."} />
    );
};

export default OrderReqForm;