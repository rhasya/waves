"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LoadingButton({
  children,
  disabled,
  ...rest
}: Omit<React.ComponentProps<typeof Button>, "type">) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled} {...rest}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}
