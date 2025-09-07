//import type { Config } from "tailwindcss";
import { mtConfig } from "@material-tailwind/react";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        'xxs': '320px',
        'xs': '390px',
      },
      colors: {
        'bg-surface': 'var(--color-bg-surface)',
      },
      darkMode: 'class',
    },
  },
  plugins: [mtConfig({
    radius: "2rem",
    fonts: {
      sans: "Roboto",
      serif: "DM Serif Display"
    },
    colors: {
      primary: {
        default: "#06b6d4",
        dark: "#0891b2",
        light: "#a5f3fc",
        foreground: "#ffffff"
      }
    },
    darkColors: {
      primary: {
        default: "#5eead4",
        dark: "#2dd4bf",
        light: "#99f6e4",
        foreground: "#030712",
      },
    },
  })],
};
