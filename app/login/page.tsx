"use client";

import { FieldValues, useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useUser, LoginData } from "../context/UserContext";
import Link from "next/link";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser } = useUser();

  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data as LoginData;

    try {
      await loginUser({ email, password });
    } catch (error) {
      console.error("Error logging in:", error);
    }

  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        className="space-y-6 sm:space-y-8 flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login</h2>

        <label className="input input-bordered flex items-center gap-2">
          <MdEmail className="text-white" />
          <input
            {...register("email", { required: true })}
            type="text"
            className="grow"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email é obrigatório</p>}
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaKey className="text-white" />
          <input
            {...register("password", { required: true })}
            type="password"
            className="grow"
            placeholder="Senha"
          />
          {errors.password && (
            <p className="text-red-500">Senha é obrigatória</p>
          )}
        </label>

        <p className="text-center">
          Não tem uma conta?{" "}
          <Link href="/register" className="link">
            Cadastre-se
          </Link>
        </p>

        <input type="submit" value="Entrar" className="btn" />
      </form>
    </div>
  );
}
