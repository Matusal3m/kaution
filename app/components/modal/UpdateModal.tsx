"use client";

import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import CategoryApi from "@/app/api/CategoryApi";
import { useUser } from "@/app/context/UserContext";
import ProductApi from "@/app/api/ProductApi";

export default function UpdateModal() {
  const {
    isOpen,
    setIsOpen,
    categoryId,
    isCategory,
    nameState,
    setNameState,
    quantityState,
    descriptionState,
    setDescriptionState,
    productId,
    setProductId,
    element,
  } = useModal();
  const { userId } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Efeito para fechar o modal quando isOpen for falso

  useEffect(() => {
    if (isCategory) return;

    const fetchId = async () => {
      console.log({
        categoryId,
        nameState,
      });

      const products = await ProductApi.getByCategoryId(categoryId!);

      console.log({ products });

      const productId = products?.filter((product) => {
        return product.name === nameState;
      })[0].id;
      console.log({ productId });
      //TODO: colocar um erro aqui.
      setProductId!(productId!);
    };

    fetchId();
  }, [categoryId, isCategory, isOpen, nameState, setProductId]);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      productId,
      categoryId,
      nameState,
      descriptionState,
      quantityState,
    });

    setIsSubmitting(true);
    if (isCategory) {
      await CategoryApi.update(userId, nameState!, descriptionState!);
    } else {
      await ProductApi.update({
        id: productId!,
        categoryId: categoryId!,
        name: nameState!,
        description: descriptionState || "",
        quantity: quantityState || 0,
      });
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
              value={nameState}
              onChange={(e) => setNameState!(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={descriptionState!}
              onChange={(e) => setDescriptionState!(e.target.value)}
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
              value={nameState}
              onChange={(e) => setNameState!(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={descriptionState}
              onChange={(e) => setDescriptionState!(e.target.value)}
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
          value="Excluir"
          className="btn btn-error"
          onClick={() => {
            if (isCategory) {
              CategoryApi.delete(categoryId!);
            } else {
              ProductApi.delete(categoryId!, productId!);
            }
            element!.remove();
            handleClose();
          }}
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
