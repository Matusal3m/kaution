import axios from "axios";
import { baseUrl } from "./baseUrl";
import { User } from "../types";

export default class UserApi {
  static async login(email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}/user/user-login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(`Error logging in: ${error}`);
    }
  }

  static async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    //TODO: handle erros

    try {
      const response = await axios.post(`${baseUrl}/user/user-create`, {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error(`Error creating user: ${error}`);
      return {} as User;
    }
  }

  static async verifyEmail({ email, code }: { email: string; code: string }) {
    try {
      const response = await axios.post(`${baseUrl}/user/user-verify`, {
        email,
        code,
      });

      return response.data;
    } catch (error) {
      console.error(`Error verifying email: ${error}`);
      throw error;
    }
  }

  static async resendCode(email: string) {
    try {
      const response = await axios.post(`${baseUrl}/user/user-verify/resend`, {
        email,
      });

      return response.data;
    } catch (error) {
      console.error(`Error resending code: ${error}`);
    }
  }

  static async getSingleUser(userId: string) {
    try {
      const response = await axios.get(
        `${baseUrl}/user/user-profile/${userId}`
      );

      return response.data;
    } catch (error) {}
  }
}
