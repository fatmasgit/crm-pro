"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleMagicLink = async () => {
            const hash = window.location.hash;

            const params = new URLSearchParams(hash.substring(1));

            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");

            if (!accessToken || !refreshToken) {
                router.push("/login");
                return;
            }

            const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            });

            if (error) {
                console.error("Magic link error:", error);
                router.push("/login");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        };

        handleMagicLink();
    }, [router]);

    return (
        <div className="flex justify-center items-center h-screen">
            <Button disabled>
                Logging you in...
            </Button>
        </div>
    );
}