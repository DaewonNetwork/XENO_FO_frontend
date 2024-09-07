"use client";

import React from "react";
import { IsViewOrderDeliveryFormState } from "@/(FSD)/shareds/stores/OrderProductAtom";
import { Button } from "@nextui-org/button";
import { useSetRecoilState } from "recoil";

const OrderDeliveryChangeBtn = () => {
    const setIsViewOrderDeliveryFormState = useSetRecoilState(IsViewOrderDeliveryFormState);

    return <Button onClick={_ => {
        setIsViewOrderDeliveryFormState(prev => !prev);
    }} variant={"bordered"} size={"sm"}>변경하기</Button>;
}

export default OrderDeliveryChangeBtn;