import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import UserTable from "./UserTable";
import Header from "@/components/Header";
import Main from "@/components/ui/Main";
import { actionGetUsers, actionUserEnableUpdate } from "@/server/actions";
import { verifySession } from "@/server/session";

export default async function Admin() {
  const { username } = await verifySession();

  if (username !== "admin") {
    redirect("/");
  }

  const users = actionGetUsers();

  async function actionUpdate(id: number) {
    "use server";
    await actionUserEnableUpdate(id);
    revalidatePath("/admin");
  }

  return (
    <>
      <Header />
      <Main>
        <div className="mt-4">
          <h1 className="text-center text-2xl font-extrabold">Admin</h1>
        </div>
        <div className="mt-4">
          <UserTable usersPromise={users} actionUpdate={actionUpdate} />
        </div>
      </Main>
    </>
  );
}
