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
    setUpdateCategoryStates,
  } = useCategory();

  const [hidden, setHidden] = useState(false);
  const [nameState, setNameState] = useState(name);

  const filterProductsBySearch = (searchTerm: string) => {
    const lowerCaseSearchTerm = searchTerm
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(lowerCaseSearchTerm)
    );
  };
  const filteredProduts = filterProductsBySearch(search);

  let timer: NodeJS.Timeout;
  const pressEvent = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    timer = setTimeout(() => {
      setType("update");
      setSelectedElement("category");
      setCategoryName(nameState);
      // setCategoryDescription(Category); -- it is not used
      setCategoryId(id);
      setCategoryElement(
        ((e.target as HTMLDivElement).closest(".category") as HTMLDivElement)
          .parentElement as HTMLDivElement
      );

      const updateStates = (newName: string) => {
        if (!newName) return;
        setNameState(newName);
      };

      setUpdateCategoryStates(() => updateStates);

      setIsOpen(true);
    }, 400);
  };

  const stopTimer = () => {
    clearTimeout(timer);
  };

  return (
    <div className={filteredProduts.length == 0 && !!search ? "hidden" : ""}>
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
        {nameState}
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
