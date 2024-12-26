import { ReactElement } from "react";
import {
	ActivityIndicator,
	ColorValue,
	Pressable,
	StyleSheet,
	Text,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import { theme } from "./theme";

export type ButtonColor = "primary" | "danger" | "success" | "transparent";
export type ButtonSize = "small" | "medium" | "large";

export interface AdvancedButtonProps {
	accessibilityHint?: string;
	accessibilityLabel?: string;
	color?: ButtonColor;
	Icon?: ReactElement;
	isDisabled?: boolean;
	isLoading?: boolean;
	onPress: () => void;
	size?: ButtonSize;
	title: string;
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		borderRadius: 8,
		flexDirection: "row",
		gap: 8,
		justifyContent: "center",
	},
	title: {
		flexShrink: 1,
		fontWeight: "600",
	},
});

const colorVariants: Record<
	ButtonColor,
	{
		backgroundColor: ColorValue;
		activeBackgroundColor: ColorValue;
		titleColor: ColorValue;
		activeTitleColor: ColorValue;
	}
> = {
	primary: {
		backgroundColor: theme.colors.primary,
		activeBackgroundColor: theme.colors.primaryActive,
		titleColor: theme.colors.textInverted,
		activeTitleColor: theme.colors.textInverted,
	},
	danger: {
		backgroundColor: theme.colors.danger,
		activeBackgroundColor: theme.colors.dangerActive,
		titleColor: theme.colors.textInverted,
		activeTitleColor: theme.colors.textInverted,
	},
	success: {
		backgroundColor: theme.colors.success,
		activeBackgroundColor: theme.colors.successActive,
		titleColor: theme.colors.textInverted,
		activeTitleColor: theme.colors.textInverted,
	},
	transparent: {
		backgroundColor: "transparent",
		activeBackgroundColor: "transparent",
		titleColor: theme.colors.primary,
		activeTitleColor: theme.colors.textPrimary,
	},
};

const sizeVariants: Record<
	ButtonSize,
	{
		container: ViewStyle;
		title: TextStyle;
	}
> = {
	small: {
		container: {
			height: 36,
			paddingHorizontal: 12,
			paddingVertical: 8,
		},
		title: {
			fontSize: 14,
		},
	},
	medium: {
		container: {
			height: 42,
			paddingHorizontal: 12,
			paddingVertical: 8,
		},
		title: {
			fontSize: 18,
		},
	},
	large: {
		container: {
			height: 52,
			paddingHorizontal: 16,
			paddingVertical: 12,
		},
		title: {
			fontSize: 20,
		},
	},
};

export const AdvancedButton = ({
	accessibilityHint,
	accessibilityLabel,
	color = "primary",
	Icon,
	isDisabled = false,
	isLoading = false,
	onPress,
	size = "medium",
	title,
}: AdvancedButtonProps) => (
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
					sizeVariants[size].container,
					{
						backgroundColor: pressed
							? colorVariants[color].activeBackgroundColor
							: colorVariants[color].backgroundColor,
						opacity: isDisabled ? 0.5 : 1,
					},
				]}
			>
				{isLoading ? (
					<ActivityIndicator
						color={colorVariants[color].titleColor}
						size={sizeVariants[size].title.fontSize}
					/>
				) : (
					<>
						{Icon}
						<Text
							numberOfLines={1}
							style={[
								styles.title,
								sizeVariants[size].title,
								{
									color: pressed
										? colorVariants[color].activeTitleColor
										: colorVariants[color].titleColor,
								},
							]}
						>
							{title}
						</Text>
					</>
				)}
			</View>
		)}
	</Pressable>
);
