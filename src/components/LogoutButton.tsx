"use client";

import { actionLogout } from "@/server/actions";

export default function LogoutButton() {
  function handleClick() {
    actionLogout();
  }

  return (
    <button className="h-9 rounded border px-3" onClick={handleClick}>
      Sign Out
    </button>
  );
}
