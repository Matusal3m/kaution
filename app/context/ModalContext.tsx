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
    setCategoryId?: Dispatch<React.SetStateAction<string>>;
    setIsCategory?: Dispatch<React.SetStateAction<boolean>>;
    name?: string;
    setName?: Dispatch<React.SetStateAction<string>>;
  }
);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"" | "update" | "create">("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        modalType,
        setModalType,
        categoryId,
        isCategory,
        setCategoryId,
        setIsCategory,
        name,
        setName,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
