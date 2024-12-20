import { LoadSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { registerRootComponent } from "expo";

import App from "./App";

// this is needed for skia to work on web in Expo Snack, ignore it if you don't target web
LoadSkiaWeb().then(() => {
	registerRootComponent(App);
});
