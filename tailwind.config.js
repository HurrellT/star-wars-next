import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@hurrellt/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
