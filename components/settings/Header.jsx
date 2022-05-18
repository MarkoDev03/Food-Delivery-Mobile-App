import { View, Text } from 'react-native';
import React from 'react';
import LottieView from "lottie-react-native";

export default function Header({ mode }) {
  return (
    <View style={{
        width:"100%",
        paddingVertical:10,
        backgroundColor:mode === false ? "white" : "black",
        borderBottomColor:mode === false ? "#eee" : "#262626",
        borderBottomWidth:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        paddingBottom:10
    }}>
       <LottieView
          style={{ height: 34, alignSelf: "center"}}
          source={require("../../assets/animations/settings2.json")}
          autoPlay
          speed={0.5}
          loop={true}
        />
      <Text style={{
          color:mode === false ? "black" : "white",
          fontSize:33,
          
      }}>SETTINGS</Text>
       <LottieView
          style={{ height: 34, alignSelf: "center"}}
          source={require("../../assets/animations/settings2.json")}
          autoPlay
          speed={0.5}
          loop={true}
        />
    </View>
  );
}
