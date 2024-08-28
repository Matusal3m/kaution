"use client";

import { useState } from "react";
import { ProductProps } from "../types";
import { useModal } from "../context/ModalContext";

// TODO: Adicionar evento de pressionar o produto e fazer a modificação

export default function Product({ name, description, quantity, categoryId }: ProductProps) {

  const {setModalType, } = useModal();

  const pressEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const timer = setTimeout(() => {
      console.log("pressed");
    }, 400)
  };

  const [currentQuantity, setCurrentQuantity] = useState(quantity || 0);
  return (
    <div className="flex justify-between items-center border-t border-b border-gray-300 px-4 py-1"
    onMouseDown={pressEvent}
    >
      <div className="flex flex-col">
        <span className="text-lg">{name}</span>
        <span className="text-sm">{description}</span>
      </div>
      <input
        type="tel"
        className="w-12 h-6 rounded input-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:ring-opacity-50 transition duration-150 ease-in-out"
        value={currentQuantity}
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
