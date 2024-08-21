import { Waves } from "lucide-react";
import Link from "next/link";
import HeaderButtons from "@/components/HeaderButtons";

export default function Header() {
  return (
    <header className="flex h-[60px] items-center justify-between px-4 shadow-md">
      <div className="hidden h-full grow basis-0 sm:block"></div>
      <div>
        <Link href="/">
          <Waves className="h-10 w-10" />
        </Link>
      </div>
      <HeaderButtons />
    </header>
  );
}
