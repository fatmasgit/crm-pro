
"use client";

import { LogOut } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Profile } from "@/generated/prisma/client";
import supabase from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function NavUser({ user }: { user: Profile }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-2">
          {/* User information */}
          <SidebarMenuButton
            size="lg"
            className="min-h-14 cursor-default rounded-2xl border border-slate-200 bg-white px-3 text-slate-700 shadow-sm hover:bg-white hover:text-slate-700"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={user.avatarUrl ?? undefined}
                alt={user.name}
              />
              <AvatarFallback className="rounded-lg bg-slate-100 text-slate-600">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.name}
              </span>
              <span className="truncate text-xs text-slate-500">
                {user.email}
              </span>
            </div>
          </SidebarMenuButton>

          {/* Logout button */}
          <SidebarMenuButton
            size="lg"
            onClick={handleLogout}
            className="justify-center rounded-2xl border border-slate-200 bg-white px-3 text-slate-700 shadow-sm hover:bg-slate-50 "
          >
            <LogOut className="size-6" />
            <span className="font-medium">Log out</span>
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
