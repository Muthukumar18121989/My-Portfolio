import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimelineItem } from "./timeline-item";

const meta: Meta<typeof TimelineItem> = {
  title: "Patterns/TimelineItem",
  component: TimelineItem,
  args: {
    role: "Lead UX Designer",
    company: "TATA Consultancy Services",
    dateRange: "2021 – Present",
    achievements: [
      "Leads UX strategy and design execution for enterprise platforms, including TwinX.",
      "Mentors designers and strengthens shared design-system practice.",
    ],
  },
  decorators: [
    (Story) => (
      <ol className="max-w-xl border-l-2 border-border pl-2">
        <Story />
      </ol>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TimelineItem>;

export const Default: Story = {};
export const WithRelatedProjects: Story = {
  args: {
    relatedProjects: [{ title: "TCS TwinX case study", href: "#" }],
  },
};
