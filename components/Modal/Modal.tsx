"use client";

import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    function closeModal(e: KeyboardEvent) {
      if (e.code === "Escape") {
        onClose();
      }
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeModal);
    return () => {
      document.removeEventListener("keydown", closeModal);
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    console.log("close");
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <button onClick={onClose}>close modal</button>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
};

export default Modal;
