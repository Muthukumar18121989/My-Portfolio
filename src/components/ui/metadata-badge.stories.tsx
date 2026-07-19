import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetadataBadge } from "./metadata-badge";

const meta: Meta<typeof MetadataBadge> = {
  title: "Primitives/MetadataBadge",
  component: MetadataBadge,
};
export default meta;

type Story = StoryObj<typeof MetadataBadge>;

export const Role: Story = { args: { children: "Lead UX" } };
export const Type: Story = { args: { children: "AI Platform" } };
export const Tool: Story = { args: { children: "Figma" } };
export const Group: Story = {
  render: () => (
    <div className="flex gap-2.5">
      <MetadataBadge>Lead UX</MetadataBadge>
      <MetadataBadge>AI Platform</MetadataBadge>
      <MetadataBadge>Figma</MetadataBadge>
    </div>
  ),
};
