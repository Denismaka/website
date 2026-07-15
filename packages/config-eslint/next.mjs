import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Shared ESLint preset for every Next.js app in the monorepo.
 * Apps extend this instead of duplicating the Next.js rule set.
 */
export const nextConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "storybook-static/**"]),
]);

export default nextConfig;
