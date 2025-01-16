import { ReactElement, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { theme } from "./theme";

export interface AnimatedScrollingButtonProps {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    currentStep: number;
    isDisabled?: boolean;
    isLoading?: boolean;
    onPress: () => void;
    steps: {
        title: string;
        Icon?: ReactElement;
    }[];
}

const BACKGROUND_TRANSITION_DURATION = 300;
const HEIGHT = 42;
const SCROLL_TRANSITION_DURATION = 300;

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        height: HEIGHT,
        overflow: "hidden",
    },
    titleContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        height: HEIGHT,
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    title: {
        color: theme.colors.textInverted,
        flexShrink: 1,
        fontSize: 18,
        fontWeight: "600",
    },
});

export const AnimatedScrollingButton = ({
    accessibilityHint,
    accessibilityLabel,
    currentStep,
    isDisabled = false,
    isLoading = false,
    onPress,
    steps,
}: AnimatedScrollingButtonProps) => {
    const scollTransition = useSharedValue(0);
    const backgroundTransition = useSharedValue(0);
    const isActive = useSharedValue(true);

    useEffect(() => {
        scollTransition.value = withTiming(currentStep, {
            duration: SCROLL_TRANSITION_DURATION,
        });
    }, [currentStep]);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            backgroundTransition.value,
            [0, 1],
            [theme.colors.primary, theme.colors.primaryActive]
        ),
        transform: [
            {
                translateY: interpolate(
                    scollTransition.value,
                    [0, steps.length - 1],
                    [-HEIGHT * (steps.length - 1), 0]
                ),
            },
        ],
    }));

    return (
        <Pressable
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{
                busy: isLoading || currentStep > 0,
                disabled: isDisabled || isLoading,
            }}
            disabled={isDisabled || isLoading || currentStep > 0}
            hitSlop={16}
            onPress={onPress}
            onPressIn={() => {
                isActive.value = true;
                backgroundTransition.value = withTiming(
                    1,
                    { duration: BACKGROUND_TRANSITION_DURATION },
                    () => {
                        if (!isActive.value) {
                            backgroundTransition.value = withTiming(0, {
                                duration: BACKGROUND_TRANSITION_DURATION,
                            });
                        }
                    }
                );
            }}
            onPressOut={() => {
                if (isActive.value && backgroundTransition.value === 1) {
                    backgroundTransition.value = withTiming(0, {
                        duration: BACKGROUND_TRANSITION_DURATION,
                    });
                }
                isActive.value = false;
            }}
        >
            <View
                style={[
                    styles.container,
                    {
                        opacity: isDisabled ? 0.5 : 1,
                    },
                ]}
            >
                <Animated.View style={animatedContainerStyle}>
                    {steps.reverse().map((step) => (
                        <View key={step.title} style={styles.titleContainer}>
                            {step.Icon}
                            <Text numberOfLines={1} style={styles.title}>
                                {step.title}
                            </Text>
                        </View>
                    ))}
                </Animated.View>
            </View>
        </Pressable>
    );
};
