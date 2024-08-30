"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../types";
import { useUser } from "./UserContext";
import CategoryApi from "../api/CategoryApi";

interface CategoryContextI {
  categoryName: string;
  categoriesData: { name: string; products: Product[]; id: string }[];
  categoryDescription: string;
  categoryElement: HTMLDivElement;
  categoryId: string;
  setCategoryElement: Dispatch<SetStateAction<HTMLDivElement>>;
  setCategoryName: Dispatch<SetStateAction<string>>;
  setCategoryDescription: Dispatch<SetStateAction<string>>;
  setCategoriesData: Dispatch<
    SetStateAction<{ name: string; products: Product[]; id: string }[]>
  >;
  setCategoryId: Dispatch<SetStateAction<string>>;
  updateCategoryFields: (newName: string) => void;
  removeCategoryElement: () => void;
}
type CategoriesDataType = Array<{
  name: string;
  products: Product[];
  id: string;
}>;

export const CategoryContext = createContext({} as CategoryContextI);

export function CategoryProvider({ children }: any) {
  const [categoriesData, setCategoriesData] = useState(
    [] as CategoriesDataType
  );

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryElement, setCategoryElement] = useState<HTMLDivElement>(null!);
  const [categoryId, setCategoryId] = useState("");

  const { userId } = useUser();

  useEffect(() => {
    async function fetchCategoriesData() {
      try {
        const categoriesData = await CategoryApi.componentsData(userId);
        setCategoriesData(categoriesData);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    }

    if (userId) {
      fetchCategoriesData();
    }
  }, [userId, setCategoriesData]);

  const updateCategoryFields = (newName: string) => {
    const nameField = categoryElement.querySelector(
      ".name"
    ) as HTMLInputElement;
    // If a description field exists, update it
    nameField.textContent = newName;
  };

  const removeCategoryElement = () => {
    categoryElement.remove();
  };

  return (
    <CategoryContext.Provider
      value={{
        categoriesData,
        setCategoriesData,
        categoryDescription,
        categoryName,
        setCategoryDescription,
        setCategoryName,
        categoryElement,
        setCategoryElement,
        updateCategoryFields,
        categoryId,
        setCategoryId,
        removeCategoryElement,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
