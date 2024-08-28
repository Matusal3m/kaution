"use client";

import {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export const UserContext = createContext(
  {} as { userId: string; setUserId: Dispatch<SetStateAction<string>> }
);

export function UserProvider({ children }: any) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") ?? "";
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (userId) {
        localStorage.setItem("userId", userId);
      } else {
        localStorage.removeItem("userId"); // Remove userId do localStorage se estiver vazio
      }
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
