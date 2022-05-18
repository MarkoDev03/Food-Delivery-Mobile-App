import { View, Image, TouchableNativeFeedback, Text, StyleSheet } from "react-native";
import { localRestaurants } from "../home/RestaurantItem";
import React from "react";
import LottieView from "lottie-react-native";

export default function Restaurants({ navigation, ...props }) {
  const mode = props.mode;

  const openRestauranr = (restaurant) => {
    navigation.navigate("RestaurantDetails", {
      name: restaurant.name,
      image: restaurant.image_url
        ? restaurant.image_url
        : localRestaurants[0].image_url,
      price: restaurant.price,
      reviews: restaurant.review_count,
      rating: restaurant.rating,
      categories: restaurant.categories,
    });
  }

  return (
    <React.Fragment>
      { props.notFound == false ? (
        props.restaurants.map((restaurant, index) => (     
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(mode == true ? "#444" : "#eee")} key={index} onPress={() => {openRestauranr(restaurant)}}>
            <View  style={[styles.restaurant, {backgroundColor: mode === false ? "white" : "black"}]}>
            <View style={styles.imageWrp}>
              <Image source={{uri: restaurant.image_url ? restaurant.image_url  : localRestaurants[0].image_url}} style={styles.image} />
              <View style={styles.textWrp}>
                <Text style={{fontWeight:"bold",color:mode === false ? "black" : "white"}}>{restaurant.name}</Text>
                <Text style={{color:"gray"}}>{restaurant.location.address1? restaurant.location.address1: "No address"}</Text>
              </View>
            </View>
            <View style={[styles.rating, {backgroundColor: mode === false ? "#eee" : "#444"}]}>
              <Text style={{fontSize: 15, color:mode === false ? "black" : "white"}}>{restaurant.rating}</Text>
            </View>
            </View>
          </TouchableNativeFeedback>
         
        ))
      ) : (
        <View
          style={[ styles.lottieWrp, {backgroundColor:mode === false ? "white" : "black"}]}>
         {
           props.notFound == true ?  (
            <LottieView style={styles.lottie} source={mode === false ? require("../../assets/animations/notfound.json") : require("../../assets/animations/notfound-dark.json")} autoPlay
            speed={1.5}
            loop={true}
      />
           ) : (<></>)
         }
        </View>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  lottie: {
    height: 300, 
    alignSelf: "center", 
    marginBottom: 30
  },
  lottieWrp: {
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    marginVertical:10,
  },
  restaurant: {
    padding: 5,
    paddingVertical:8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection:"row",
    borderRadius:8,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  textWrp: {
    marginLeft:10,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    flexDirection:"column"
  },
  imageWrp: {
    justifyContent:"flex-start",
    alignItems:"center",
    flexDirection:"row"
  },
 rating: {
  width: 32,
  height: 32,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 50,
 }
});