import { db } from "@/db";
import { hash, verify } from "node:crypto";
import { users } from "@/db/schema";

function createUser() {
  const enc = hash("sha256", "pass");
  db.insert(users).values({ name: "system", password: enc }).execute();
}

createUser();
