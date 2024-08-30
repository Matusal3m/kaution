"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { CategoryProvider } from "./CategoryContext";
import { ProductProvider } from "./ProductContext";

export type ModalContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedElement: "category" | "product" | "";
  setSelectedElement: Dispatch<SetStateAction<"category" | "product" | "">>;
  type: "update" | "create" | "";
  setType: Dispatch<SetStateAction<"update" | "create" | "">>;
};

export const ModalContext = createContext<ModalContextType>({} as any);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<
    "category" | "product" | ""
  >("");
  const [type, setType] = useState<"update" | "create" | "">("");

  return (
    <CategoryProvider>
      <ProductProvider>
        <ModalContext.Provider
          value={{
            isOpen,
            setIsOpen,
            selectedElement,
            setSelectedElement,
            type,
            setType,
          }}
        >
          {children}
        </ModalContext.Provider>
      </ProductProvider>
    </CategoryProvider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
