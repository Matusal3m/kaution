"use client";

import { IoCreate } from "react-icons/io5";
import { MdNotifications } from "react-icons/md";
import { FaInfo } from "react-icons/fa6";
import { useModal } from "../../context/ModalContext";
import { useUser } from "@/app/context/UserContext";

export default function MenuOptions() {
  const { isOpen, setIsOpen, setType } = useModal();
  const { setUserId } = useUser();

  const handleClick = () => {
    setType("create");
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setUserId("");
    window.location.reload();
  };

  return (
    <ul className="menu bg-base-200 lg:menu-horizontal rounded-box absolute">
      <li onClick={handleClick}>
        <span>
          <IoCreate />
          Criar novo
        </span>
      </li>
      <li onClick={handleLogout}>
        <span>
          <MdNotifications />
          Sair da conta
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
