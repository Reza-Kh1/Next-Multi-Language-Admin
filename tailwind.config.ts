import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|badge|button|drawer|select|ripple|spinner|form|input|listbox|divider|popover|scroll-shadow|modal).js",
    "./node_modules/@heroui/theme/dist/components/(accordion|button|divider|select|ripple|spinner|form|listbox|popover|scroll-shadow).js",
  ],
  theme: {
    extend: {
      colors: {
        "o-80": "#f97316",
        "o-60": "#f97316",
        "b-70": "#0da8e6",
        "b-btn": "#0ca9e3",
        "d-btn": "#252528",
        "w-100": "#FFFFFF",
        "w-90": "#ececec",
        "w-80": "#a8a8a8",
        "w-50": "#666666",
        "d-80": "#1A1A1A",
        "d-60": "#262626",
        "d-50": "#4e4e4e",
        "d-100": "#0F0F0F",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        boxDetail: "0px 0px 5px #d2d2d2",
      },
    },
  },
  plugins: [nextui(), heroui()],
} satisfies Config;
