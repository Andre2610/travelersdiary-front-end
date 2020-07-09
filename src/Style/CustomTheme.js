import { theme } from "@chakra-ui/core";

export const CustomTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    customIcon: {
      50: "#ffe6e8",
      100: "#f6bfc0",
      200: "#e3ebff", //dark mode color
      300: "#df6d76",
      400: "#d44455",
      500: "rgba(0, 0, 0, 0.92)", //default color
      600: "#92202a",
      700: "#6a1618",
      800: "#410c0a",
      900: "#1d0400",
    },
    customRed: {
      50: "#ffe6e8",
      100: "#f6bfc0",
      200: "#e3ebff", //dark mode color
      300: "#df6d76",
      400: "#d44455",
      500: "#a62639", //default color
      600: "#92202a",
      700: "#6a1618",
      800: "#410c0a",
      900: "#1d0400",
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
    backgroundCustom: "#B8B08D",
  },
};