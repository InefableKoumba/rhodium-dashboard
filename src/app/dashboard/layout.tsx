import React from "react";
import "../globals.css";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}
