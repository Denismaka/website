"use client";

import { useMutation } from "@tanstack/react-query";
import { joinCommunityAction } from "../api/join.action";

/** Mutation (write) — this is what TanStack Query is for; never Zustand. */
export function useJoinCommunity() {
    return useMutation({
        mutationFn: (email: string) => joinCommunityAction(email),
    });
}
