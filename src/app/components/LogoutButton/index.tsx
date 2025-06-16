"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const LogoutButton: React.FC = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="User menu"

          className="rounded-full focus:outline-none cursor-pointer addButton"
        >
          {user?.picture && (
            <Image
              title={user.name}
              src={user.picture}
              alt={user.name ?? "User avatar"}
              width={32}
              height={32}
              className="rounded-full aspect-square"
            />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <div className="px-3 py-1.5 text-sm font-medium text-gray-700">
          {user?.name ?? "User"}
        </div>
        <DropdownMenuItem asChild>
          <Link href="/auth/logout">
            <Button variant="ghost" className="w-full justify-start">
              Logout
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutButton;
