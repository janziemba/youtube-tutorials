import { Appearance } from "react-native";

export const lightTheme = {
    colors: {
        primary: "#0066cc",
        primaryActive: "#004999",
        success: "#28a745",
        successActive: "#1e7a33",
        danger: "#dc3545",
        dangerActive: "#a71d2a",
        backgroundPrimary: "#f8f9fa",
        backgroundSecondary: "#eeeeee",
        textPrimary: "#212529",
        textInverted: "#f8f9fa",
    },
    gradients: {
        primary: ["#0066cc", "#0052a3"],
        primaryActive: ["#0052a3", "#003f7f"],
    },
} as const;

export const darkTheme = {
    colors: {
        primary: "#3399ff",
        primaryActive: "#2674cc",
        success: "#4caf50",
        successActive: "#388e3c",
        danger: "#ff6f61",
        dangerActive: "#d32f2f",
        backgroundPrimary: "#121212",
        backgroundSecondary: "#1e1e1e",
        textPrimary: "#f8f9fa",
        textInverted: "#212529",
    },
    gradients: {
        primary: ["#3399ff", "#1a66cc"],
        primaryActive: ["#1a66cc", "#124c99"],
    },
} as const;

export const theme =
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme;
