"use client";

import Category from "./Category";
import { useUser } from "../context/UserContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "../context/CategoriesContext";

export default function MainScreen() {
  const { userId } = useUser();
  const router = useRouter();

  const { categoriesData, setCategoriesData } = useCategories();

  if (!userId) {
    router.push("/register");
  }

  console.log(categoriesData);

  return (
    <div className="h-[80svh] overflow-y-scroll mb-[10svh] mt-[10svh]">
      {categoriesData.map((category) => {
        return (
          <Category
            name={category.name}
            products={category.products.map((product) => ({
              ...product,
              quantity: product.quantity ?? 0,
              categoryId: category.id,
            }))}
            key={category.name + Math.random()}
          />
        );
      })}
    </div>
  );
}
