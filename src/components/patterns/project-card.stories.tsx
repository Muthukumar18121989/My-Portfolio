import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCard } from "./project-card";

const meta: Meta<typeof ProjectCard> = {
  title: "Patterns/ProjectCard",
  component: ProjectCard,
  args: {
    href: "#",
    title: "TCS TwinX",
    role: "Lead UX",
    type: "AI Platform",
    description: "Interface for simulating enterprise decisions before committing to them.",
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Standard: Story = {};
export const Locked: Story = {
  args: {
    title: "Euroclear Bank",
    role: "Senior UX",
    type: "Fin. Infra",
    locked: true,
    // Demonstrates the integration point only — the real request flow is Phase 11 scope.
    onRequestAccess: (href) => console.log("Request access for", href),
  },
};
