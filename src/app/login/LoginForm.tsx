"use client";

import { useId } from "react";
import { actionLogin } from "@/server/actions";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const nameId = useId();
  const passwordId = useId();

  function preAction(payload: FormData) {
    const { name, password } = Object.fromEntries(payload);
    if (name && password) {
      actionLogin(payload)
        .then((res) => {
          if (!res.ok) {
            alert("Unauthorized.");
          }
        })
        .catch((error) => {});
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
        <button className="h-9 rounded border bg-slate-600 text-white">Sign In</button>
        <Button>Create Account</Button>
      </div>
    </form>
  );
}
