"use client";

import { useId, useState } from "react";
import { z, ZodError } from "zod";

import LinkButton from "@/components/ui/LinkButton";
import LoadingButton from "@/components/ui/LoadingButton";
import TextField from "@/components/ui/TextField";
import { actionLogin } from "@/server/actions";

const userSchema = z.object({
  name: z.string().min(1, "Name is required."),
  password: z.string().min(1, "Password is requred."),
});

export default function LoginForm() {
  const [error, setError] = useState("");

  const nameId = useId();
  const passwordId = useId();

  function preAction(payload: FormData) {
    try {
      const u = userSchema.parse(Object.fromEntries(payload));

      actionLogin(u).then((res) => {
        if (res?.ok === false) {
          alert("Unauthorized.");
        }
      });
    } catch (e) {
      if (e instanceof ZodError) {
        setError(e.errors[0].message);
      } else {
        console.error(e);
      }
    }
  }

  return (
    <form action={preAction} className="contents">
      <h1 className="text-center text-3xl font-bold">Sign In</h1>
      <div className="grid grid-cols-5 grid-rows-2 items-center gap-x-2 gap-y-4">
        <label htmlFor={nameId} className="text-right">
          NAME
        </label>
        <TextField type="text" id={nameId} name="name" className="col-span-4" />
        <label htmlFor={passwordId} className="text-right">
          PASSWORD
        </label>
        <TextField type="password" id={passwordId} name="password" className="col-span-4" />
      </div>
      <div className="flex flex-col gap-2">
        <LoadingButton>Sign In</LoadingButton>
        <LinkButton href="/signup" variant="secondary">
          Create Account
        </LinkButton>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
    </form>
  );
}
