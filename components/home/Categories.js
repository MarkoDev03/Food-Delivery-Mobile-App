import React, { useEffect, useRef } from "react";
import { View, Text, Image, Dimensions, Animated, Easing, StyleSheet } from 'react-native';
import { useSelector } from "react-redux"
  
const Categories = (props) => {

    let slide = useRef(new Animated.Value(0)).current 
    const loaded = useSelector((state) => state.loadingReducer.loaded);
    let bgColor = props.mode === false ? "white" : "black"

    useEffect(() => {
      if (loaded == true) {     
        Animated.timing(
          slide, {
            toValue: 1,
            duration:100,
            useNativeDriver: true,
            easing: Easing.linear
          }
        ).start()
      }
    }, [])

    const Category = ({ item, index }) => {
    let moveRight = useRef(new Animated.Value(0)).current
       
      useEffect(() => {
          let delay = index == 0 ? 0 : (150 * index)
            Animated.timing(
              moveRight , {
                toValue: 1,
                duration:280,
                delay: delay,
                useNativeDriver: true
              }
            ).start()     
        }, [index]);
 
       return (
        <Animated.View style={[styles.item, {
          transform: [
            { translateX: moveRight.interpolate({
               inputRange: [0, 1],
               outputRange: [500, 0]
            }) }
          ]
      }]}
      >
       <View style={[ styles.wrpGray, {backgroundColor:props.mode == true ? "#292929" : "#eee"}]}>
       <Image source={item.image} style={styles.imgSm} />
       </View>
          <Text style={[styles.itm, {color:props.mode === false ? "black" : "white"}]} numberOfLines={1} adjustsFontSizeToFit>{item.text}</Text>
      </Animated.View>
       )
    }

    return (
      <View style={[styles.wrp, {backgroundColor:bgColor}]}>
          <View style={styles.typeWrp}>
              <View style={[styles.imgWrp, {backgroundColor:props.mode == true ? "#292929" : "#eee"}]}>
                   <Image source={require("../../assets/images/restaurants.png")} style={styles.img} />
                   <Text style={[styles.name, {color: props.mode == true ? "#fff" : "#000"}]}>Restaurants</Text>
              </View>
              <View style={[styles.imgWrp, {backgroundColor:props.mode == true ? "#292929" : "#eee"}]}>
                   <Image source={require("../../assets/images/grocery.png")} style={styles.img} />
                   <Text style={[styles.name, {color: props.mode == true ? "#fff" : "#000"}]}>Grocery</Text>
              </View>
          </View>
          <Animated.ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={[styles.scroll, {backgroundColor:bgColor, borderBottomColor:props.mode === false ? "#eee" : "#262626"}]}>
           {props.items.sort((a, b) => 0.5 - Math.random()).map((item, index) => (
                <Category index={index} item={item} key={index} />
           ))}
        </Animated.ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
   scroll: {
    paddingVertical:10,         
    borderBottomWidth:1,
    paddingLeft:7
   },
   imgWrp: {
    justifyContent:"center", 
    alignItems:"center", 
    borderRadius: 10, 
    padding:10, 
    width:"48.5%"
   },
   img: {
    width:45, 
    height:45
   },
   wrp: {
      width:"100%",
     paddingTop:10
   },
   typeWrp: {
    width:"100%",
     paddingHorizontal:8, 
     flexDirection:"row", 
     justifyContent:"space-between", 
     alignItems:"center"
   },
   name: {
    fontSize:16, 
    fontWeight:"700"
   },
   itm: {
    fontSize:13,
    fontWeight:"bold",
   },
   imgSm: {
    width:50,
    height:40,
    resizeMode:"contain",
   },
   wrpGray:{
    padding:10,
    borderRadius:10,
    marginBottom:5,
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
   },
   item: {
    alignItems:"center",
    marginRight: 15,
    justifyContent:"center",
    width: (Dimensions.get("window").width / 4 - 15), 
   }
})

export default Categories;