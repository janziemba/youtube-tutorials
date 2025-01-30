import { ReactElement, useEffect } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
    cancelAnimation,
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

const BACKGROUND_TRANSITION_DURATION = 300;
const BOUNCE_TRANSITION_DELAY = 3000;
const BOUNCE_TRANSITION_DURATION = 300;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        gap: 8,
        height: 42,
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

export const BouncingButton = ({
    accessibilityHint,
    accessibilityLabel,
    Icon,
    isDisabled = false,
    isLoading = false,
    onPress,
    title,
}: BouncingButtonProps) => {
    const bounceTransition = useSharedValue(0);
    const backgroundTransition = useSharedValue(0);
    const isActive = useSharedValue(false);

    useEffect(() => {
        if (isDisabled || isLoading) {
            cancelAnimation(bounceTransition);
            bounceTransition.value = 0;
            return;
        }

        bounceTransition.value = withRepeat(
            withDelay(
                BOUNCE_TRANSITION_DELAY,
                withSequence(
                    withTiming(1, { duration: BOUNCE_TRANSITION_DURATION }),
                    withTiming(0, { duration: BOUNCE_TRANSITION_DURATION }),
                    withTiming(1, { duration: BOUNCE_TRANSITION_DURATION }),
                    withTiming(0, { duration: BOUNCE_TRANSITION_DURATION })
                )
            ),
            -1
        );

        return () => {
            cancelAnimation(bounceTransition);
        };
    }, [bounceTransition, isDisabled, isLoading]);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            backgroundTransition.value,
            [0, 1],
            [theme.colors.primary, theme.colors.primaryActive]
        ),
        transform: [
            {
                scale: interpolate(
                    bounceTransition.value,
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
                if (backgroundTransition.value === 1) {
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
