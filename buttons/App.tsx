import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { AdvancedButton } from "./AdvancedButton";
import { SimpleButton } from "./SimpleButton";
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
	const [isLoading, setIsLoading] = useState(false);

	const title = "Submit";

	return (
			<SafeAreaView style={styles.safeArea}>
				<ScrollView contentContainerStyle={styles.container}>
					<Text style={styles.heading}>Simple button</Text>
					<SimpleButton
						isLoading={isLoading}
						onPress={() => {
							// simulation of form submission
							setIsLoading(true);
							setTimeout(() => {
								setIsLoading(false);
							}, 2000);
						}}
						title={title}
					/>
					<SimpleButton
						Icon={
							<MaterialCommunityIcons
								color={theme.colors.textInverted}
								name="send"
								size={18}
							/>
						}
						onPress={() => {}}
						title={title}
					/>
					<SimpleButton isLoading onPress={() => {}} title={title} />
					<SimpleButton isDisabled onPress={() => {}} title={title} />
					<View style={{ flexDirection: "row", justifyContent: "center" }}>
						<SimpleButton onPress={() => {}} title={title} />
					</View>

					<Text style={styles.heading}>Advanced button</Text>
					<AdvancedButton onPress={() => {}} title="Primary" />
					<AdvancedButton
						onPress={() => {}}
						size="large"
						title="Primary large"
					/>
					<AdvancedButton
						onPress={() => {}}
						size="small"
						title="Primary small"
					/>
					<AdvancedButton color="success" onPress={() => {}} title="Success" />
					<AdvancedButton color="danger" onPress={() => {}} title="Danger" />
					<AdvancedButton
						color="transparent"
						onPress={() => {}}
						title="Transparent"
					/>
				</ScrollView>
			</SafeAreaView>
	);
};

export default App;
