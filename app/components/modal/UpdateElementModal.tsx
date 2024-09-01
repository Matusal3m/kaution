"use client";

import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";
import CategoryApi from "@/app/api/CategoryApi";
import ProductApi from "@/app/api/ProductApi";
import { useCategory } from "@/app/context/CategoryContext";
import { useState } from "react";
import { useProduct } from "@/app/context/ProductContext";

interface UpdateElementForm {
  name: string;
  description: string;
}

export default function UpdateModal() {
  const { setIsOpen, selectedElement } = useModal();
  const {
    categoryName,
    categoryId,
    removeCategoryElement,
    updateCategoryStates,
  } = useCategory();
  const {
    productName,
    productDescription,
    productCategoryId,
    productId,
    productQuantity,
    removeProductElement,
    updateProductStates,
  } = useProduct();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateElementForm>();

  const onSubmit = async (data: UpdateElementForm) => {
    if (selectedElement === "category") {
      await CategoryApi.update({
        categoryId: categoryId,
        name: data.name,
        description: data.description,
      });

      updateCategoryStates(data.name);
    }

    if (selectedElement === "product") {
      await ProductApi.update({
        name: data.name,
        description: data.description,
        categoryId: productCategoryId,
        id: productId,
        quantity: productQuantity,
      });
      updateProductStates(data.name, data.description);
    }

    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedElement === "category") {
      await CategoryApi.delete(categoryId);
      removeCategoryElement();
    }

    // TODO: handle this
    if (selectedElement === "product") {
      await ProductApi.delete(categoryId, productId);
      removeProductElement();
    }

    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selectedElement === "category" ? (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("name", { required: true })}
              defaultValue={categoryName}
            />
          </div>
          {/* TODO: if a description start to be used here, add it to the requerid fields and hooks */}
        </>
      ) : (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              defaultValue={productName}
              {...register("name", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Descrição</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              defaultValue={productDescription}
              {...register("description", { required: true })}
            />
          </div>
        </>
      )}
      {(errors.description || errors.name) && (
        <p className="text-red-500">Preencha todos os campos</p>
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
          onClick={handleDelete}
          disabled={isSubmitting}
        />
        <input
          type="button"
          value="Fechar"
          className="btn"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </form>
  );
}
