"use client";

import { Modal, ModalContent } from "@nextui-org/modal";
import React, { ReactNode, useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import { AppModalType } from "../types/AppModal.type";
import { Button, ButtonProps } from "@nextui-org/button";
import AppInner from "./AppInner";

interface AppConfirmModal extends AppModalType {
    header: ReactNode;
    content: ReactNode;
    onOpen?: () => void;
    onAction: () => void;

    closeButtonProps?: ButtonProps & {
        text?: string;
    };
    actionButtonProps?: ButtonProps & {
        text?: string;
    };
};

const AppConfirmModal = ({ header, content, closeButtonProps = { text: "닫기", size: "sm" }, actionButtonProps = { text: "확인", color: "primary", size: "sm" }, onAction, isDetect, isOpen, onOpen, onOpenChange, size = "sm" }: AppConfirmModal) => {
    useEffect(() => {
        if (isDetect && onOpen) {
            onOpen();
        }
    }, [isDetect]);

    return (
        <Modal className={`${styles.app_modal} ${styles.confirm_modal}`} size={size} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
            <ModalContent>
                {(onClose) => (
                    <AppInner>
                        <header className={styles.modal_header}>
                            {header}
                        </header>
                        <div className={styles.modal_content}>
                            {content}
                        </div>
                        <footer className={styles.modal_footer}>
                            <Button {...closeButtonProps} onClick={onClose}>{closeButtonProps.text}</Button>
                            <Button {...actionButtonProps} onClick={_ => {
                                onAction();
                                onClose();
                            }}>{actionButtonProps.text}</Button>
                        </footer>
                    </AppInner>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AppConfirmModal;