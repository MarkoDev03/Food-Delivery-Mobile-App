import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, KeyboardAvoidingView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const SearchBar = ({ cityHandler, mode }) => {

  const [textValue, setTextValue] = useState("");
  const [length, setLength] = useState(0);
  const [length2, setLength2] = useState(0);
  const [length3, setLength3] = useState(0);


  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="height">
      <View style={[ styles.bar, {backgroundColor: mode === false ? "#eee" : "#262626"}]} onLayout={(e) => {setLength2(e.nativeEvent.layout.width - 10)}}>
        <View style={[ styles.contentOne, {width: (length2  - length)}]}>
        <View onLayout={(e) => {setLength3(e.nativeEvent.layout.width - 10)}}>
          <Ionicons name="location-sharp" size={24} style={{color:"red"}} />
        </View>
        <TextInput style={[ styles.field, {backgroundColor: mode === false ? "#eee" : "#262626",width:(length2  - length - length3 - 10),color: mode === false ? "black" : "white"}]}
          placeholderTextColor={mode === false ? "#757575" : "#757575"}
          placeholder="Search"
          onChangeText={text =>setTextValue(text)}
          value={textValue}/>
        </View>
        <TouchableOpacity onLayout={(e) => {setLength(e.nativeEvent.layout.width + 10)}}
          style={[ styles.btn, {backgroundColor: mode === false ? "white" : "#474545",}]} onPress={() => {cityHandler(textValue); Keyboard.dismiss();}}>
          <AntDesign name="clockcircle" size={24} style={{ marginRight: 6,color:mode === false ? "black" : "white" }} />
          <Text style={{color:mode === false ? "black" : "white"}}>Search</Text>
        </TouchableOpacity >
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
     wrapper: {
      marginTop: 25,
      flexDirection: "row",
      borderRadius: 60,
      marginTop: 14,
      justifyContent: "center",
      alignItems:"center",
      width:"100%"
     },
     bar: {
      borderRadius: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width:"100%",
      padding:5,
     },
     contentOne: {
      justifyContent:"space-between",
      alignItems:"center",
      flexDirection:"row",
     },
     field: {
      borderRadius: 20,
      fontWeight: "100",
      fontSize:16,
     },
     btn: {
      flexDirection: "row",
      padding: 9,
      borderRadius: 30,
      alignItems: "center",
     }
})

export default SearchBar;