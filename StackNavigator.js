import MapScreen from "./screens/MapScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OtpScreen from "./screens/OtpScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectToken } from "./slices/navSlices";
import { useSelector } from "react-redux";

const StackNavigator = () => {
  const token = useSelector(selectToken);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}
    >
      {token ? (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
