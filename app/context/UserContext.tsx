"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserApi from "../api/UserApi";
import nookies from "nookies";

export interface UserContextType {
  getUserId: () => string;
  registerUser: (data: RegisterData) => Promise<void>;
  loginUser: (data: LoginData) => Promise<void>;
  logoutUser: () => void;
}

export interface RegisterData {
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const userId = nookies.get(null, "userId")["userId"];

    if (!userId) {
      router.push("/login");
    }
  }, []);

  const registerUser = async ({ email, password }: RegisterData) => {
    const user = await UserApi.create({
      name: email.split("@")[0],
      email,
      password,
    });

    if (!user.id) {
      throw new Error("Error creating user and sending email");
    }

    nookies.set(null, "userId", user.id, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    router.push(`/verify-email/${email}`);
  };

  const loginUser = async ({ email, password }: LoginData) => {
    const user = await UserApi.login(email, password);

    nookies.set(null, "userId", user.userID, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    router.push("/");
  };

  const getUserId = () => {
    const userId = nookies.get(null, "userId");
    return userId["userId"];
  };

  const logoutUser = () => {
    nookies.destroy(null, "userId");
  }

  return (
    <UserContext.Provider value={{ getUserId, registerUser, loginUser,logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
