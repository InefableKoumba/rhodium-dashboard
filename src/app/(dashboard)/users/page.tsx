import UsersTable from "@/components/tables/users-table";
import React from "react";
import { getUsers } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function page() {
  const { users, total } = await getUsers();
  return (
    <div className="p-8">
      <UsersTable users={users} total={total} />
    </div>
  );
}
