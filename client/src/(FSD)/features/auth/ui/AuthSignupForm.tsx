"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import PasswordInputShared from "@/(FSD)/shareds/ui/PasswordInputShared";
import { Button } from "@nextui-org/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "@/(FSD)/shareds/styles/AuthStyle.module.scss";
import { UserType } from "@/(FSD)/shareds/types/user/User.type";
import { useAuthSignup } from "../api/useAuthSignup";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import Link from "next/link";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { useDisclosure } from "@nextui-org/modal";
import AppLoadingModal from "@/(FSD)/widgets/app/ui/AppLoadingModal";
import AppAlertModal from "@/(FSD)/widgets/app/ui/AppAlertModal";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";

const AuthSignupForm = () => {
    const userNameRegex = /^[가-힣a-zA-Z\s]{1,20}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

    const [userData, setUserData] = useState<UserType | null>(null);

    const schema = z.object({
        userName: z.string().regex(userNameRegex, { message: "알맞은 이름을 입력해주세요." }),
        email: z.string().regex(emailRegex, {
            message: "알맞은 이메일 주소를 입력해주세요."
        }).refine((email) => {
            return !!email;
        }, {
            message: "이미 가입된 이메일 주소입니다."
        }),
        password: z.string().regex(passwordRegex, {
            message: "알맞는 비밀번호를 입력해주세요."
        }),
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
    });


    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const router = useRouter();

    const onSuccess = (data: any) => {
        if (!userData) return;
        router.push("/");
    }

    const { mutate, isError, isPending } = useAuthSignup({ onSuccess });

    const onSubmit = (data: any) => {
        if ((!data.userName) || (!data.email) || (!data.password)) return;

        const user: UserType = {
            name: data.userName,
            email: data.email,
            password: data.password
        };

        setUserData(user);
        mutate(user);
    };

    const { isOpen: isErrorModalOpen, onOpen: onErrorModalOpen, onOpenChange: onErrorModalOpenChange } = useDisclosure();
    const { isOpen: isLoadingModalOpen, onOpenChange: onLoadingModalOpenChange } = useDisclosure();

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"userName"}>이름</TextMediumShared>
                    <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.userName} errorMessage={errors.userName && <TextSmallShared>{String(errors.userName.message)}</TextSmallShared>} name={"userName"} type={"text"} autoFocus={true} isRequired control={control} placeholder={"홍길동"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"email"}>이메일</TextMediumShared>
                    <FormInputShared isClearable size={"lg"} variant={"underlined"} isInvalid={!!errors.email} radius={"none"} errorMessage={errors.email && <TextSmallShared>{String(errors.email.message)}</TextSmallShared>} name={"email"} control={control} placeholder={"abc1234@gmail.com"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"password"}>비밀번호</TextMediumShared>
                    <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.password} errorMessage={errors.password && <TextSmallShared>{String(errors.password.message)}</TextSmallShared>} name={"password"} control={control} placeholder={"영문, 숫자 조합 8~16자"} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"confirmPassword"}>비밀번호 재입력</TextMediumShared>
                    <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.confirmPassword} errorMessage={errors.confirmPassword && <TextSmallShared>{String(errors.confirmPassword.message)}</TextSmallShared>} name={"confirmPassword"} control={control} placeholder={"비밀번호를 한 번 더 입력해주세요."} />
                </div>
                <Button isDisabled={(!isValid) || (submitCount >= 5)} type={"submit"} variant={"solid"} color={(!isValid) || (submitCount >= 5) ? "default" : "primary"} size={"lg"} radius={"sm"} fullWidth>회원가입</Button>
                <div className={styles.btn_box}>
                    <Link href={"/auth/signin"}><TextSmallShared>로그인</TextSmallShared></Link>
                </div>
            </form>
            <AppAlertModal header={<TextLargeShared>다시 한번 확인해주세요.</TextLargeShared>} content={<TextMediumShared>회원가입 정보가 일치하지 않습니다.</TextMediumShared>} isDetect={isError} isOpen={isErrorModalOpen} onOpen={onErrorModalOpen} onOpenChange={onErrorModalOpenChange} />
            <AppLoadingModal isDetect={isPending} isOpen={isLoadingModalOpen} onOpenChange={onLoadingModalOpenChange} />
        </>
    );
};

export default AuthSignupForm;