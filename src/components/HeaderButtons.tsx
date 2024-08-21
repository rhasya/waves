import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { verifySession } from "@/server/session";

export default async function HeaderButtons() {
  const { isAuth, username } = await verifySession();

  return (
    <div className="flex h-full grow basis-0 items-center justify-end gap-4">
      {isAuth ? (
        <>
          <span>{username}</span>
          <LogoutButton />
        </>
      ) : (
        <Link
          className="flex h-9 items-center rounded border px-3 hover:bg-slate-100 disabled:pointer-events-none"
          href={"/login"}
        >
          Sign In
        </Link>
      )}
    </div>
  );
}
