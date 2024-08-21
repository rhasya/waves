"use client";

import { actionLogout } from "@/server/actions";
import Button from "@/components/ui/Button";

export default function LogoutButton() {
  function handleClick() {
    actionLogout();
  }

  return <Button onClick={handleClick}>Sign Out</Button>;
}
