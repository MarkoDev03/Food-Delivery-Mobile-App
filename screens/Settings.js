import { View, Text, useColorScheme, ScrollView, SafeAreaView, StatusBar as Bar } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ToggleSwitch from "toggle-switch-react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { StatusBar } from "expo-status-bar";

export default function Settings({ navigation }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.themeReducer.modes.dark);
  const [cache, setCache] = React.useState(false);
  const [userData, setUserData] = React.useState(false);

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("@theme");
      await AsyncStorage.removeItem("@type");
  } catch (error) {
      console.error('Error clearing app data.');
  }
  }

  const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        console.log(keys)
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
}

  const SwitchButton = ({ isLast, text, theme, type }) => {
    const colorScheme = useColorScheme();

    const storeData = async (value, type) => {
      await AsyncStorage.setItem("@type", type);

      try {
        if (type !== "system") {
          await AsyncStorage.setItem("@theme", value);

          dispatch({
            type: "CHANGE_COLOR_TEHEM",
            payload: {
              mode: value === "light" ? false : true,
              type: type,
            },
          });
        } else if (type == "system") {
          await AsyncStorage.setItem("@theme", colorScheme);

          dispatch({
            type: "CHANGE_COLOR_TEHEM",
            payload: {
              mode: colorScheme == "dark" ? true : false,
              type: type,
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    const mode = useSelector((state) => state.themeReducer.modes.dark);
    const typeRedux = useSelector((state) => state.themeReducer.modes.type);
    let themeName = mode === false ? "light" : "dark";

    const getType = () => {
      if (themeName === theme && typeRedux === "manual") {
        return true;
      } else if (themeName !== theme && typeRedux === "manual") {
        return false;
      } else if (
        typeRedux === "system" &&
        theme !== "dark" &&
        theme !== "light"
      ) {
        return true;
      }
    };

    return (
      <View
        style={{
          width: "100%",
          borderBottomColor: mode === false ? "#9da39d" : "#444",
          borderBottomWidth: isLast === true ? 0 : 0,
          justifyContent: "space-between",
          padding: 10,
          flexDirection: "row",
        }}
      >
        <Text
          style={{ color: mode === false ? "black" : "white", fontSize: 19 }}
        >
          {text}
        </Text>
        <BouncyCheckbox
          disableBuiltInState={true}
          fillColor="green"
          style={{
            marginLeft: 5,
          }}
          onPress={(checkboxValue) => {
            if (checkboxValue == true) {
              storeData(theme, type);
            } else {
              let theme_ = theme === "light" ? "dark" : "light";
              storeData(theme_, type);
            }
          }}
          isChecked={getType()}
        />
      </View>
    );
  };

  return (
    <>
    <SafeAreaView style={{
      flex:1,
      backgroundColor: mode === false ? "white" : "black",
      paddingTop: Bar.currentHeight
    }}>
    <StatusBar style={mode == true ? "light" : "dark"} />
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
          source={require("../assets/animations/settings2.json")}
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
          source={require("../assets/animations/settings2.json")}
          autoPlay
          speed={0.5}
          loop={true}
        />
    </View>
    <ScrollView
      style={{
        backgroundColor: mode === false ? "white" : "black",
        paddingBottom:100
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: mode === false ? "#eee" : "#141414",
            borderRadius: 30,
            padding: 6,
          }}
        >
          <View
            style={{
              width: "100%",
              borderBottomColor: mode === false ? "#9da39d" : "#333333",
              borderBottomWidth: .5,
              justifyContent: "flex-start",
              flexDirection:"row",
              alignItems:"center",
              padding: 10,
              paddingLeft:3
            }}
          >
            <MaterialCommunityIcons name="palette" size={35} color="red" />
            <View style={{justifyContent:"flex-start", alignItems:"flex-start", marginLeft:5}}>
            <Text
              style={{
                color: mode === false ? "black" : "white",
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              Color theme
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 15,
              }}
            >
              Change the appearance of app
            </Text>
            </View>
          </View>
          <View style={{height:10,width:1}}></View>
          <SwitchButton
            isLast={false}
            text="Light"
            theme="light"
            type="manual"    
          />
               <View style={{height:10,width:1}}></View>
          <SwitchButton isLast={false} text="Dark" theme="dark" type="manual" />
          <View style={{height:10,width:1}}></View>
          <SwitchButton
            isLast={true}
            text="System default"
            theme="lighsst"
            type="system"
          />
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: mode === false ? "#eee" : "#141414",
            borderRadius: 30,
            padding: 6,
            marginTop:20,
            marginBottom:50
          }}
        >
          <View
            style={{
              width: "100%",
              borderBottomColor: mode === false ? "#9da39d" : "#333333",
              borderBottomWidth: .5,
              justifyContent: "flex-start",
              flexDirection:"row",
              alignItems:"center",
              padding: 10,
              paddingLeft:3,
             
            }}
          >
               <MaterialCommunityIcons name="memory" size={35} color="red" />
             <View style={{justifyContent:"flex-start", alignItems:"flex-start", marginLeft:5}}>
            <Text
              style={{
                color: mode === false ? "black" : "white",
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              Memory manager
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 15,
              }}
            >
              Reduce the app size by clearing app data
            </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              borderBottomColor: mode === false ? "#9da39d" : "#444",
              justifyContent: "space-between",
              padding: 10,
              flexDirection: "row",
              marginTop:10
            }}
          >
            <Text
              style={{
                color: mode === false ? "black" : "white",
                fontSize: 19,
              }}
            >
              Clear cache
            </Text>
            <ToggleSwitch
              isOn={cache}
              onColor="green"
              offColor="#8e8e93"
              size="meduim"
              onToggle={(isOn) => {
                setCache(isOn);
                clearAppData();
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              padding: 10,
              flexDirection: "row",
              marginTop:10
            }}
          >
            <Text
              style={{
                color: mode === false ? "black" : "white",
                fontSize: 19,
              }}
            >
              User data
            </Text>
            <ToggleSwitch
              isOn={userData}
              onColor="green"
              offColor="#8e8e93"
              size="meduim"
              onToggle={(isOn) => {
                setUserData(isOn);
                clearUserData();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
    </>
  );
}
