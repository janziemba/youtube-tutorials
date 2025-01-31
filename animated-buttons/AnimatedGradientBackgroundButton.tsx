import { LinearGradient } from "expo-linear-gradient";
import { ReactElement, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { theme } from "./theme";

export interface AnimatedGradientBackgroundButtonProps {
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
        flexDirection: "row",
        gap: 8,
        height: HEIGHT,
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        position: "absolute",
        width: "100%",
    },
    linearGradient: {
        height: HEIGHT,
    },
    outerContainer: {
        borderRadius: 8,
        overflow: "hidden",
        width: "100%",
    },
    title: {
        color: theme.colors.textInverted,
        flexShrink: 1,
        fontSize: 18,
        fontWeight: "600",
    },
});

export const AnimatedGradientBackgroundButton = ({
    accessibilityHint,
    accessibilityLabel,
    Icon,
    isDisabled = false,
    isLoading = false,
    onPress,
    title,
}: AnimatedGradientBackgroundButtonProps) => {
    const transition = useSharedValue(0);
    const [outerContainerWidth, setOuterContainerWidth] = useState(0);

    useEffect(() => {
        transition.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 2000, easing: Easing.linear }),
                withTiming(0, { duration: 0 }),
            ),
            -1,
        );

        return () => {
            cancelAnimation(transition);
        };
    }, [transition]);

    const translateX = useDerivedValue(() =>
        interpolate(transition.value, [0, 1], [-2 * outerContainerWidth, 0]),
    );

    const animatedGradientContainerStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
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
        >
            {({ pressed }) => (
                <View
                    onLayout={({ nativeEvent }) =>
                        setOuterContainerWidth(nativeEvent.layout.width)
                    }
                    style={styles.outerContainer}
                >
                    <Animated.View
                        style={animatedGradientContainerStyle}
                    >
                        <LinearGradient
                            colors={theme.gradients.primaryAnimated}
                            end={{ x: 1, y: 1 }}
                            start={{ x: 0, y: 1 }}
                            style={[
                                styles.linearGradient,
                                { width: outerContainerWidth * 3 },
                            ]}
                        />
                    </Animated.View>
                    <View
                        style={[
                            styles.container,
                            {
                                backgroundColor: pressed ? "indigo" : "transparent",
                            },
                        ]}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" size={18} />
                        ) : (
                            <>
                                {Icon}
                                <Text numberOfLines={1} style={styles.title}>
                                    {title}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            )}
        </Pressable>
    );
};
