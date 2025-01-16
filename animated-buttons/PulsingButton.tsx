import { ReactElement, useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { theme } from "./theme";

export interface PulsingButtonProps {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    Icon?: ReactElement;
    isDisabled?: boolean;
    isLoading?: boolean;
    onPress: () => void;
    title: string;
}

const HEIGHT = 42;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        gap: 8,
        height: HEIGHT,
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    pulse: {
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        height: HEIGHT,
        position: "absolute",
        width: "100%",
    },
    title: {
        color: theme.colors.textInverted,
        flexShrink: 1,
        fontSize: 18,
        fontWeight: "600",
    },
});

const BACKGROUND_TRANSITION_DURATION = 300;
const PULSE_TRANSITION_DURATION = 2000;
const PULSE_2_DELAY = 700;

export const PulsingButton = ({
    accessibilityHint,
    accessibilityLabel,
    Icon,
    isDisabled = false,
    isLoading = false,
    onPress,
    title,
}: PulsingButtonProps) => {
    const pulseTransition = useSharedValue(0);
    const pulse2Transition = useSharedValue(0);
    const backgroundTransition = useSharedValue(0);
    const isActive = useSharedValue(true);

    useEffect(() => {
        pulseTransition.value = withRepeat(
            withSequence(
                withTiming(1, {
                    duration: PULSE_TRANSITION_DURATION + PULSE_2_DELAY,
                    easing: Easing.out(Easing.ease),
                }),
                withTiming(0, { duration: 0 })
            ),
            -1
        );

        pulse2Transition.value = withRepeat(
            withSequence(
                withDelay(
                    PULSE_2_DELAY,
                    withTiming(1, {
                        duration: PULSE_TRANSITION_DURATION,
                        easing: Easing.out(Easing.ease),
                    })
                ),
                withTiming(0, { duration: 0 })
            ),
            -1
        );

        return () => {
            cancelAnimation(pulseTransition);
            cancelAnimation(pulse2Transition);
        };
    }, [pulseTransition, pulse2Transition]);

    const animatedPulseStyle = useAnimatedStyle(() => ({
        opacity: interpolate(pulseTransition.value, [0, 1], [0.5, 0]),
        transform: [
            {
                scale: interpolate(pulseTransition.value, [0, 1], [1, 1.5]),
            },
        ],
    }));

    const animatedPulse2Style = useAnimatedStyle(() => ({
        opacity: interpolate(pulse2Transition.value, [0, 1], [0.25, 0]),
        transform: [
            {
                scale: interpolate(pulse2Transition.value, [0, 1], [1, 1.5]),
            },
        ],
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            backgroundTransition.value,
            [0, 1],
            [theme.colors.primary, theme.colors.primaryActive]
        ),
    }));

    return (
        <Pressable
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{
                busy: isLoading,
                disabled: isDisabled || isLoading,
            }}
            disabled={isDisabled || isLoading}
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
            <Animated.View
                style={[
                    styles.pulse,
                    animatedPulseStyle,
                    { opacity: isDisabled ? 0.5 : 1 },
                ]}
            />
            <Animated.View
                style={[
                    styles.pulse,
                    animatedPulse2Style,
                    { opacity: isDisabled ? 0.5 : 1 },
                ]}
            />
            <Animated.View
                style={[
                    styles.container,
                    animatedContainerStyle,
                    { opacity: isDisabled ? 0.5 : 1 },
                ]}
            >
                {isLoading ? (
                    <ActivityIndicator
                        color={theme.colors.textInverted}
                        size={18}
                    />
                ) : (
                    <>
                        {Icon}
                        <Text numberOfLines={1} style={styles.title}>
                            {title}
                        </Text>
                    </>
                )}
            </Animated.View>
        </Pressable>
    );
};
