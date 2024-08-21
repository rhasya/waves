"use client";

import { type ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

const linkVar = cva(
  "flex items-center justify-center h-9 rounded border px-3 disabled:pointer-events-none font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-slate-600 text-white hover:bg-slate-600/90",
        secondary: "hover:bg-slate-100",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface LinkProps extends VariantProps<typeof linkVar> {
  className?: string;
  children: ReactNode;
  href: string;
}

export default function LinkButton({ className, children, href, variant }: LinkProps) {
  return (
    <Link href={href} className={linkVar({ variant, className })}>
      {children}
    </Link>
  );
}
