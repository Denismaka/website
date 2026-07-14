import type { Metadata } from "next";
import { AboutView } from "@/views/about";

export const metadata: Metadata = {
    title: "À propos — Congo Developer Club",
    description: "Pourquoi le Congo Developer Club existe, nos valeurs et nos jalons.",
};

export default function Page() {
    return <AboutView />;
}
