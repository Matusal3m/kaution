"use client";

import { FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FieldValues, useForm } from "react-hook-form";
import { useUser, RegisterData } from "../context/UserContext";


export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { registerUser } = useUser();

  const handleRegister = async (data: FieldValues) => {
    const { email, password } = data as RegisterData;

    try {
      await registerUser({ email, password });
    } catch (error) {
      console.error(`${error}`);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        className="space-y-6 sm:space-y-8 flex flex-col justify-center"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h2>Register</h2>

        <label className="input input-bordered flex items-center gap-2">
          <MdEmail className="text-white" />
          <input
            {...register("email")}
            type="text"
            className="grow"
            placeholder="Email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaKey className="text-white" />
          <input
            {...register("password")}
            type="password"
            className="grow"
            placeholder="Senha"
          />
        </label>

        <input type="submit" value="Entrar" className="btn" />
        <p className="text-center">
          Já tem uma conta?{" "}
          <a href="/login" className="link">
            Faça login
          </a>
        </p>
      </form>
    </div>
  );
}
