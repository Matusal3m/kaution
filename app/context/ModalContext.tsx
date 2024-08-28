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
  }
);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
