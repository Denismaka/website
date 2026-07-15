import type { Metadata } from "next";
import { ActivitiesView } from "@/views/activities";

export const metadata: Metadata = {
    title: "Activités — Congo Developer Club",
    description: "Bootcamps, hackathons, meetups, mentorat et contribution open source.",
};

export default function Page() {
    return <ActivitiesView />;
}
