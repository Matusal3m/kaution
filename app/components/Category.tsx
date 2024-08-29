"use client";

import Product from "./Product";
import { CategoryProps } from "../types";
import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import { useModal } from "../context/ModalContext";

// TODO: Fazer um evento de pressionar para modificar a categoria

export default function Category({ id, name, products }: CategoryProps) {
  const [hidden, setHidden] = useState(false);
  const { search } = useSearch();
  const {
    setIsOpen,
    setType,
    setIsCategory,
    setCategoryId,
    setElement,
    setNameState,
    element,
  } = useModal();

  const filterProducts = (search: string) => {
    return products.filter((product) => product.name.includes(search));
  };
  const filteredProduts = filterProducts(search);

  let timer: NodeJS.Timeout;
  const pressEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    timer = setTimeout(() => {
      console.log({ element });

      setNameState!(name);
      setType("update");
      setIsCategory!(true);
      setCategoryId!(id);

      setElement!(
        (e.target as HTMLDivElement).closest(".category") as HTMLDivElement
      );
      console.log({ element });

      setIsOpen(true);
    }, 400);
  };

  const stopTimer = () => {
    clearTimeout(timer);
  };

  return (
    <div>
      <h2
        className={`category name text-xl font-bold py-1 px-2 ${
          hidden ? "border-2 border-white" : ""
        }`}
        onClick={() => setHidden(!hidden)}
        onMouseDown={pressEvent}
        onMouseLeave={stopTimer}
        onMouseUp={stopTimer}
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
