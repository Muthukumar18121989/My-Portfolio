import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Link from "next/link";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "Button label" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

/**
 * Regression coverage for the PHASE-10.1.5 fix: a disabled Button wrapping a
 * next/link `<a>` via `asChild` must not be reachable by keyboard (removed
 * from the tab order) or clickable, even though anchors have no native
 * disabled state. Tab to this story and confirm focus skips straight past it.
 */
export const AsChildDisabledLink: Story = {
  render: (args) => (
    <Button {...args} asChild disabled>
      <Link href="#">Disabled link-button</Link>
    </Button>
  ),
};
