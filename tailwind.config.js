import { heroui } from "@heroui/react";

const config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt','san-serif']
      },
      animation : {
        'notification' : "4s ease-in-out forwards moveLeftToRight, 5s hideElement 4s forwards ",
      },
      colors: {
        "primary": "#6C63FF",
        "secondary": "#00F2FE",
        "accent": "#FF3366",
        "dark": "#0A0A0F",
        "dark-gray": "#1A1A24",
        "light-gray": "#8A8A9E",

        "black-one": "#010101",
        "light-grey": "#464849"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: "#fafafa"
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#18181b",
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;