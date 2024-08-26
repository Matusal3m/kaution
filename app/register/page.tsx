"use client";

import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import UserApi from "../api/UserApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await UserApi.create({
        name: email.split("@")[0],
        email,
        password,
      });

      console.log(`Usuario criado e tudo mais ${JSON.stringify(response)}`);
      // TODO: Arrumar o redirecionamento
      // O redirecionamento ta dando problema, talvez conflito com a Api, talvez seja a assincronidade, não sei não.
      router.push(`/verify-email/${email}`);
    } catch (error) {
      console.error(`Error creating user and sending email: ${error}`);
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
