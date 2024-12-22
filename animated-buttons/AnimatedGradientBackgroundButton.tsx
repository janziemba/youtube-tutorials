import {
	Canvas,
	LinearGradient,
	RoundedRect,
	vec,
} from "@shopify/react-native-skia";
import { ReactElement, useEffect } from "react";
import {
	ActivityIndicator,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	cancelAnimation,
	Easing,
	interpolate,
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

const BORDER_RADIUS = 8;
const HEIGHT = 42;

const styles = StyleSheet.create({
	canvas: {
		height: HEIGHT,
	},
	container: {
		alignItems: "center",
		borderRadius: BORDER_RADIUS,
		flexDirection: "row",
		gap: 8,
		height: HEIGHT,
		justifyContent: "center",
		left: 0,
		paddingHorizontal: 12,
		paddingVertical: 8,
		position: "absolute",
		top: 0,
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
	const canvasSize = useSharedValue({ width: 0, height: 0 });

	useEffect(() => {
		transition.value = withRepeat(
			withSequence(
				withTiming(1, { duration: 2000, easing: Easing.linear }),
				withTiming(0, { duration: 0 })
			),
			-1
		);

		return () => {
			cancelAnimation(transition);
		};
	}, [transition]);

	const transform = useDerivedValue(() => [
		{
			translateX: interpolate(
				transition.value,
				[0, 1],
				[-2 * canvasSize.value.width, 0]
			),
		},
	]);

	const roundedRectWidth = useDerivedValue(() => canvasSize.value.width);

	const linearGradientEnd = useDerivedValue(() =>
		vec(canvasSize.value.width * 3, HEIGHT)
	);

	// I couldn't get this to work on web or Expo Snack, please see:
	// https://shopify.github.io/react-native-skia/docs/getting-started/web
	if (Platform.OS === "web") {
		throw new Error("Not supported on the web");
	}

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
				<View>
					<Canvas onSize={canvasSize} style={styles.canvas}>
						<RoundedRect
							height={HEIGHT}
							r={BORDER_RADIUS}
							width={roundedRectWidth}
							x={0}
							y={0}
						>
							<LinearGradient
								colors={[
									...(pressed
										? theme.gradients.primaryAnimatedActive
										: theme.gradients.primaryAnimated),
								]}
								end={linearGradientEnd}
								start={vec(0, 0)}
								transform={transform}
							/>
						</RoundedRect>
					</Canvas>
					<View
						style={[
							styles.container,
							{
								backgroundColor: pressed
									? theme.colors.primaryActive
									: "transparent",
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
					</View>
				</View>
			)}
		</Pressable>
	);
};
