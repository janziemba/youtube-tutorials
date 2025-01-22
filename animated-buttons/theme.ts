import { Appearance } from "react-native";

export const lightTheme = {
    colors: {
        primary: "rebeccapurple",
        primaryActive: "indigo",
        backgroundPrimary: "#f8f9fa",
        textPrimary: "#212529",
        textInverted: "#f8f9fa",
        shadow: "#000000",
    },
    gradients: {
        primaryAnimated: ["purple", "indigo", "purple", "indigo"],
    },
} as const;

export const darkTheme = {
    colors: {
        primary: "rebeccapurple",
        primaryActive: "indigo",
        backgroundPrimary: "#121212",
        textPrimary: "#f8f9fa",
        textInverted: "#212529",
        shadow: "#888888",
    },
    gradients: {
        primaryAnimated: ["purple", "indigo", "purple", "indigo"],
    },
} as const;

export const theme =
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme;
