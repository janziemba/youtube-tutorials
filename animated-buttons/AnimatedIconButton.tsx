import { ReactElement, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { theme } from "./theme";

export interface AnimatedIconButtonProps {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    Icon?: ReactElement;
    isDisabled?: boolean;
    isLoading?: boolean;
    onPress: () => void;
    title: string;
}

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
        shadowColor: theme.colors.shadow,
    },
    title: {
        color: theme.colors.textInverted,
        flexShrink: 1,
        fontSize: 18,
        fontWeight: "600",
    },
});

const DURATION = 300;

export const AnimatedIconButton = ({
    accessibilityHint,
    accessibilityLabel,
    Icon,
    isDisabled = false,
    isLoading = false,
    onPress,
    title,
}: AnimatedIconButtonProps) => {
    const transition = useSharedValue(0);
    const previousTransition = useSharedValue(0);
    const isActive = useSharedValue(true);
    const containerRef = useRef<View>(null);
    const iconContainerRef = useRef<Animated.View>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [iconX, setIconX] = useState(0);

    const isDecreasing = useDerivedValue(() => {
        const value = transition.value < previousTransition.value ? 1 : 0;
        previousTransition.value = transition.value;

        return value;
    });

    const animatedIconContainerStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(
                    transition.value,
                    [0, 1],
                    [0, containerWidth / 2 - iconX]
                ),
            },
            { scaleX: isDecreasing.value ? -1 : 1 },
        ],
    }));

    const animatedTitleStyle = useAnimatedStyle(() => ({
        opacity: interpolate(transition.value, [0, 1], [1, 0]),
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
                if (isActive.value && transition.value === 1) {
                    transition.value = withTiming(0, { duration: DURATION });
                }
                isActive.value = false;
            }}
        >
            <View
                ref={containerRef}
                onLayout={({
                    nativeEvent: {
                        layout: { width },
                    },
                }) => {
                    setContainerWidth(width);
                }}
                style={[
                    styles.container,
                    {
                        opacity: isDisabled ? 0.5 : 1,
                    },
                ]}
            >
                <Animated.View
                    ref={iconContainerRef}
                    onLayout={({
                        nativeEvent: {
                            layout: { x },
                        },
                    }) => {
                        setIconX(x);
                    }}
                    style={animatedIconContainerStyle}
                >
                    {Icon}
                </Animated.View>
                <Animated.Text
                    numberOfLines={1}
                    style={[styles.title, animatedTitleStyle]}
                >
                    {title}
                </Animated.Text>
            </View>
        </Pressable>
    );
};
