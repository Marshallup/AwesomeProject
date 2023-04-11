import { FC } from "react";
import { Text, View } from "react-native";

export const Header: FC = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // transform: [{ translateX: 50 }],
      }}
    >
      <Text style={{ color: "red" }}>0</Text>
      <Text style={{ marginRight: 5, marginLeft: 5 }}>|</Text>
      <Text style={{ color: "green" }}>0</Text>
    </View>
  );
};
