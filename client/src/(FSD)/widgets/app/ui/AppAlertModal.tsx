"use client";

import { Modal, ModalContent } from "@nextui-org/modal";
import React, { ReactNode, useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import { AppModalType } from "../types/AppModal.type";
import { Button } from "@nextui-org/button";
import AppInner from "./AppInner";

interface AppAlertModal extends AppModalType {
    header: ReactNode;
    content: ReactNode;
    onOpen: () => void;
    closeButtonText?: string;
};

const AppAlertModal = ({ header, content, closeButtonText = "확인", isDetect, isOpen, onOpen, onOpenChange, size = "sm" }: AppAlertModal) => {
    useEffect(() => {
        if (isDetect) {
            onOpen();
        }
    }, [isDetect]);

    return (
        <Modal className={styles.app_modal} size={size} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
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
                            <Button onClick={onClose}>{closeButtonText}</Button>
                        </footer>
                    </AppInner>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AppAlertModal;