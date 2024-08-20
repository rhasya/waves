"use client";

import { useId } from "react";
import { actionLogin } from "@/server/actions";

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
        <input type="text" id={nameId} name="name" className="col-span-4 border px-2 py-1" />
        <label htmlFor={passwordId} className="text-right">
          PASSWORD
        </label>
        <input type="password" id={passwordId} name="password" className="col-span-4 border px-2 py-1" />
      </div>
      <div className="flex flex-col gap-2">
        <button className="h-9 rounded border bg-slate-600 text-white">Sign In</button>
        <button className="h-9 rounded border">Create Account</button>
      </div>
    </form>
  );
}
