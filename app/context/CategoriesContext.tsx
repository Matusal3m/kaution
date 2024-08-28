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

export const CategoriesContext = createContext(
  {} as {
    categoriesData: { name: string; products: Product[]; categoryId: string }[];
    setCategoriesData: Dispatch<
      SetStateAction<
        { name: string; products: Product[]; categoryId: string }[]
      >
    >;
  }
);

export function CategoriesProvider({ children }: any) {
  const [categoriesData, setCategoriesData] = useState(
    [] as { name: string; products: Product[]; categoryId: string }[]
  );

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

  return (
    <CategoriesContext.Provider value={{ categoriesData, setCategoriesData }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
