"use client";

import { useState } from "react";
import { ProductProps } from "../types";
import { useModal } from "../context/ModalContext";
import ProductApi from "../api/ProductApi";
import { useProduct } from "../context/ProductContext";

// TODO: Adicionar evento de pressionar o produto e fazer a modificação

export default function Product({
  name,
  description,
  quantity,
  categoryId,
  id,
}: ProductProps) {
  const { setType, setIsOpen, setSelectedElement } = useModal();
  const {
    setProductCategoryId,
    setProductDescription,
    setProductElement,
    setProductId,
    setProductName,
    setProductQuantity,
    setUpdateProductStates,
  } = useProduct();

  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [nameState, setNameState] = useState(name);
  const [descriptionState, setDescriptionState] = useState(description || "");

  let timer: NodeJS.Timeout;
  const pressEvent = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    timer = setTimeout(() => {
      setIsOpen(true);  
      setType("update");
      setSelectedElement("product");

      setProductCategoryId(categoryId);
      setProductDescription(descriptionState!);
      setProductId(id!);
      setProductName(nameState);
      setProductQuantity(currentQuantity);
      setProductElement(
        (e.target as HTMLDivElement).parentElement as HTMLDivElement
      );

      const updateState = (newName: string, newDescription: string) => {
        if (!(newName && newDescription)) return;

        setNameState(newName);
        setDescriptionState(newDescription);
      };

      setUpdateProductStates(() => updateState);
    }, 400);
  };

  const stopTimer = () => {
    clearTimeout(timer);
  };

  return (
    <div
      className="product flex justify-between items-center border-t border-b border-gray-300 px-4 py-1"
      onMouseDown={pressEvent}
      onMouseLeave={stopTimer}
      onMouseUp={stopTimer}
      onTouchStart={pressEvent}
      onTouchEnd={stopTimer}
      onTouchCancel={stopTimer}
    >
      <div className="flex flex-col">
        <span className="name text-lg">{nameState}</span>
        <span className="description text-sm">{descriptionState}</span>
      </div>
      <input
        type="tel"
        className="w-12 h-6 rounded input-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:ring-opacity-50 transition duration-150 ease-in-out"
        value={currentQuantity}
        onBlur={(e) => {
          const updateQuantity = async () => {
            try {
              await ProductApi.update({
                categoryId: categoryId,
                id: id!,
                name: nameState,
                description: descriptionState || "",
                quantity: currentQuantity!,
              });
            } catch (error) {
              console.error("Error updating quantity", error);
            }
          };

          updateQuantity();
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
