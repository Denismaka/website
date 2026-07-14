"use client";

import { useQuery } from "@tanstack/react-query";
import { getContributorsAction } from "../api/getContributors.action";
import { contributors as fallbackContributors } from "./contributors";

const ONE_HOUR = 60 * 60 * 1000;

export function useContributors() {
    return useQuery({
        queryKey: ["github-contributors"],
        queryFn: () => getContributorsAction(),
        staleTime: ONE_HOUR,
        // Show the last known-good snapshot immediately, then refetch real
        // data in the background instead of a loading skeleton.
        initialData: fallbackContributors,
        initialDataUpdatedAt: 0,
    });
}
