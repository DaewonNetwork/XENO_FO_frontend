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

    closeButtonText?: string;
    actionButtonText?: string;

    buttonProps?: ButtonProps;
};

const AppConfirmModal = ({ header, content, buttonProps = { size: "sm" }, closeButtonText = "닫기", actionButtonText = "확인", onAction, isDetect, isOpen, onOpen, onOpenChange, size = "sm" }: AppConfirmModal) => {
    useEffect(() => {
        if (isDetect) {
            onOpen?.();
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
                            <Button {...buttonProps} onClick={onClose}>{closeButtonText}</Button>
                            <Button {...buttonProps} color={"primary"} onClick={_ => {
                                onAction();
                                onClose();
                            }}>{actionButtonText}</Button>
                        </footer>
                    </AppInner>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AppConfirmModal;