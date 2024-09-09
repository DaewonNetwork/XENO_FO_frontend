"use client";

import React, { ReactNode } from "react";
import { AppModalType } from "../types/AppModal.type";
import { Modal, ModalContent } from "@nextui-org/modal";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import AppInner from "./AppInner";
import { Button, ButtonProps } from "@nextui-org/button";

interface AppPromptModalProps extends AppModalType {
    children: ReactNode;

    actionButtonProps?: ButtonProps & {
        text?: string;
        onAction?: () => void;
    };

    subButtonProps?: ButtonProps & {
        text?: string;
        onAction?: () => void;
    };
};

const AppPromptModal = ({ actionButtonProps, subButtonProps, children, isOpen, onOpenChange }: AppPromptModalProps) => {
    const { text: actionButtonText, onAction: onActionButtonAction, ...actionButton}: AppPromptModalProps["actionButtonProps"] = { className: "bg-foreground text-background", text: "확인", size: "lg", radius: "sm", fullWidth: true, ...actionButtonProps };
    const { text: subButtonText, onAction: onSubButtonAction, ...subButton }: AppPromptModalProps["subButtonProps"] = { text: "닫기", size: "lg", radius: "sm", variant: "ghost", fullWidth: true, ...subButtonProps };

    return (
        <Modal
            disableAnimation
            size={"2xl"}
            classNames={{
                base: `rounded-none rounded-t-medium ${styles.prompt_modal_base}`,
            }} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
            <ModalContent>
                {(onClose) => (
                    <>
                        <header className={styles.modal_header} onClick={onClose}>
                            <div className={`bg-default ${styles.bar_line}`}></div>
                        </header>
                        <div className={styles.modal_content}>
                            <AppInner>
                                {children}
                            </AppInner>
                        </div>
                        <footer className={styles.modal_footer}>
                            <AppInner>
                                <div className={`gap-2 ${styles.footer_inner}`}>
                                    <Button {...subButton} onClick={_ => {
                                        onSubButtonAction?.();
                                        onClose();
                                    }}>{subButtonText}</Button>
                                    <Button {...actionButton} onClick={_ => {
                                        onActionButtonAction?.();
                                        onClose();
                                    }}>{actionButtonText}</Button>
                                </div>
                            </AppInner>
                        </footer>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AppPromptModal;