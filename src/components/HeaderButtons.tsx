import { Settings } from "lucide-react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import LinkButton from "@/components/ui/LinkButton";
import { verifySession } from "@/server/session";

export default async function HeaderButtons() {
  const { isAuth, username } = await verifySession();

  return (
    <div className="flex h-full grow basis-0 items-center justify-end gap-4">
      {isAuth ? (
        <>
          {username === "admin" && (
            <Link href="/admin">
              <Settings />
            </Link>
          )}
          <Link href="/profile">{username}</Link>
          <LogoutButton />
        </>
      ) : (
        <LinkButton href="/login" variant="secondary">
          Sign In
        </LinkButton>
      )}
    </div>
  );
}
