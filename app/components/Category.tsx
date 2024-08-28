"use client";

import Product from "./Product";
import { CategoryProps } from "../types";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";

// TODO: Fazer um evento de pressionar para modificar a categoria

export default function Category({ name, products }: CategoryProps) {
  const [hidden, setHidden] = useState(false);
  const { search } = useSearch();

  const filterProducts = (search: string) => {
    return products.filter((product) => product.name.includes(search));
  };
  const filteredProduts = filterProducts(search);

  const hasProducts = filteredProduts.length > 0;

  return (
    <div className={hasProducts ? "" : "hidden"}>
      <h2
        className={`text-xl font-bold py-1 px-2 ${
          hidden ? "border-2 border-white" : ""
        }`}
        onClick={() => setHidden(!hidden)}
      >
        {name}
      </h2>
      <ul className={`${hidden ? "hidden" : ""}`}>
        {(search === "" ? products : filteredProduts).map((product) => (
          <li key={product.name}>
            <Product {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
