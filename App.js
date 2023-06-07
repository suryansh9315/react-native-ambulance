import { Provider } from "react-redux";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform } from "react-native";
import "react-native-gesture-handler";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            // keyboardVerticalOffset={Platform.OS === "ios" ? "-64" : "0"}
          >
            <StackNavigator />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
