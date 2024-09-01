"use client";

import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";
import CategoryApi from "@/app/api/CategoryApi";
import { Category, Product } from "@/app/types";
import { useUser } from "@/app/context/UserContext";
import ProductApi from "@/app/api/ProductApi";
import { useEffect, useState } from "react";
import { useCategory } from "@/app/context/CategoryContext";

interface CreateElementForm {
  name: string;
  description: string;
}

export default function CreateModal() {
  const { setIsOpen } = useModal();
  const { getUserId } = useUser();
  const { fetchCategoriesData, setReloadCategories } = useCategory();
  
  const userId = getUserId();
  
  const [option, setOption] = useState<"category" | "product">("category");
  const [categoriesData, setCategoriesData] = useState<
    Array<{ name: string; products: Product[]; id: string }>
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategoriesData();
      setCategoriesData(data);
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: any) => {
    try {
      if (option === "category") {
        await CategoryApi.create({
          userId,
          name: data.name,
          description: data.description,
        });
      } else {
        await ProductApi.create({
          categoryId: data.categoryId,
          name: data.name,
          description: data.description,
          quantity: data.quantity,
        });
      }
      const categories = await CategoryApi.componentsData(userId);
      setCategoriesData(categories);
    } catch (error) {
      console.error(error);
    } finally {
      setReloadCategories(true);
      handleClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Option</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={option}
          onChange={(e) => setOption(e.target.value as "category" | "product")}
        >
          <option value="category">Category</option>
          <option value="product">Product</option>
        </select>
      </div>
      {option === "category" ? (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-error">A categoria precisa de um nome</p>
            )}
          </div>
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
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-error">O produto precisa de um nome</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Descrição</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              {...register("description", { required: false })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full max-w-xs"
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <p className="text-error">Quantity is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              {...register("categoryId", { required: true })}
            >
              <option value="">Selecione uma categoria</option>
              {categoriesData.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-error">Category is required</p>
            )}
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
