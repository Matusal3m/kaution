"use client";

import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import CategoryApi from "@/app/api/CategoryApi";
import { useUser } from "@/app/context/UserContext";
import CreateModal from "@/app/components/modal/CreateModal";
import UpdateModal from "./UpdateModal";

export default function Modal() {
  const { openModal, modalType } = useModal();

  //TODO: conseguir o valor de id da categoria.
  if (openModal && modalType === "create") {
    return (
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create</h3>
          <CreateModal />
        </div>
      </dialog>
    );
  }

  if (openModal && modalType === "update") {
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
