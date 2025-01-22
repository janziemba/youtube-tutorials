import { ReactElement, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    cancelAnimation,
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
        Icon?: ReactElement;
        title: string;
    }[];
}

const BACKGROUND_TRANSITION_DURATION = 300;
const HEIGHT = 42;
const SCROLL_TRANSITION_DURATION = 300;

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        height: HEIGHT,
        overflow: "hidden",
    },
    stepContainer: {
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
    const scrollTransition = useSharedValue(0);
    const backgroundTransition = useSharedValue(0);
    const isActive = useSharedValue(true);

    useEffect(() => {
        scrollTransition.value = withTiming(currentStep, {
            duration: SCROLL_TRANSITION_DURATION,
        });

        return () => {
            cancelAnimation(scrollTransition);
        };
    }, [currentStep]);

    const animatedScrollingContainerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            backgroundTransition.value,
            [0, 1],
            [theme.colors.primary, theme.colors.primaryActive]
        ),
        transform: [
            {
                translateY: interpolate(
                    scrollTransition.value,
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
                if (backgroundTransition.value === 1) {
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
                <Animated.View style={animatedScrollingContainerStyle}>
                    {steps.reverse().map((step) => (
                        <View key={step.title} style={styles.stepContainer}>
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
