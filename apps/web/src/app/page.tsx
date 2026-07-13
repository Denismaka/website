export default function Home() {
    return (
        <main className="flex-1 flex items-center justify-center text-center px-6" style={{ paddingTop: "9rem", minHeight: "80vh" }}>
            <div className="w-full max-w-3xl mx-auto">
                <p className="text-sm" style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}>
                    THE FIRST TECH COMMUNITY IN DRC
                </p>
                <h1
                    className="font-extrabold wrap-break-word text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                    style={{ letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                    Code the future.
                </h1>
            </div>
        </main>
    );
}
