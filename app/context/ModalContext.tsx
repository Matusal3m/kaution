"use client";

import {
  Dispatch,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export const ModalContext = createContext(
  {} as {
    openModal: boolean;
    setOpenModal: Dispatch<React.SetStateAction<boolean>>;
    modalType: "" | "update" | "create";
    setModalType: Dispatch<React.SetStateAction<"" | "update" | "create">>;
    categoryId?: string;
    isCategory?: boolean;
  }
);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"" | "update" | "create">("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [isCategory, setIsCategory] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        modalType,
        setModalType,
        categoryId,
        isCategory,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
