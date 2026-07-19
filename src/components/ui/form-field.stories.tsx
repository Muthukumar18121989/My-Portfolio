import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./form-field";

const meta: Meta<typeof FormField> = {
  title: "Primitives/FormField",
  component: FormField,
  args: {
    id: "story-field",
    label: "Full name",
    placeholder: "Jordan Lee",
  },
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const WithHelperText: Story = {
  args: { helperText: "Used only to respond to your message." },
};
export const WithError: Story = {
  args: { error: "Enter a subject before sending." },
};
export const Multiline: Story = {
  args: {
    id: "story-message",
    label: "Message",
    multiline: true,
    placeholder: "What are you reaching out about?",
  },
};
