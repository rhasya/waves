import Link from "next/link";
import { verifySession } from "@/server/session";
import LogoutButton from "@/components/LogoutButton";

export default async function HeaderButtons() {
  const { isAuth, name } = await verifySession();

  if (isAuth) {
    return (
      <div className="flex w-[120px] items-center justify-end gap-4">
        {name}
        <LogoutButton />
      </div>
    );
  } else {
    return (
      <div className="flex w-[120px] items-center justify-end gap-4">
        <Link className="flex h-9 items-center rounded border px-3" href={"/login"}>
          Sign In
        </Link>
      </div>
    );
  }
}
