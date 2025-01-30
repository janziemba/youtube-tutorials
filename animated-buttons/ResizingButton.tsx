import { ReactElement } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { theme } from "./theme";

export interface ResizingButtonProps {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    Icon?: ReactElement;
    isDisabled?: boolean;
    isLoading?: boolean;
    onPress: () => void;
    scale?: number;
    title: string;
}

const DURATION = 300;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.primary,
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

export const ResizingButton = ({
    accessibilityHint,
    accessibilityLabel,
    Icon,
    isDisabled = false,
    isLoading = false,
    onPress,
    scale = 0.95,
    title,
}: ResizingButtonProps) => {
    const transition = useSharedValue(0);
    const isActive = useSharedValue(false);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(transition.value, [0, 1], [1, scale]),
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
                transition.value = withTiming(1, { duration: DURATION }, () => {
                    if (!isActive.value) {
                        transition.value = withTiming(0, {
                            duration: DURATION,
                        });
                    }
                });
            }}
            onPressOut={() => {
                if (transition.value === 1) {
                    transition.value = withTiming(0, { duration: DURATION });
                }
                isActive.value = false;
            }}
        >
            <Animated.View
                style={[
                    styles.container,
                    animatedStyle,
                    {
                        opacity: isDisabled ? 0.5 : 1,
                    },
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
