import { ReactElement } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { theme } from "./theme";

export interface AnimatedCartoonButtonProps {
    accessibilityHint?: string;
    accessibilityLabel?: string;
    Icon?: ReactElement;
    isDisabled?: boolean;
    isLoading?: boolean;
    onPress: () => void;
    title: string;
}

const DURATION = 300;
const BORDER_RADIUS = 8;
const HEIGHT = 42;
const SHADOW_HEIGHT = 10;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.primary,
        borderRadius: BORDER_RADIUS,
        flexDirection: "row",
        gap: 8,
        height: HEIGHT,
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        position: "absolute",
        width: "100%",
    },
    shadow: {
        backgroundColor: theme.colors.primaryActive,
        borderRadius: BORDER_RADIUS,
        height: HEIGHT,
        top: SHADOW_HEIGHT,
    },
    title: {
        color: theme.colors.textInverted,
        flexShrink: 1,
        fontSize: 18,
        fontWeight: "600",
    },
});

export const AnimatedCartoonButton = ({
    accessibilityHint,
    accessibilityLabel,
    Icon,
    isDisabled = false,
    isLoading = false,
    onPress,
    title,
}: AnimatedCartoonButtonProps) => {
    const transition = useSharedValue(0);
    const isActive = useSharedValue(true);

    const animatedStyle = useAnimatedStyle(() => ({
        top: interpolate(transition.value, [0, 1], [0, SHADOW_HEIGHT]),
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
            <View>
                <View style={styles.shadow} />
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
            </View>
        </Pressable>
    );
};
