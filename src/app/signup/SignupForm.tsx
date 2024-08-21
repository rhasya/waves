"use client";

import { useId, useState } from "react";
import { z, ZodError } from "zod";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import TextField from "@/components/ui/TextField";
import { actionCreateUser } from "@/server/actions";
import { redirect } from "next/navigation";

const createAccountSchema = z.object({
  name: z.string().min(1, "Name is required."),
  password: z.string().min(1, "Password is required."),
  passwordConfirm: z.string().min(1, "Password confirm is required."),
});

export default function SignupForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const nameId = useId();
  const passwordId = useId();
  const passwordConfirmId = useId();

  async function action(formData: FormData) {
    try {
      const u = createAccountSchema.parse(Object.fromEntries(formData));
      if (u.password !== u.passwordConfirm) {
        setError("Password and confirm are different.");
        return;
      }

      setPending(true);
      try {
        await actionCreateUser(u);
      } finally {
        setPending(false);
      }
    } catch (e) {
      if (e instanceof ZodError) {
        setError(e.errors[0].message);
      } else {
        console.error(e);
      }
    }
  }

  return (
    <form
      action={action}
      className="contents data-[pending]:pointer-events-none"
      data-pending={pending ? "" : undefined}
    >
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
      <div className="text-sm text-red-600">{error}</div>
    </form>
  );
}
