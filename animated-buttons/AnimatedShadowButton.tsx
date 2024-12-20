import { ReactElement } from "react";
import {
	ActivityIndicator,
	Platform,
	Pressable,
	StyleSheet,
	Text,
} from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { theme } from "./theme";

export interface AnimatedShadowButtonProps {
	accessibilityHint?: string;
	accessibilityLabel?: string;
	elevation?: number;
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

export const AnimatedShadowButton = ({
	accessibilityHint,
	accessibilityLabel,
	elevation = 16,
	Icon,
	isDisabled = false,
	isLoading = false,
	onPress,
	title,
}: AnimatedShadowButtonProps) => {
	const transition = useSharedValue(0);
	const isActive = useSharedValue(true);

	const animatedStyle = useAnimatedStyle(() =>
		Platform.OS === "ios"
			? {
					shadowOffset: {
						width: 0,
						height: interpolate(transition.value, [0, 1], [elevation / 2, 0]),
					},
					shadowOpacity: 0.44,
					shadowRadius: interpolate(
						transition.value,
						[0, 1],
						[elevation / 1.5, 0]
					),
			  }
			: {
					elevation: interpolate(transition.value, [0, 1], [elevation, 0]),
			  }
	);

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
						transition.value = withTiming(0, { duration: DURATION });
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
					<ActivityIndicator color={theme.colors.textInverted} size={18} />
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