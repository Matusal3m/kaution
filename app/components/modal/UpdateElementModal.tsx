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
    updateCategoryFields,
    categoryName,
    categoryId,
    removeCategoryElement,
  } = useCategory();

  const {
    productName,
    productDescription,
    productCategoryId,
    productId,
    productQuantity,
    removeProductElement,
    updateProductFields,
  } = useProduct();

  const { register, handleSubmit } = useForm<UpdateElementForm>();

  const [isSubmitting, setIsSubmiting] = useState<boolean>(false);

  const onSubmit = async (data: UpdateElementForm) => {
    // TODO: every empty field should have a value too, it need to be get from somewhere;
    setIsSubmiting(true);

    if (selectedElement === "category") {
      await CategoryApi.update({
        categoryId: categoryId,
        name: data.name,
        description: data.description,
      });
      updateCategoryFields(data.name);
    }

    if (selectedElement === "product") {
      await ProductApi.update({
        name: data.name,
        description: data.description,
        categoryId: productCategoryId,
        id: productId,
        quantity: productQuantity,
      });
      updateProductFields(data.name, data.description);
    }

    setIsSubmiting(false);
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

    setIsSubmiting(false);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selectedElement === "category" ? (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...(register("name"), { required: true })}
              defaultValue={categoryName}
            />
          </div>
          {/* TODO: if a description start to be used here, add it to the requerid fields and hooks */}
          {/*<div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
             <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("description")}
            /> 
          </div>
          */}
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
              defaultValue={productName}
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              defaultValue={productDescription}
              {...register("description")}
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
          onClick={handleDelete}
          disabled={isSubmitting}
        />
        <input type="button" value="Fechar" className="btn" />
      </div>
    </form>
  );
}
