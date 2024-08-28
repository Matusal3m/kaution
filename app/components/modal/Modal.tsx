"use client";

import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import CategoryApi from "@/app/api/CategoryApi";
import { useUser } from "@/app/context/UserContext";
import CreateModal from "@/app/components/modal/CreateModal";
import UpdateModal from "./UpdateModal";

export default function Modal() {
  const { openModal, setOpenModal, modalType, setModalType } = useModal();
  const { userId } = useUser();

  const handleClose = () => {
    setOpenModal(false);
  };

  //TODO: conseguir o valor de id da categoria.
  return (
    <dialog id="modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create</h3>
        {modalType === "create" ? (
          <CreateModal></CreateModal>
        ) : (
          <UpdateModal categoryId={""} isCategory={false}></UpdateModal>
        )}
      </div>
    </dialog>
  );
}
