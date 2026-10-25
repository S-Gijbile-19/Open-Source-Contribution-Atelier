
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Components/ProgressRing",
  component: ProgressRing,
  tags: ["autodocs"],
  args: {
    percentage: 50,
    size: 80,
    color: "#6c63ff",
    label: "50%",
  },
  argTypes: {
    percentage: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress percentage from 0 to 100.",
    },
    size: {
      control: { type: "number", min: 40, max: 200, step: 10 },
      description: "Width and height of the ring in pixels.",
    },
    color: {
      control: "color",
      description: "Color of the progress arc.",
    },
    label: {
      control: "text",
      description: "Optional text displayed inside the ring.",
    },
  },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { percentage: 0, label: "0%" },
};

export const Complete: Story = {
  args: { percentage: 100, label: "100%" },
};

export const Small: Story = {
  args: { size: 48, label: "50%" },
};

export const Medium: Story = {
  args: { size: 80, label: "50%" },
};

export const Large: Story = {
  args: { size: 120, label: "50%" },
};

export const WithLabel: Story = {
  args: { percentage: 65, label: "65%" },
};

export const WithoutLabel: Story = {
  args: { percentage: 65, label: undefined },
};

export const Static: Story = {
  args: { percentage: 50, label: "50%" },
};

export const Animated: Story = {
  args: { percentage: 50, label: "50%" },
  render: (args) => {
    const size = args.size ?? 80;
    const circumference = 2 * Math.PI * ((size - 8) / 2);
    const initialOffset =
      circumference - (args.percentage / 100) * circumference;

    return (
      <>
        <style>
          {`
            @keyframes progress-ring-story-animation {
              from { stroke-dashoffset: ${circumference}px; }
              to { stroke-dashoffset: ${initialOffset}px; }
            }

            .progress-ring-story-animated .progress-ring__progress {
              animation: progress-ring-story-animation 2s ease-in-out infinite alternate;
            }

            @media (prefers-reduced-motion: reduce) {
              .progress-ring-story-animated .progress-ring__progress {
                animation: none;
              }
            }
          `}
        </style>
        <div className="progress-ring-story-animated">
          <ProgressRing {...args} />
        </div>
      </>
    );
  },
};

export const DarkMode: Story = {
  args: { percentage: 70, label: "70%" },
  decorators: [
    (Story) => (
      <div
        style={{
          background: "#1f2937",
          color: "#f9fafb",
          padding: "24px",
          display: "inline-flex",
          borderRadius: "8px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
