import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        slate: { value: "#7292A6" },
        steel: { value: "#AAB8BB" },
        sage: { value: "#C4D7D1" },
        blush: { value: "#F2EBE9" },
        offwhite: { value: "#F7F3F0" },
        peach: { value: "#F5D1C3" },
        salmon: { value: "#FFB6A3" },
      },
      fonts: {
        heading: { value: "var(--font-cormorant), Georgia, serif" },
        body: { value: "var(--font-inter), system-ui, sans-serif" },
      },
    },
  },
});
