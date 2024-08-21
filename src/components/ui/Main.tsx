import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return <main className="mx-auto min-h-[calc(100vh-100px)] max-w-[480px]">{children}</main>;
}
