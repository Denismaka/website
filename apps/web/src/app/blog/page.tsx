import type { Metadata } from "next";
import { BlogView } from "@/views/blog";

export const metadata: Metadata = {
    title: "Blog — Congo Developer Club",
    description: "Tutoriels, retours d'événements et actualités du Congo Developer Club.",
};

export default function Page() {
    return <BlogView />;
}
