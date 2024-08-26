import axios, { AxiosResponse } from "axios";
import { baseUrl } from "./baseUrl";
import { Product } from "../types";

export default class ProductApi {
  static async getAll() {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(`${baseUrl}/user/all/product`);
      return response.data;
    } catch (error) {
      console.error(`Error in getAll products: ${error}`);
    }
  }

  static async getByCategoryId(categoryId: string) {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        `${baseUrl}/user/category/${categoryId}/product`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in getByCategoryPropsd: ${error}`);
    }
  }

  static async create(
    categoryId: string,
    name: string,
    description: string,
    quantity: number
  ) {
    try {
      const response = await axios.post(
        `${baseUrl}/user/category/${categoryId}/product`,
        {
          name,
          description,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in create product: ${error}`);
    }
  }

  static async update(
    categoryId: string,
    id: string,
    name: string,
    description: string,
    quantity: number
  ) {
    try {
      const response = await axios.put(
        `${baseUrl}/user/category/${categoryId}/product/${id}`,
        {
          name,
          description,
          quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in update product: ${error}`);
    }
  }
  static async delete(categoryId: string, id: string) {
    try {
      const response = await axios.delete(
        `${baseUrl}/user/category/${categoryId}/product/${id}`
      );
      return response.status === 200;
    } catch (error) {
      console.error(`Error in delete product: ${error}`);
    }
  }
}
