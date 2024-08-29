"use client";

import Category from "./Category";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { useCategories } from "../context/CategoriesContext";

export default function MainScreen() {
  const { userId } = useUser();
  const router = useRouter();

  const { categoriesData } = useCategories();
  console.log(categoriesData)

  if (!userId) {
    router.push("/register");
  }

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
            key={category.name + Math.random()}
          />
        );
      })}
    </div>
  );
}
