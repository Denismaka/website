import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/widgets/navbar";
import { Footer } from "@/widgets/footer";
import { BackToTop } from "@/widgets/back-to-top";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Congo Developer Club",
    description:
        "La communauté de référence pour les développeurs en République Démocratique du Congo.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fr"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                <Providers>
                    <Navbar />
                    {children}
                    <Footer />
                    <BackToTop />
                </Providers>
            </body>
        </html>
    );
}
