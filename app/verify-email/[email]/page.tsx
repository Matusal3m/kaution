"use client";

import { FormEvent, useState } from "react";
import UserApi from "@/app/api/UserApi";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { email: string } }) {
  const email = params.email.replace("%40", "@");
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await UserApi.verifyEmail({ email, code });

      router.push("/");
    } catch (error) {
      console.error(`Error verifing user email: ${error}`);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        className="space-y-6 sm:space-y-8 flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label className="space-y-6 sm:space-y-8 flex flex-col justify-center items-center">
          Coloque o código de verificação:
          <input
            type="tel"
            value={code}
            onChange={(event) => {
              const value = event.target.value;
              if (isNaN(parseInt(value))) return;
              setCode(value);
            }}
            maxLength={4}
            className="input input-bordered w-full max-w-xs text-center"
          />
        </label>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}
