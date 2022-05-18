import React from "react";
import { View, Image, TouchableOpacity, Text, ScrollView, StyleSheet, Animated, Easing } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { localRestaurants } from "./RestaurantItem";

const Restaurant = ({ restaurant, mode, navigation }) => {

    let animation = React.useRef(new Animated.Value(0)).current
    
    const timeSmall = [5, 10, 15, 20, 25];
    const timeBig = [30,35,40,45,50,55];

    let textColor = mode === false ? "black" : "white";
    let titleColor = mode == true ? "white" : "black";
    let workColor = restaurant.is_closed ? "red" : "green";
    let ratingColor = mode === false ? "#eee" : "#444";
    let bgc = mode === false ? "white" : "black";
    let border = mode === false ? "#eee" : "#262626";
    let icon = mode == true  ? "#fff" : "#000";
    let categoryColor =  mode === false ? "#dbd9d9" : "#444";

    let delivery = `${timeSmall[Math.floor(Math.random() * timeSmall.length)]} -${timeBig[Math.floor(Math.random() * timeBig.length)]} min`;
    let address = restaurant.location.address1 ? restaurant.location.address1 : "No address";
    let openState = restaurant.is_closed ? "CLOSED" : "OPEN";
    let price = restaurant.price ? restaurant.price : "$$";
    let uri = restaurant.image_url ? restaurant.image_url  : localRestaurants[0].image_url

    const openRestaurant = () => {
        navigation.navigate("RestaurantDetails", {
            name: restaurant.name,
            image: restaurant.image_url ? restaurant.image_url  : localRestaurants[0].image_url,
            price: restaurant.price,
            reviews: restaurant.review_count,
            rating: restaurant.rating,
            categories: restaurant.categories,
            mode: mode
          })
    }

    const pressIn = () => {
        Animated.timing(
            animation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
                easing: Easing.linear
            }
        ).start()
    }

    const PressOut = () => {
        Animated.timing(
            animation, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true, 
                easing: Easing.linear
            }
        ).start()
    }

    return (
        <TouchableOpacity style={[styles.wrapper, { backgroundColor:bgc, borderBottomColor: border, transform: [
            { scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.93]
            })}
        ]}]} 
            onPressIn={pressIn}
            onPressOut={PressOut}
            onPress={() => {openRestaurant()}}>
            <View>
              <Image source={{uri: uri}} style={styles.image} />
              <View style={styles.delivery}>
                     <MaterialCommunityIcons name="clock-outline" size={20} color="white" />
                  <Text style={styles.time}>{delivery}</Text>
              </View>
              <TouchableOpacity style={styles.heart}>
                <MaterialCommunityIcons name="heart-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <View style={styles.width}>
                <Text style={[styles.name, {color:textColor}]} numberOfLines={1} adjustsFontSizeToFit>{restaurant.name}</Text>
                <View style={styles.location}>     
                    <Ionicons name="md-location" size={15} color={icon} style={{marginRight:3}} />
                   <Text style={styles.gray} numberOfLines={1} adjustsFontSizeToFit>{address} • </Text>        
                    <View  style={[styles.open, {backgroundColor: workColor}]}>
                        <Text style={styles.white} numberOfLines={1} adjustsFontSizeToFit>{openState}</Text>
                    </View>
                   <Text style={styles.dot} numberOfLines={1} adjustsFontSizeToFit> • </Text>
                   <Text style={{color:textColor, maxWidth:"20%"}} numberOfLines={1} adjustsFontSizeToFit>{price}</Text>
                </View>
              </View>
             <View style={[ styles.rating, {backgroundColor: ratingColor}]}>
               <Text style={{fontSize:15,color: textColor}}>{restaurant.rating}</Text>
             </View>
            </View>
            {
              restaurant.categories ? (
                <View style={styles.scroll}>
              
                   { restaurant.categories[0] && (
                        <View style={[ styles.category,{ backgroundColor: categoryColor}]} key={0 + "cat"}>
                        <Text style={{color:titleColor, fontSize: 12}}>{restaurant.categories[0].title}</Text>
                      </View>
                   )}
                   { restaurant.categories[1] && (
                        <View style={[ styles.category,{ backgroundColor: categoryColor}]} key={1 + "cat"}>
                        <Text style={{color:titleColor, fontSize: 12}}>{restaurant.categories[1].title}</Text>
                      </View>
                   )}
                   { restaurant.categories[2] && (
                        <View style={[ styles.category,{ backgroundColor: categoryColor}]} key={2 + "cat"}>
                        <Text style={{color:titleColor, fontSize: 12}}>{restaurant.categories[2].title}</Text>
                      </View>
                   )}
                   
               </View>
              ): (<></>)
            }
          </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    category: {
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 25,
        justifyContent:"center",
        alignItems:"center",
        marginRight: 5
    },
    scroll: {
        width:"100%",
        marginTop:5,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    rating: {
        width:32,
        height:32,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
    },
    delivery: {
        backgroundColor:"rgba(255, 17, 0, 1)",
        borderTopRightRadius: 15,
        borderBottomRightRadius:15,
        padding:5,
        paddingHorizontal: 10,
        position:"absolute",
        left:0,
        top:20,
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row"
    },
    image: {
        width: "100%",
        height: 190,
        borderRadius:8,
        paddingTop:0
    },
    name: {
        fontSize:15,
        fontWeight:"bold",
        maxWidth:"100%",
    },
    wrapper: {
        marginTop:5,
        padding:10,
        borderBottomWidth:5
    },
    open: {
        paddingHorizontal:5,
         paddingVertical:3, 
         borderRadius:15
    },
    location: {   
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        maxWidth:"100%"
    },
    info: {   
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:5
    },
    heart: {
        position: "absolute", 
        top: 20, 
        right: 20
    },
    gray: {
        fontSize:15, 
        color:"gray", 
        maxWidth:"56%"
    },
    dot: {
        fontSize:15, 
        color:"gray"
    },
    white: {
        color: "white", 
        fontSize:12
    },
    width: {
        maxWidth:"85%"
    },
    time: {
        color:"white", 
        marginLeft:5
    }
})

export default Restaurant;