"use client";

import { useQuery } from "@tanstack/react-query";
import { getEventsAction } from "../api/getEvents.action";

export function useEvents() {
    return useQuery({
        queryKey: ["events"],
        queryFn: () => getEventsAction(),
    });
}
