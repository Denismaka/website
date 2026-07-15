import type { Preview } from "@storybook/react-vite";
import "../../../apps/web/src/app/globals.css";

const preview: Preview = {
    parameters: {
        backgrounds: {
            default: "paper",
            values: [
                { name: "paper", value: "#ffffff" },
                { name: "dark", value: "#0b0f14" },
            ],
        },
    },
};

export default preview;
