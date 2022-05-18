import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigationState } from '@react-navigation/native'  

const BottomTab = ({ navigation, mode }) => {

  const routes = useNavigationState(state => state.routes);
  const currentRoute = routes[routes.length -1].name;

  const { index } = navigation.getState();

  const Icon = (props) => {

    const getColor = () => {
      if (mode === false && index != props.index) {
        return "black";
      } 
       if (mode === true && index != props.index) {
        return "white";
      } 
       if (index == props.index) {
        return "red";
      } 
    }

    return (
    <TouchableOpacity onPress={() => {
      navigation.navigate(props.screen, {
        mode:mode
      })
    }}>
      <View>
        <FontAwesome5
          name={props.icon}
          size={24}
          style={{
            marginBottom: 3,
            alignSelf: "center",
          }}
          color={getColor()}
        />
        <Text style={{fontSize:12, color: getColor()}}>{props.text}</Text>
      </View>
    </TouchableOpacity>
    );
  }

    return (
        <View
        style={[style.tab, {backgroundColor:mode === false ? "#eee" : "black",borderTopColor:mode === false ? "#eee" : "#444"}]}>
        <Icon icon="home" text="Home" screen="Home" index={0} />
        <Icon icon="search" text="Browse"  screen="Browse" index={1}  />
        <Icon icon="shopping-bag" text="Grocery" screen="Grocery" index={2} />
        <Icon icon="cog" text="Settings" screen="Settings" index={3}  />
        <Icon icon="user" text="Account" screen="Home" index={4}  />
      </View>
    )
}

const style = StyleSheet.create({
   tab: {
    flexDirection: "row",
    padding: 8,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    borderTopWidth:.3
   }
})

export default BottomTab;
