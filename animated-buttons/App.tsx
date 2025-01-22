import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text
} from "react-native";
import { AnimatedBackgroundButton } from "./AnimatedBackgroundButton";
import { AnimatedCartoonButton } from "./AnimatedCartoonButton";
import { AnimatedGradientBackgroundButton } from "./AnimatedGradientBackgroundButton";
import { AnimatedIconButton } from "./AnimatedIconButton";
import { AnimatedScrollingButton } from "./AnimatedScrollingButton";
import { AnimatedShadowButton } from "./AnimatedShadowButton";
import { BouncingButton } from "./BouncingButton";
import { PulsingButton } from "./PulsingButton";
import { ResizingButton } from "./ResizingButton";
import { TadaButton } from "./TadaButton";
import { theme } from "./theme";

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: theme.colors.backgroundPrimary,
        flex: 1,
    },
    container: {
        alignSelf: "center",
        gap: 16,
        maxWidth: 300,
        padding: 16,
        paddingBottom: 100,
    },
    heading: {
        color: theme.colors.textPrimary,
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 16,
        textAlign: "center",
    },
});

const App = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const title = "Submit";

    const Icon = (
        <MaterialCommunityIcons
            accessible={false}
            color={theme.colors.textInverted}
            name="send"
            size={18}
        />
    );

    const download = () => {
        setCurrentStep(1);
        setTimeout(() => {
            setCurrentStep(2);
        }, 2000);
        setTimeout(() => {
            setCurrentStep(0);
        }, 4000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Animated background button</Text>
                <AnimatedBackgroundButton
                    Icon={Icon}
                    onPress={() => {}}
                    title={title}
                />

                <Text style={styles.heading}>Resizing button</Text>
                <ResizingButton Icon={Icon} onPress={() => {}} title={title} />

                <Text style={styles.heading}>Animated shadow button</Text>
                <AnimatedShadowButton
                    Icon={Icon}
                    onPress={() => {}}
                    title={title}
                />

                <Text style={styles.heading}>Animated cartoon button</Text>
                <AnimatedCartoonButton
                    Icon={Icon}
                    onPress={() => {}}
                    title={title}
                />

                <Text style={styles.heading}>Animated icon button</Text>
                <AnimatedIconButton
                    Icon={Icon}
                    onPress={() => {}}
                    title={title}
                />

                <Text style={styles.heading}>Animated scrolling button</Text>
                <AnimatedScrollingButton
                    currentStep={currentStep}
                    onPress={download}
                    steps={[
                        {
                            Icon: (
                                <MaterialCommunityIcons
                                    accessible={false}
                                    color={theme.colors.textInverted}
                                    name="download"
                                    size={18}
                                />
                            ),
                            title: "Download",
                        },
                        {
                            Icon: (
                                <MaterialCommunityIcons
                                    accessible={false}
                                    color={theme.colors.textInverted}
                                    name="progress-download"
                                    size={18}
                                />
                            ),
                            title: "Downloading...",
                        },
                        {
                            Icon: (
                                <MaterialCommunityIcons
                                    accessible={false}
                                    color={theme.colors.textInverted}
                                    name="check"
                                    size={18}
                                />
                            ),
                            title: "Downloaded",
                        },
                    ]}
                />

                <Text style={styles.heading}>
                    Animated gradient background button
                </Text>
                <AnimatedGradientBackgroundButton
                    Icon={Icon}
                    onPress={() => {}}
                    title={title}
                />

                <Text style={styles.heading}>Pulsing button</Text>
                <PulsingButton Icon={Icon} onPress={() => {}} title={title} />

                <Text style={styles.heading}>Bouncing button</Text>
                <BouncingButton Icon={Icon} onPress={() => {}} title={title} />

                <Text style={styles.heading}>Tada button</Text>
                <TadaButton Icon={Icon} onPress={() => {}} title={title} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
