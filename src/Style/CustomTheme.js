import { theme } from "@chakra-ui/core";

export const CustomTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    gray: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
      700: "#2D3748",
      800: "#1A202C",
      900: "#171923",
    },
    customIcon: {
      50: "#ffe6e8",
      100: "#f6bfc0",
      200: "#e3ebff", //dark mode color
      300: "#df6d76",
      400: "#d44455",
      500: "rgba(0, 0, 0, 0.80)", //default color
      600: "#92202a",
      700: "#6a1618",
      800: "#410c0a",
      900: "#1d0400",
    },
    customBtn: {
      50: "#e3ebff",
      100: "#e3ebff",
      200: "#e3ebff", //dark mode color
      300: "#AEAEAE", // hover color dark mode
      400: "#e3ebff",
      500: "#1A202C", //default color
      600: "#2D3748", // hover light mode
      700: "#e3ebff",
      800: "#e3ebff",
      900: "#e3ebff",
    },
    customOlive: {
      50: "#f7f4e5",
      100: "#e3decc",
      200: "#cec9af",
      300: "#bab391",
      400: "#a79d73",
      500: "#8d8359",
      600: "#6e6645",
      700: "#4f4930",
      800: "#2f2c1a",
      900: "#120f00",
    },
    customBlue: {
      50: "#e4f2ff",
      100: "#bad5f9",
      200: "#8fbaf0",
      300: "#649ee9",
      400: "#3a82e1",
      500: "#2369c8",
      600: "#19529c",
      700: "#0f3a70",
      800: "#052345",
      900: "#000d1c",
    },
    white: "#e3ebff",
    whiteAlpha: {
      50: "rgba(227, 235, 255, 0.06)",
      100: "rgba(227, 235, 255, 0.08)",
      200: "rgba(227, 235, 255, 0.06)",
      300: "rgba(227, 235, 255, 0.24)",
      400: "rgba(227, 235, 255, 0.36)",
      500: "rgba(227, 235, 255, 0.48)",
      600: "rgba(227, 235, 255, 0.64)",
      700: "rgba(227, 235, 255, 0.74)",
      800: "rgba(227, 235, 255, 0.80)",
      900: "rgba(227, 235, 255, 0.92)",
    },
    blackAlpha: {
      50: "#B8B08D",
      100: "rgba(0, 0, 0, 0.06)",
      200: "rgba(0, 0, 0, 0.08)",
      300: "rgba(0, 0, 0, 0.06)",
      400: "rgba(0, 0, 0, 0.24)",
      500: "rgba(0, 0, 0, 0.36)",
      600: "rgba(0, 0, 0, 0.48)",
      700: "rgba(0, 0, 0, 0.64)",
      800: "rgba(0, 0, 0, 0.80)",
      900: "rgba(0, 0, 0, 0.92)",
    },
    customTab: {
      50: "#000d1c",
      100: "#717171", // tab  background color
      200: "#000d1c",
      300: "#000d1c",
      400: "#000d1c",
      500: "#e3ebff",
      600: "#e3ebff",
      700: "#e3ebff", // tab letter color
      800: "#e3ebff",
      900: "#e3ebff",
    },
    backgroundCustom: "#B8B08D",
  },
};
