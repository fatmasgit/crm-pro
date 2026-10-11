"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase/client";

export function useReminderRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("reminders-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Reminder",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["reminders"],
          });

          queryClient.invalidateQueries({
            queryKey: ["lead-reminders"],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
