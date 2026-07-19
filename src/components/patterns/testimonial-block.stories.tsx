import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TestimonialBlock } from "./testimonial-block";

const meta: Meta<typeof TestimonialBlock> = {
  title: "Patterns/TestimonialBlock",
  component: TestimonialBlock,
  args: {
    // Storybook placeholder copy only — per the Phase 4 editorial rule, real
    // testimonials must be genuine and attributed; this is not one, and is
    // deliberately generic so it can't be mistaken for real content (the
    // original site's credibility problem was exactly an unverifiable quote
    // like this being presented as real).
    quote: "Example quote text — for reviewing this component's layout only, not real content.",
    author: "Jane Reviewer",
    role: "Design Lead",
    company: "Example Co.",
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TestimonialBlock>;

export const Default: Story = {};
export const LinkedToProject: Story = {
  args: { project: { title: "TCS TwinX", href: "#" } },
};
