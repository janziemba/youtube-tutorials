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

export interface BouncingButtonProps {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    Icon?: ReactElement;
    isDisabled?: boolean;
    isLoading?: boolean;
    onPress: () => void;
    title: string;
}

const DELAY = 3000;
const HEIGHT = 42;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
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

const BACKGROUND_TRANSITION_DURATION = 300;

export const BouncingButton = ({
    accessibilityHint,
    accessibilityLabel,
    Icon,
    isDisabled = false,
    isLoading = false,
    onPress,
    title,
}: BouncingButtonProps) => {
    const containerBounceTransition = useSharedValue(0);
    const backgroundTransition = useSharedValue(0);
    const isActive = useSharedValue(true);

    useEffect(() => {
        containerBounceTransition.value = withRepeat(
            withDelay(
                DELAY,
                withSequence(
                    withTiming(1, {
                        duration: 300,
                        easing: Easing.linear,
                    }),
                    withTiming(0, {
                        duration: 300,
                        easing: Easing.linear,
                    }),
                    withTiming(1, {
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                    }),
                    withTiming(0, {
                        duration: 300,
                        easing: Easing.out(Easing.ease),
                    })
                )
            ),
            -1
        );

        return () => {
            cancelAnimation(containerBounceTransition);
        };
    }, [containerBounceTransition]);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            backgroundTransition.value,
            [0, 1],
            [theme.colors.primary, theme.colors.primaryActive]
        ),
        transform: [
            {
                scale: interpolate(
                    containerBounceTransition.value,
                    [0, 1],
                    [1, 1.1]
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
