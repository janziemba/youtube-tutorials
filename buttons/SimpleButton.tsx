import { ReactElement } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { theme } from "./theme";

export interface SimpleButtonProps {
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
        borderRadius: 8,
        flexDirection: "row",
        gap: 8,
        height: 42,
        justifyContent: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    title: {
        color: theme.colors.backgroundPrimary,
        flexShrink: 1,
        fontSize: 18,
        fontWeight: "600",
    },
});

export const SimpleButton = ({
    accessibilityHint,
    accessibilityLabel,
    Icon,
    isDisabled = false,
    isLoading = false,
    onPress,
    title,
}: SimpleButtonProps) => (
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
                style={[
                    styles.container,
                    {
                        backgroundColor: pressed
                            ? theme.colors.primaryActive
                            : theme.colors.primary,
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
            </View>
        )}
    </Pressable>
);
