"use client";

import { FormEvent, useState } from "react";
import { FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import UserApi from "../api/UserApi";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useUser();
  const router = useRouter();

const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const user = await UserApi.login(email, password);

      setUserId(user.id);

      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        className="space-y-6 sm:space-y-8 flex flex-col justify-center"
        onSubmit={handleLogin}
      >
        <h2>Login</h2>

        <label className="input input-bordered flex items-center gap-2">
          <MdEmail className="text-white" />
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaKey className="text-white" />
          <input
            type="password"
            className="grow"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <input type="submit" value="Entrar" className="btn" />
      </form>
    </div>
  );
}
