import Link from "next/link";
import { buttonVariants } from "@/shared/ui";
import { TerminalPanel } from "./TerminalPanel";

export function Hero() {
    return (
        <section className="px-6 pt-40 pb-24 sm:pt-48">
            <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
                <div className="text-center lg:text-left">
                    <p className="hero-in font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground [animation-delay:0ms]">
                        La première communauté tech de RDC
                    </p>
                    <h1 className="hero-in mt-5 text-6xl font-extrabold tracking-tight text-balance [animation-delay:80ms] sm:text-7xl lg:text-8xl">
                        Code the future.
                    </h1>
                    <p className="hero-in mx-auto mt-6 max-w-xl text-xl text-muted-foreground text-balance [animation-delay:160ms] lg:mx-0">
                        Rassembler, former et propulser les talents tech de la
                        République Démocratique du Congo.
                    </p>
                    <div className="hero-in mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms] lg:justify-start">
                        <Link
                            href="#"
                            className={buttonVariants({ size: "lg" })}
                        >
                            Rejoindre le mouvement
                        </Link>
                        <Link
                            href="/activites"
                            className={buttonVariants({
                                variant: "outline",
                                size: "lg",
                            })}
                        >
                            Découvrir nos actions
                        </Link>
                    </div>
                </div>

                <div className="hero-in flex justify-center [animation-delay:200ms] lg:justify-end">
                    <TerminalPanel />
                </div>
            </div>
        </section>
    );
}
