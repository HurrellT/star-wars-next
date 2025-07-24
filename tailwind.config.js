/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@hurrellt/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
  important: "html",
};
