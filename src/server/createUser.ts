import { hash } from "node:crypto";

function createUser() {
  const enc = hash("sha256", "pass");
  console.log(enc);
}
createUser();
