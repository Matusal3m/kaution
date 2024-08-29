"use client";

import { useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import CreateModal from "@/app/components/modal/CreateModal";
import UpdateModal from "./UpdateModal";

export default function Modal() {
  const { isOpen, type } = useModal();

  useEffect(() => {
    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  //TODO: conseguir o valor de id da categoria.
  if (isOpen && type === "create") {
    return (
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create</h3>
          <CreateModal />
        </div>
      </dialog>
    );
  }

  if (isOpen && type === "update") {
    return (
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create</h3>
          <UpdateModal />
        </div>
      </dialog>
    );
  }

  return null;
}
