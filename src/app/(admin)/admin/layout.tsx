import QueryProvider from "@/app/components/queryProvider";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { Analytics } from "@vercel/analytics/next";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth0Provider >
      <div>
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
      </div>
    </Auth0Provider>
  );
}
