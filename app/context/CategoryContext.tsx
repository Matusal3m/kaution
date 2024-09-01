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
  categoryDescription: string;
  categoryElement: HTMLDivElement;
  categoryId: string;
  reloadCategories: boolean;
  setCategoryElement: Dispatch<SetStateAction<HTMLDivElement>>;
  setCategoryName: Dispatch<SetStateAction<string>>;
  setCategoryDescription: Dispatch<SetStateAction<string>>;
  setCategoryId: Dispatch<SetStateAction<string>>;
  removeCategoryElement: () => void;
  updateCategoryStates: (newName: string) => void;
  setUpdateCategoryStates: Dispatch<SetStateAction<(newName: string) => void>>;
  setReloadCategories: Dispatch<SetStateAction<boolean>>;
  fetchCategoriesData: () => Promise<
    {
      name: string;
      products: Product[];
      id: string;
    }[]
  >;
}

interface CategoryData {
  name: string;
  products: Product[];
  id: string;
}

export const CategoryContext = createContext({} as CategoryContextI);

export function CategoryProvider({ children }: any) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryElement, setCategoryElement] = useState<HTMLDivElement>(null!);
  const [categoryId, setCategoryId] = useState("");
  const [updateCategoryStates, setUpdateCategoryStates] = useState<
    (newName: string) => void
  >(() => {});
  const [reloadCategories, setReloadCategories] = useState(false);
  const { getUserId } = useUser();

  const fetchCategoriesData = async (): Promise<CategoryData[]> => {
    try {
      const userId = getUserId();

      if (userId === "undefined") {
        return [];
      }

      return await CategoryApi.componentsData(userId);
    } catch (error) {
      console.error("Error fetching categories data:", error);
      return [];
    }
  };

  const removeCategoryElement = () => {
    categoryElement.remove();
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryDescription,
        categoryName,
        setCategoryDescription,
        setCategoryName,
        categoryElement,
        setCategoryElement,
        categoryId,
        setCategoryId,
        removeCategoryElement,
        updateCategoryStates,
        setUpdateCategoryStates,
        fetchCategoriesData,
        reloadCategories,
        setReloadCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
