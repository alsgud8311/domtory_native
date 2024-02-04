import { Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/main/home";
import icon from "./src/assets/domtory_icon.png";
import MainTab from "./src/screens/maintab";

const Stack = createNativeStackNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          {/* <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              header: () => (
                <View
                  style={{
                    height: 100,
                    width: "100%",
                    backgroundColor: "#fff5d3",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icon}
                    style={{
                      width: 60,
                      height: 60,
                      position: "absolute",
                      left: 10,
                      bottom: 10,
                    }}
                  />
                </View>
              ),
            }}
          /> */}
          <Stack.Screen name="MainScreen" component={MainTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
