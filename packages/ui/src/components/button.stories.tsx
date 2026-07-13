import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
    title: "Button",
    component: Button,
    args: {
        children: "Nous rejoindre",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "secondary", "accent", "outline", "ghost", "link"],
        },
        size: {
            control: "select",
            options: ["default", "sm", "lg", "icon"],
        },
    },
};
export default meta;

type Story = StoryObj<typeof Button>;

// The four states called out in the architecture brief.
export const Default: Story = {};

export const Loading: Story = { args: { disabled: true, children: "Chargement…" } };

export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
    args: {
        children: (
            <>
                Nous rejoindre <ArrowRight />
            </>
        ),
    },
};

// Extra: the brand color variants available on top of the four states above.
export const Secondary: Story = { args: { variant: "secondary" } };
export const Accent: Story = { args: { variant: "accent" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
