import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return <main className="mx-auto max-w-[480px]">{children}</main>;
}
