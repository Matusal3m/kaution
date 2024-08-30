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
  updateProductFields: (newName: string, newDescription: string) => void;
  removeProductElement: () => void;
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

  const updateProductFields = (newName: string, newDescription: string) => {
    const nameField = productElement.querySelector(".name") as HTMLDivElement;
    const descriptionField = productElement.querySelector(
      ".description"
    ) as HTMLDivElement;

    nameField.textContent = newName;
    descriptionField.textContent = newDescription;
  };

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
        updateProductFields,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
