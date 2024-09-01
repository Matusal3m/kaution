import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ProductContextI {
  productName: string;
  productDescription: string;
  productQuantity: number;
  productId: string;
  productCategoryId: string;
  productElement: HTMLDivElement;
  setProductName: Dispatch<SetStateAction<string>>;
  setProductDescription: Dispatch<SetStateAction<string>>;
  setProductQuantity: Dispatch<SetStateAction<number>>;
  setProductId: Dispatch<SetStateAction<string>>;
  setProductCategoryId: Dispatch<SetStateAction<string>>;
  setProductElement: Dispatch<SetStateAction<HTMLDivElement>>;
  removeProductElement: () => void;
  updateProductStates: (newName: string, newDescription: string) => void;
  setUpdateProductStates: Dispatch<
    SetStateAction<(newName: string, newDescription: string) => void>
  >;
}

export const ProductContext = createContext({} as ProductContextI);

export function ProductProvider({ children }: any) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productId, setProductId] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productElement, setProductElement] = useState<HTMLDivElement>(
    {} as HTMLDivElement
  );
  const [updateProductStates, setUpdateProductStates] = useState<
    (newName: string, newDescription: string) => void
  >(() => {});

  const removeProductElement = () => {
    productElement.remove();
  };

  return (
    <ProductContext.Provider
      value={{
        productCategoryId,
        productDescription,
        productElement,
        productId,
        productName,
        productQuantity,
        removeProductElement,
        setProductCategoryId,
        setProductDescription,
        setProductElement,
        setProductId,
        setProductName,
        setProductQuantity,
        updateProductStates,
        setUpdateProductStates,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
