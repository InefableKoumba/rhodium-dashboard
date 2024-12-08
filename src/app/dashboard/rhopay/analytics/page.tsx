import TicketsChart from "@/components/admin/analytics/charts/tickets";
import UsersChart from "@/components/admin/analytics/charts/users";
import React from "react";

const eventsData = [
  { name: "Gros festival", total: 80 },
  { name: "Rock", total: 20 },
  { name: "Conférence", total: 10 },
  { name: "Fête de la musique", total: 50 },
  { name: "Festival de jazz", total: 30 },
  { name: "Conférence", total: 10 },
  { name: "Fête de la musique", total: 50 },
  { name: "Festival de jazz", total: 30 },
  { name: "Conférence", total: 10 },
  { name: "Fête de la musique", total: 50 },
];

export const usersData = [
  { name: "Inefable", total: 2 },
  { name: "Murphy", total: 1 },
  { name: "Mario Daty", total: 10 },
  { name: "Patrick", total: 5 },
  { name: "Dafney", total: 2 },
  { name: "Franz", total: 1 },
  { name: "Mario", total: 10 },
  { name: "Maurice", total: 5 },
  { name: "Cédrick", total: 2 },
  { name: "Nina", total: 1 },
];

export default function page() {
  return (
    <div className="p-12">
      <h2 className="text-2xl font-bold">Analytiques</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <TicketsChart data={eventsData} />
        <UsersChart data={usersData} />
      </div>
    </div>
  );
}
