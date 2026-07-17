import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        white: { value: "#FFF5F3" },
        pinkLight: { value: "#F9DDDE" },
        pinkDark: { value: "#F2A2A9" },
        beigeLight: { value: "#F8E6E1" },
        beigeMid: { value: "#D7BFC0" },
        beigeDark: { value: "#B58F91" },
        green: { value: "#95A67C" },
      },
      fonts: {
        heading: { value: "var(--font-dm-serif), Georgia, serif" },
        body: { value: "var(--font-dm-sans), system-ui, sans-serif" },
        mono: { value: "var(--font-dm-mono), ui-monospace, monospace" },
      },
    },
  },
});
