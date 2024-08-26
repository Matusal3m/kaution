"use client";

import { useModal } from "./ModalContext";

export default function Modal() {
  const { openModal, setOpenModal } = useModal();
  // TODO: Fazer um modal que preste pra criar as coisas
  const closeModal = () => setOpenModal(false);

  return (
    <div className="modal">
      openModal: {openModal}
    </div>
  );
}
