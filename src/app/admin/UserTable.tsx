"use client";

import { use } from "react";
import { cx } from "class-variance-authority";
import { users } from "@/db/schema";

type UserTableProps = {
  usersPromise: Promise<(typeof users.$inferSelect)[]>;
  actionUpdate: (id: number) => Promise<void>;
};

export default function UserTable({ usersPromise, actionUpdate }: UserTableProps) {
  const users = use(usersPromise);

  async function handleEnableClick(id: number) {
    await actionUpdate?.(id);
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="h-10 w-[60px] border-b border-b-gray-400">ID</th>
          <th className="h-10 border-b border-b-gray-400">Username</th>
          <th className="h-10 w-[60px] border-b border-b-gray-400">Enable</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="h-10 border-b text-center">{user.id}</td>
            <td className="h-10 border-b px-2">{user.name}</td>
            <td className="h-10 border-b text-center">
              <button
                type="button"
                className={cx("rounded border px-2 py-0.5", user.enable && "bg-blue-50")}
                onClick={handleEnableClick.bind(null, user.id)}
              >
                {user.enable ? "Y" : "N"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
