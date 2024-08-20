"use client";

import { useActionState } from "react";
import { Pen } from "lucide-react";
import LoadingButton from "@/components/ui/LoadingButton";
import { actionCreate } from "@/server/actions";

export default function WaveWriter() {
  const [state, action, pending] = useActionState(preActionCreate, {});

  async function preActionCreate(prevState: any, formData: FormData) {
    const { contents } = Object.fromEntries(formData);
    if (contents) {
      await actionCreate(formData);
    }
    return null;
  }

  return (
    <div
      className="flex items-center gap-4 rounded border p-4 data-[disabled]:bg-gray-100"
      data-disabled={pending ? "" : undefined}
    >
      <form className="contents" action={action}>
        <input
          className="w-full outline-none disabled:bg-transparent"
          placeholder="지금의 기분은?"
          name="contents"
          autoComplete="off"
          disabled={pending}
        />
        <LoadingButton>
          <Pen className="h-4 w-4" />
        </LoadingButton>
      </form>
    </div>
  );
}
