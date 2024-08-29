"use client";

import { useEffect, useState } from "react";
import { ProductProps } from "../types";
import { useModal } from "../context/ModalContext";
import ProductApi from "../api/ProductApi";

// TODO: Adicionar evento de pressionar o produto e fazer a modificação

export default function Product({
  name,
  description,
  quantity,
  categoryId,
  id,
}: ProductProps) {
  const {
    setType,
    setIsOpen,
    setIsCategory,
    setCategoryId,
    setNameState,
    setDescriptionState,
    setQuantityState,
    nameState,
    descriptionState,
    setElement,
  } = useModal();

  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  let timer: NodeJS.Timeout;
  const pressEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    timer = setTimeout(() => {
      setNameState!(name);
      setDescriptionState!(description || "");
      setQuantityState!(quantity);

      setType("update");
      setIsCategory!(false);
      setCategoryId!(categoryId);
      setElement!(
        (e.target as HTMLDivElement).closest(".product") as HTMLDivElement
      );

      setIsOpen(true);
    }, 400);
  };

  const stopTimer = () => {
    clearTimeout(timer);
  };

  return (
    <div
      className="product flex justify-between items-center border-t border-b border-gray-300 px-4 py-1"
      onMouseDown={pressEvent}
      onMouseUp={stopTimer}
      onMouseLeave={stopTimer}
    >
      <div className="flex flex-col">
        <span className="name text-lg">{name}</span>
        <span className="text-sm">{description}</span>
      </div>
      <input
        type="tel"
        className="w-12 h-6 rounded input-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:ring-opacity-50 transition duration-150 ease-in-out"
        value={currentQuantity}
        onBlur={(e) => {
          const update = async () => {
            try {
              await ProductApi.update({
                categoryId: categoryId,
                id: id!,
                name,
                description: description || "",
                quantity: currentQuantity!,
              });
            } catch (error) {
              console.error("Error updating quantity", error);
            }
          };

          update();
        }}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") setCurrentQuantity(0);
          if (isNaN(parseInt(value))) return;

          setCurrentQuantity(parseInt(value));
        }}
      />
    </div>
  );
}
