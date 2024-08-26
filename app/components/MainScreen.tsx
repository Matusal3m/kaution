import Category from "./Category";
import CategoryApi from "../api/CategoryApi";

export default async function MainScreen() {
  const categoriesData = await CategoryApi.componentsData();

  return (
    <div className="h-[80svh] overflow-y-scroll mb-[10svh] mt-[10svh]">
      {categoriesData.map((category) => {
        return (
          <Category
            name={category.name}
            products={category.products}
            key={category.name}
          />
        );
      })}
    </div>
  );
}
