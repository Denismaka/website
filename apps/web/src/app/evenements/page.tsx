import type { Metadata } from "next";
import { EventsView } from "@/views/events";

export const metadata: Metadata = {
    title: "Événements — Congo Developer Club",
    description: "L'agenda des hackathons, bootcamps et meetups du Congo Developer Club.",
};

export default function Page() {
    return <EventsView />;
}
