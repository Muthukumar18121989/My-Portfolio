import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import "../src/app/globals.css";

// Light/dark toggle in the toolbar, per PHASE-6-DESIGN-SYSTEM.md's Storybook
// strategy ("light/dark toggle in the toolbar"). Stamps data-theme on a
// wrapper div, matching how the real app's theme switcher works (see
// styles/theme.css's :root[data-theme="dark"|"light"] overrides).
const withTheme = (Story: React.ComponentType, context: { globals: { theme?: string } }) => {
  const theme = context.globals.theme ?? "dark";
  return (
    <div data-theme={theme} className="bg-bg text-fg p-6">
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  globalTypes: {
    theme: {
      description: "Design OS color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "dark", icon: "circle", title: "Dark" },
          { value: "light", icon: "circlehollow", title: "Light" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: "dark",
  },

  decorators: [withTheme],
};

export default preview;
