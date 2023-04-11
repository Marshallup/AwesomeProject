// In App.js in a new project

import React from "react";
import { View, Text, Button, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  // HeaderStyleInterpolators,
} from "@react-navigation/stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Header } from "@/widgets/header";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Colors } from "@/shared/config/color";

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  // Feed: { sort: "latest" | "top" } | undefined;
};

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const forFade = ({
  current,
  next,
}: {
  current: { progress: number };
  next?: { progress: number };
}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });
  const transformX = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-20, 0, -20],
  });

  return {
    leftButtonStyle: { opacity, transform: [{ translateX: transformX }] },
    rightButtonStyle: { opacity },
    titleStyle: { opacity: 1 },
    backgroundStyle: { opacity },
  };
};

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  function getIcon(routeName: string): "md-home" | "md-settings" {
    switch (routeName) {
      case "Home":
        return "md-home";
      case "Settings":
        return "md-settings";
      default:
        return "md-home";
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 30,
        paddingBottom: 20,
        paddingTop: 10,
        justifyContent: "space-between",
      }}
    >
      {state.routes.map((route, routeIdx) => (
        <Ionicons
          name={getIcon(route.name)}
          key={route.key}
          size={32}
          style={{
            color:
              routeIdx === state.index
                ? Colors.primaryDark
                : Colors.primaryText,
          }}
          onPress={() => navigation.navigate(route.name)}
        />
      ))}
    </View>
  );
};

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerTitle: () => <Header />,
          // headerStyleInterpolator: forFade,
          // headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
          // cardStyleInterpolator: HeaderStyleInterpolators.forUIKit
          // headerShadowVisible: true,
          // animationEnabled: false,
          // animationTypeForReplace: "push",
          // headerMode: "float",
          // headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Overview" }}
        />
        <Tab.Screen name="Settings" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerTitle: () => <Header />,
//           headerBackTitleVisible: false,
//           headerStyleInterpolator: forFade,
//           // headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
//           // cardStyleInterpolator: HeaderStyleInterpolators.forUIKit
//           // headerShadowVisible: true,
//           // animationEnabled: false,
//           // animationTypeForReplace: "push",
//           // headerMode: "float",
//           // headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
//         }}
//       >
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: "Overview" }}
//         />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default App;
