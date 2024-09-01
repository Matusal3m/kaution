"use client";

import Category from "./Category";
import { useUser } from "../context/UserContext";
import { useCategory } from "../context/CategoryContext";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { useRouter } from "next/navigation";

export default function MainScreen() {
  const { getUserId } = useUser();
  const router = useRouter();

  const [userId, setUserId] = useState("");

  useEffect(() => {
    // const userId = getUserId();
    const userId = getUserId();

    if (userId === "undefined") {
      router.push("/register");
    }

    setUserId(userId);
  }, [userId, router]);

  const { fetchCategoriesData, setReloadCategories, reloadCategories } =
    useCategory();

  const [categoriesData, setCategoriesData] = useState<
    Array<{ name: string; products: Product[]; id: string }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const data = await fetchCategoriesData();
        setCategoriesData(data);
      }
    };

    if (!categoriesData.length || reloadCategories) {
      fetchData();
      setReloadCategories(false);
    }
  }, [userId, categoriesData, reloadCategories, setReloadCategories]);
  return (
    <div className="h-[80svh] overflow-y-scroll mb-[10svh] mt-[10svh]">
      {categoriesData.map((category) => {
        return (
          <Category
            id={category.id}
            name={category.name}
            products={category.products.map((product) => ({
              ...product,
              id: product.id!,
              quantity: product.quantity ?? 0,
              categoryId: category.id,
            }))}
            key={category.name}
          />
        );
      })}
    </div>
  );
}
