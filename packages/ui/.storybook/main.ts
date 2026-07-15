import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: [],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    async viteFinal(viteConfig) {
        const { mergeConfig } = await import("vite");
        return mergeConfig(viteConfig, {
            plugins: [tailwindcss()],
        });
    },
};

export default config;
