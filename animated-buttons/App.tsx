import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import { AnimatedBackgroundButton } from "./AnimatedBackgroundButton";
import { AnimatedCartoonButton } from "./AnimatedCartoonButton";
import { AnimatedGradientBackgroundButton } from "./AnimatedGradientBackgroundButton";
import { AnimatedShadowButton } from "./AnimatedShadowButton";
import { ResizingButton } from "./ResizingButton";
import { theme } from "./theme";

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: theme.colors.backgroundPrimary,
		flex: 1,
	},
	container: {
		alignSelf: "center",
		gap: 16,
		maxWidth: 300,
		padding: 16,
		paddingBottom: 100,
	},
	heading: {
		color: theme.colors.textPrimary,
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 16,
		textAlign: "center",
	},
});

const App = () => {
	const title = "Submit";

	const Icon = (
		<MaterialCommunityIcons
			accessible={false}
			color={theme.colors.textInverted}
			name="send"
			size={18}
		/>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.heading}>Animated background button</Text>
				<AnimatedBackgroundButton
					Icon={Icon}
					onPress={() => {}}
					title={title}
				/>

				<Text style={styles.heading}>Resizing button</Text>
				<ResizingButton Icon={Icon} onPress={() => {}} title={title} />

				<Text style={styles.heading}>Animated shadow button</Text>
				<AnimatedShadowButton Icon={Icon} onPress={() => {}} title={title} />

				<Text style={styles.heading}>Animated cartoon button</Text>
				<AnimatedCartoonButton
					Icon={Icon}
					onPress={() => {}}
					title={title}
				/>

				{/*
					I couldn't get this to work on web or Expo Snack, please see:
					https://shopify.github.io/react-native-skia/docs/getting-started/web
				*/}
				{Platform.OS !== "web" && (
					<>
						<Text style={styles.heading}>
							Animated gradient background button
						</Text>
						<AnimatedGradientBackgroundButton
							Icon={Icon}
							onPress={() => {}}
							title={title}
						/>
					</>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default App;
