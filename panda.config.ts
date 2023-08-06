import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
    tokens: {
      colors: {
        primary: {
          DEFAULT: {
            value: "#812AD7",
          },
          light: { value: "#972EFF" },
          dark: { value: "#26103C" },
        },
        white: { value: "#F9F9F9" },
        gray: { value: "#949494" },
        black: {
          DEFAULT: { value: "#1D1D1D" },
          light: { value: "#3A3A3A" },
        },
      },
      fonts: {
        body: { value: ["var(--font-nunito-sans)", "sans-serif"] },
        heading: { value: ["var(--font-roboto-slab)", "serif"] },
      },
      fontSizes: {
        base: { value: "16px" },
        sm: { value: "0.8rem" }, // 12.8px
        md: { value: "1rem" }, // 16px
        lg: { value: "1.125rem" }, // 18px
        xl: { value: "1.25rem" }, // 20px
        "2xl": { value: "1.313rem" }, // 21px
        "3xl": { value: "1.438rem" }, // 23px
        "4xl": { value: "1.563rem" }, // 25px
        "5xl": { value: "1.953rem" }, // 31.25px
        "6xl": { value: "2.25rem" }, // 36px
        "7xl": { value: "2.441rem" }, // 39.056px
        "8xl": { value: "3.052rem" }, // 48.832px
      },
      fontWeights: {
        light: { value: 300 },
        normal: { value: 400 },
        medium: { value: 500 },
      },
      spacing: {
        xsm: { value: "4px" },
        sm: { value: "8px" },
        md: { value: "16px" },
        lg: { value: "32px" },
        xl: { value: "64px" },
        "2xl": { value: "128px" },
      },
    },
    semanticTokens: {
      colors: {
        background: { value: "{colors.white}" },
      },
    },
  },

  globalCss: {
    "html, body": {
      backgroundColor: "background",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
