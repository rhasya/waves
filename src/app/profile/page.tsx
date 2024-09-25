import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Main from "@/components/ui/Main";
import { verifySession } from "@/server/session";

export default async function Profile() {
  const { isAuth, username } = await verifySession();

  if (!isAuth) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <Main>
        <div className="mt-4">
          <h1 className="text-center text-2xl font-extrabold">Profile</h1>
          <p>Name: {username}</p>
        </div>
      </Main>
    </>
  );
}
