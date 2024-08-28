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

  if (!userId) {
    router.push("/register");
  }

  const { categoriesData, setCategoriesData } = useCategories();
  
  useEffect(() => {
    if (!userId) {
      redirect("/register");
    }
  }, []);

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
            }))}
            key={category.name + Math.random()}
          />
        );
      })}
    </div>
  );
}
