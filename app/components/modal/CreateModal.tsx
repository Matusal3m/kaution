"use client";

import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import CategoryApi from "@/app/api/CategoryApi";
import { Category, Product } from "@/app/types";
import { useUser } from "@/app/context/UserContext";
import ProductApi from "@/app/api/ProductApi";

export default function CreateModal() {
  const { openModal, setOpenModal } = useModal();
  const { userId } = useUser();

  const [option, setOption] = useState<string>("category");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState([] as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Efeito para fechar o modal quando openModal for falso

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await CategoryApi.getByUserId(userId);
      setCategories(categories);
    };

    const modalElement = document.getElementById("modal") as HTMLDialogElement;
    if (modalElement) {
      if (openModal) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }

    fetchCategories();
  }, [openModal]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      name,
      description,
      quantity,
      categoryId,
      categories,
      isSubmitting,
    });

    setIsSubmitting(true);
    if (option === "category") {
      await CategoryApi.create(userId, name, description);
    } else {
      await ProductApi.create(categoryId, name, description, quantity);
    }
    setIsSubmitting(false);
    handleClose();
  };
  //TODO: conseguir o valor de id da categoria.
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Option</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="category">Category</option>
          <option value="product">Product</option>
        </select>
      </div>
      {option === "category" ? (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full max-w-xs"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={categoryId}
              onChange={(e) => {
                console.log("id da categoria mudado");
                setCategoryId(e.target.value);
              }}
            >
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <div className="modal-action">
        <input
          type="submit"
          className="btn"
          value="Criar"
          disabled={isSubmitting}
        />
        <input
          type="button"
          value="Fechar"
          className="btn"
          onClick={handleClose}
        />
      </div>
    </form>
  );
}
