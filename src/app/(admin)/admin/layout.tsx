import QueryProvider from "@/app/components/queryProvider";
import { Analytics } from "@vercel/analytics/next";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <QueryProvider>{children}</QueryProvider>
      <Analytics />
    </div>
  );
}
