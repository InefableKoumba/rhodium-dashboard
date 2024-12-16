import UsersChart from "@/components/admin/analytics/charts/users";
import React from "react";
import { usersData } from "../analytics/page";
import UsersList from "@/components/admin/rhopay/users-list";

export default async function page() {
  return (
    <div className="p-8">
      <UsersChart data={usersData} />
      <UsersList />
    </div>
  );
}
