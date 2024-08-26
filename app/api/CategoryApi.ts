import axios, { AxiosResponse } from "axios";
import { baseUrl } from "./baseUrl";
import { Category, CategoryProps, ProductProps } from "../types";
import ProductApi from "./ProductApi";

export default class CategoryApi {
  static async getAll() {
    try {
      const response: AxiosResponse<Category[]> = await axios.get(
        `${baseUrl}/user/all/category`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in getCategories: ${error}`);
      return [];
    }
  }

  static async getByUserId(userId: string) {
    try {
      const response: AxiosResponse<Category[]> = await axios.get(
        `${baseUrl}/user/${userId}/category`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in getByUserId: ${error}`);
      return [];
    }
  }

  static async create(userId: string, name: string, description: string) {
    try {
      const response = await axios.post(`${baseUrl}/user/${userId}/category`, {
        name,
        description,
      });
      return response.data;
    } catch (error) {
      console.error(`Error in createCategory: ${error}`);
    }
  }

  static async update(categoryId: string, name: string, description: string) {
    try {
      const response = await axios.put(
        `${baseUrl}/user/category/${categoryId}`,
        {
          name,
          description,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in updateCategory: ${error}`);
    }
  }

  static async delete(categoryId: string) {
    try {
      const response = await axios.delete(
        `${baseUrl}/user/category/${categoryId}`
      );
      return response.status === 200;
    } catch (error) {
      console.error(`Error in removeCategory: ${error}`);
    }
  }

  static async componentsData(userId?: string) {
    try {
      // const categories = await CategoryApi.getByUserId(userId);
      const categories = await CategoryApi.getAll();

      const dataPromises = categories.map(async (category) => {
        const products = await ProductApi.getByCategoryId(category.id);
        return {
          name: category.name,
          products: products ?? [],
        };
      });

      const data = await Promise.all(dataPromises);
      return data;
    } catch (error) {
      console.error(`Error creating components data: ${error}`);
      return [];
    }
  }
}
