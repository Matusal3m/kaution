"use client";

import Product from "./Product";
import { CategoryProps } from "../types";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import { useModal } from "../context/ModalContext";
import { useCategory } from "../context/CategoryContext";

// TODO: Fazer um evento de pressionar para modificar a categoria

export default function Category({ id, name, products }: CategoryProps) {
  const { search } = useSearch();
  const { setIsOpen, setType, setSelectedElement } = useModal();
  const {
    setCategoryName,
    setCategoryElement,
    setCategoryId,
  } = useCategory();

  const [hidden, setHidden] = useState(false);

  const filterProducts = (search: string) => {
    return products.filter((product) => product.name.includes(search));
  };
  const filteredProduts = filterProducts(search);

  let timer: NodeJS.Timeout;
  const pressEvent = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    timer = setTimeout(() => {
      setType("update");
      setSelectedElement("category");
      setCategoryName(name);
      // setCategoryDescription(Category); -- it is not used
      setCategoryId(id);
      setCategoryElement(
        ((e.target as HTMLDivElement).closest(".category") as HTMLDivElement)
          .parentElement as HTMLDivElement
      );

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
        onTouchStart={pressEvent}
        onTouchEnd={stopTimer}
        onTouchCancel={stopTimer}
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
