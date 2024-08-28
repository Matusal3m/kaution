"use client";

import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import CategoryApi from "@/app/api/CategoryApi";
import { useUser } from "@/app/context/UserContext";
import ProductApi from "@/app/api/ProductApi";

export default function UpdateModal({
  categoryId,
  isCategory,
}: {
  categoryId: string;
  isCategory: boolean;
}) {
  const { openModal, setOpenModal } = useModal();
  const { userId } = useUser();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productId, setProductId] = useState<string>("");
  // Efeito para fechar o modal quando openModal for falso

  useEffect(() => {
    const fetchId = async () => {
      const products = await ProductApi.getByCategoryId(categoryId);

      const productId = products?.filter((product) => {
        return product.name === name;
      })[0].id;

      //TODO: colocar um erro aqui.
      setProductId(productId!);
    };

    fetchId();
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
      isSubmitting,
    });

    setIsSubmitting(true);
    if (isCategory) {
      await CategoryApi.update(userId, name, description);
    } else {
      await ProductApi.update(
        productId,
        categoryId,
        name,
        description,
        quantity
      );
    }
    setIsSubmitting(false);
    handleClose();
  };
  //TODO: conseguir o valor de id da categoria.
  return (
    <form onSubmit={handleSubmit}>
      {isCategory ? (
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
        </>
      )}
      <div className="modal-action">
        <input
          type="submit"
          className="btn"
          value="Atualizar"
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
