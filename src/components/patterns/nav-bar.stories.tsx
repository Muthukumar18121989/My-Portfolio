import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavBar } from "./nav-bar";

const meta: Meta<typeof NavBar> = {
  title: "Patterns/NavBar",
  component: NavBar,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof NavBar>;

export const Desktop: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
