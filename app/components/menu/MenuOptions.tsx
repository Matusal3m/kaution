"use client";

import { IoCreate } from "react-icons/io5";
import { MdNotifications } from "react-icons/md";
import { FaInfo } from "react-icons/fa6";
import { useModal } from "../modal/ModalContext";

export default function MenuOptions() {
  const {openModal, setOpenModal} = useModal();

  return (
    <ul className="menu bg-base-200 lg:menu-horizontal rounded-box absolute">
      <li onClick={() => setOpenModal(true)}>
        <span>
          <IoCreate />
          Criar novo
        </span>
      </li>
      <li>
        <span>
          <MdNotifications />
          Notificações
          <span className="badge badge-xs badge-info bg-red-800"></span>
        </span>
      </li>
      <li>
        <span>
          <FaInfo />
          Sobre
          <span className="badge badge-xs badge-info"></span>
        </span>
      </li>
    </ul>
  );
}
