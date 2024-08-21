"use client";

import React, { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

const buttonVar = cva("h-9 rounded border px-3 font-medium disabled:pointer-events-none transition-colors", {
  variants: {
    variant: {
      primary: "bg-slate-600 text-white hover:bg-slate-600/90",
      secondary: "hover:bg-slate-100 text-black",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children" | "className" | "onClick">,
    VariantProps<typeof buttonVar> {}

export default function Button({ children, className, type, variant, onClick }: ButtonProps) {
  return (
    <button type={type} className={buttonVar({ variant, className })} onClick={onClick}>
      {children}
    </button>
  );
}
