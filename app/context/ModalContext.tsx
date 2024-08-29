"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type ModalContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  type: "" | "update" | "create";
  setType: Dispatch<SetStateAction<"" | "update" | "create">>;
  categoryId?: string;
  setCategoryId?: Dispatch<SetStateAction<string>>;
  isCategory?: boolean;
  setIsCategory?: Dispatch<SetStateAction<boolean>>;
  nameState?: string;
  setNameState?: Dispatch<SetStateAction<string>>;
  descriptionState?: string;
  setDescriptionState?: Dispatch<SetStateAction<string>>;
  quantityState?: number;
  setQuantityState?: Dispatch<SetStateAction<number>>;
  productId?: string;
  setProductId?: Dispatch<SetStateAction<string>>;
  element?: HTMLDivElement;
  setElement?: Dispatch<SetStateAction<HTMLDivElement>> 
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  setIsOpen: () => {},
  type: "",
  setType: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<"" | "update" | "create">("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [nameState, setNameState] = useState<string>("");
  const [descriptionState, setDescriptionState] = useState<string>("");
  const [quantityState, setQuantityState] = useState<number>(0);
  const [productId, setProductId] = useState<string>("");
  const [element, setElement] = useState<HTMLDivElement>();

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        type,
        setType,
        categoryId,
        setCategoryId,
        isCategory,
        setIsCategory,
        nameState,
        setNameState,
        descriptionState,
        setDescriptionState,
        quantityState,
        setQuantityState,
        productId,
        setProductId,
        element,
        setElement
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
