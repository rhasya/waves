"use client";

import { useId } from "react";
import { z } from "zod";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import TextField from "@/components/ui/TextField";

const createAccountSchema = z.object({
  name: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
});

export default function SignupForm() {
  const nameId = useId();
  const passwordId = useId();
  const passwordConfirmId = useId();

  function action(formData: FormData) {
    try {
      const f = createAccountSchema.parse(Object.fromEntries(formData));
      if (f.password !== f.passwordConfirm) {
        throw new Error("Password and confirm are different.");
      }
      // TODO: call server action
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form action={action} className="contents">
      <h1 className="text-center text-3xl font-bold">Create Account</h1>
      <div className="grid grid-cols-5 items-center gap-x-2 gap-y-4">
        <label htmlFor={nameId} className="text-right">
          NAME
        </label>
        <TextField type="text" id={nameId} name="name" className="col-span-4" />
        <label htmlFor={passwordId} className="text-right">
          PASSWORD
        </label>
        <TextField type="password" id={passwordId} name="password" className="col-span-4" />
        <label htmlFor={passwordConfirmId} className="text-right">
          CONFIRM
        </label>
        <TextField type="password" id={passwordConfirmId} name="passwordConfirm" className="col-span-4" />
      </div>
      <div className="flex flex-col gap-2">
        <Button type="submit">Create</Button>
        <LinkButton href="/login" variant="secondary">
          Cancel
        </LinkButton>
      </div>
    </form>
  );
}
