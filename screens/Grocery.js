import { View, SafeAreaView, StatusBar } from 'react-native';
import React, { useLayoutEffect } from 'react';
import MenuItem from '../components/restaurantDetails/MenuItem';
import { foods } from './RestaurantDetails';
import { useSelector, useDispatch } from "react-redux";

export default function Grocery({ navigation, route }) {
  const mode = useSelector((state) => state.themeReducer.modes.dark);
 
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    async function get() {
     try {
         const value = await AsyncStorage.getItem('@theme');
         const type = await AsyncStorage.getItem("@type");
      
         if(value !== null && type !== null) {  

          if (type === "system") {
           dispatch({
               type: "CHANGE_COLOR_TEHEM",
               payload: {
                  mode:colorScheme === "light" ? false : true,
                  type:type
               },
             });
          } else {
           dispatch({
               type: "CHANGE_COLOR_TEHEM",
               payload: {
                  mode:value === "light" ? false : true,
                  type:type
               },
             });
          }
    } else {
        dispatch({
            type: "CHANGE_COLOR_TEHEM",
            payload: {
               mode:true,
               type:"manual"
            },
          });
    }
       } catch(e) {
         // error reading value
       }
    }
    get()
 }, []);

  return (
    <SafeAreaView style={{
        backgroundColor:mode === false ? "white" : "black",
        paddingTop:StatusBar.currentHeight
    }}>
        <View style={{marginBottom:0}}>
        <MenuItem  
          mode={mode}
          foods={foods}
          hideCheckbox={true}
          textWidth={230}  />
        </View>
    </SafeAreaView>
  );
}
