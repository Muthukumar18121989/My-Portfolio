import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleCard } from "./article-card";

const meta: Meta<typeof ArticleCard> = {
  title: "Patterns/ArticleCard",
  component: ArticleCard,
  args: {
    href: "#",
    title: "What a comparison-first view teaches you about trust",
    dek: "Field notes from the TwinX redesign.",
    status: "Draft",
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Draft: Story = {};
export const Published: Story = { args: { status: "Mar 2026" } };
