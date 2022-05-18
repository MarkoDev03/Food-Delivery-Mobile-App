import React from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import MenuItem from "../components/restaurantDetails/MenuItem";

export default function OrderCompleted({ navigation, route }) {
  const mode = route.params.mode;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: mode === false ? "white" : "black",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          alignItems: "center",
          height: "100%",
        }}
      >
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", margin:15, textAlign:"center", marginBottom:25, color:mode === false ? "black" : "white" }}>
          Your order at {route.params.restaurantName} has been placed for ${route.params.total}
        </Text>
        <MenuItem
          restaurantName={route.params.restaurantName}
          foods={route.params.items}
          hideCheckbox={true}
          textWidth={230}
          mode={mode}
        />
        <LottieView
          style={{ height: 200, alignSelf: "center", marginBottom: 60, paddingTop:5 }}
          source={mode === false ? require("../assets/animations/cooking.json") : require("../assets/animations/cooking-dark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
      </View>
    </SafeAreaView>
  );
}
