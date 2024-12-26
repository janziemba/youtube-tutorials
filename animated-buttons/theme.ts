import { Appearance } from "react-native";

export const lightTheme = {
    colors: {
        primary: "#0066cc",
        primaryActive: "#004999",
        backgroundPrimary: "#f8f9fa",
        textPrimary: "#212529",
        textInverted: "#f8f9fa",
        shadow: "#000000",
    },
    gradients: {
        primaryAnimated: ["#003f7f", "#0066cc", "#003f7f", "#0066cc"],
        primaryAnimatedActive: ["#0052a3", "#003f7f", "#0052a3", "#003f7f"],
    },
} as const;

export const darkTheme = {
    colors: {
        primary: "#3399ff",
        primaryActive: "#2674cc",
        backgroundPrimary: "#121212",
        textPrimary: "#f8f9fa",
        textInverted: "#212529",
        shadow: "#888888",
    },
    gradients: {
        primaryAnimated: ["#124c99", "#3399ff", "#124c99", "#3399ff"],
        primaryAnimatedActive: ["#1a66cc", "#124c99", "#1a66cc", "#124c99"],
    },
} as const;

export const theme =
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme;
