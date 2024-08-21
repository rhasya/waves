import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { verifySession } from "@/server/session";
import LinkButton from "@/components/ui/LinkButton";

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
        <LinkButton href="/login" variant="secondary">
          Sign In
        </LinkButton>
      )}
    </div>
  );
}
