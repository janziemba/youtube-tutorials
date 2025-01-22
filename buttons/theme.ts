import { Appearance } from "react-native";

export const lightTheme = {
    colors: {
        primary: "rebeccapurple",
        primaryActive: "indigo",
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
        primary: ["purple", "indigo"],
        primaryActive: ["indigo", "indigo"],
    },
} as const;

export const darkTheme = {
    colors: {
        primary: "rebeccapurple",
        primaryActive: "indigo",
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
        primary: ["purple", "indigo"],
        primaryActive: ["indigo", "indigo"],
    },
} as const;

export const theme =
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme;
