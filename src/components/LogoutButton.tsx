"use client";

import Button from "@/components/ui/Button";
import { actionLogout } from "@/server/actions";

export default function LogoutButton() {
  function handleClick() {
    actionLogout();
  }

  return (
    <Button type="button" variant="secondary" onClick={handleClick}>
      Sign Out
    </Button>
  );
}
