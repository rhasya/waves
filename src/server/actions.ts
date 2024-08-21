"use server";

import { hash } from "node:crypto";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { likes, users, waves } from "@/db/schema";
import { createSession, deleteSession, verifySession } from "@/server/session";

export async function actionCreate(payload: FormData) {
  const contents = payload.get("contents")!.toString();
  const session = await verifySession();

  if (contents && session.isAuth) {
    await db.insert(waves).values({ contents: contents, userId: session.userId, createdAt: new Date() }).execute();
    revalidatePath("/");
  }
}

export async function getWaves() {
  const session = await verifySession();

  const rows: {
    id: number;
    contents: string;
    like: boolean;
    like_count: number;
  }[] = await db.execute(sql`
    select waves.id, contents, users.name, case when likes.wave_id is not null then true else false end as "like"
         , cast((select count(1) from likes where wave_id = waves.id) as integer) as like_count
      from waves
      left join likes on (likes.wave_id = waves.id and likes.user_id = ${session.userId ?? -1})
      join users on (users.id = waves.user_id)
     order by created_at desc
  `);

  return rows.map(({ like_count, ...rest }) => ({ ...rest, likeCount: like_count }));
}

export async function actionLikeClick(waveId: number) {
  const session = await verifySession();

  const exist = await db
    .select()
    .from(likes)
    .where(and(eq(likes.waveId, waveId), eq(likes.userId, session.userId!)))
    .execute();

  if (exist.length > 0) {
    await db.delete(likes).where(and(eq(likes.userId, exist[0].userId), eq(likes.waveId, exist[0].waveId)));
  } else {
    await db.insert(likes).values({ userId: session.userId!, waveId: waveId });
  }

  revalidatePath("/");
}

export async function actionLogin(formData: FormData) {
  const { name, password } = Object.fromEntries(formData);
  const user = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.name, name as string),
        eq(users.password, hash("sha256", password as string)),
        eq(users.enable, true),
      ),
    );

  if (user.length > 0) {
    createSession(JSON.stringify({ username: name as string, userId: user[0].id }));
    redirect("/");
  } else {
    return { ok: false, statusCode: 401 };
  }
}

export async function actionLogout() {
  deleteSession();
  redirect("/");
}

export async function actionCreateUser(user: { name: string; password: string }) {
  await db.insert(users).values({ name: user.name, password: hash("sha256", user.password) });
  redirect("/");
}
