import React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
