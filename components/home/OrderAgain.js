import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { foods } from '../../screens/RestaurantDetails';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const OrderAgain = ({ mode }) => {

    let foodsCount = foods.length
    let foodCopy = [...foods]
    let foodCopyTwo = [...foods]
    let foodsOne = foodCopy.splice(0, foodsCount / 2)
    let foodsTwo = foodCopyTwo.splice(foodsCount / 2, foodsCount)

    const deliveryTime = [5, 10, 15, 20, 25, 30,35,40,45,50,55]
    
    const FoodItem = ({ food }) => {
        let bounce = React.useRef(new Animated.Value(0)).current

        const bounceEffect = () => {
            Animated.timing(
               bounce, 
               {
                   toValue: 1,
                   duration:170,
                   useNativeDriver: true,
                   easing: Easing.linear
               }
            ).start()
        }

        const leaveEffect = () => {
            Animated.timing(
                bounce, 
                {
                    toValue: 0,
                    duration:170,
                    useNativeDriver: true,
                    easing: Easing.linear
                }
             ).start()
        }

        const animateBothOfEffects = () => {
            bounceEffect()
            Animated.sequence(
                Animated.delay(170),
                Animated.timing(
                    bounce, 
                    {
                        toValue: 0,
                        duration:170,
                        useNativeDriver: true,
                        easing: Easing.linear
                    }
                 ).start()
            )
        }

        let bigRate = Math.floor(Math.random() * (5 - 1 + 1)) + 1
        let smallRate =  bigRate == 5 ? 0 : Math.floor(Math.random() * (9 - 1 + 1)) + 1

        return (
        <TouchableWithoutFeedback onPressIn={bounceEffect} onPressOut={leaveEffect} onPress={animateBothOfEffects}>
           <Animated.View style={[styles.food, {
               transform: [
                   { scale: bounce.interpolate({
                       inputRange: [0, 1],
                       outputRange: [1, 0.8]
                   }) }
               ]
           }]} 
           >
               <View>
                    <Image source={{ uri: food.image}} style={styles.image} />
                    <TouchableOpacity style={styles.heart}>
                       <MaterialCommunityIcons name="heart-outline" size={24} color="white" />
                    </TouchableOpacity>
               </View>
               <View style={styles.alignText}>
                   <Text style={{color: mode == true ? "#fff" : "#000", fontSize: 17}} numberOfLines={1} adjustsFontSizeToFit>{food.title}</Text>
                   <Text style={[styles.mini, { color:"gray" }]}>{food.price}</Text>
                   <View style={styles.align}>
                       <MaterialCommunityIcons name="clock-outline" size={21} color="#ffc043" />
                     <Text style={[styles.mini, { color:"gray", marginLeft: 2 }]}>{deliveryTime[Math.floor(Math.random() * deliveryTime.length)]} min</Text>
                   </View>
               </View>
               <View style={[styles.rate, {  backgroundColor: mode === false ? "#eee" : "#444"}]}>
                   <Text style={{color: mode == true ? "#fff" : "#000", fontSize: 12}} adjustsFontSizeToFit>{bigRate}.{smallRate}</Text>
               </View>
           </Animated.View>
           </TouchableWithoutFeedback>
        )
    }
    
    return (
        <View style={[styles.wrapper, { borderBottomColor: mode === false ? "#eee" : "#262626", }]}>
             <View style={styles.textWrapper}>
                  <Text style={[styles.boldText, { color: mode == true ? "#fff" : "#000" }]}>Hidden gems</Text>
                  <View style={styles.bottomText}>
                        <Text style={[styles.mini, { color:"gray" }]}>Up-and-comming  spots you'll like</Text>
                        <Text style={[styles.mini, { color: mode == true ? "#fff" : "#000" }]}>See all</Text>
                  </View>
             </View>
             <View style={styles.foods}>
             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.list}>
            {
                foodsOne.sort((a, b) => 0.5 - Math.random()).map((food) => (
                    <FoodItem key={food.title} food={food} />
                ))
            }
             </ScrollView>
             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.list}>
            {
                foodsTwo.sort((a, b) => 0.5 - Math.random()).map((food) => (
                    <FoodItem key={food.title} food={food} />
                ))
            }
             </ScrollView>
             </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width:"100%",
        padding:10,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        borderBottomWidth:3,
        paddingVertical:5
    },
    textWrapper: {
        width:"100%",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        marginBottom:5
    },
    bottomText: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    boldText: {
        fontWeight:"bold",
        fontSize:20
    },
    mini: {
        fontSize: 14
    },
    all: {
        fontWeight:"bold",
        fontSize:14
    },
    food: {
        justifyContent:"flex-start",
        alignItems:"flex-start",
        flexDirection:"row",
        padding: 5,
        marginRight:15,
        paddingLeft:0
    },
    image: {
        width: 90,
        height: 90,
        borderRadius:10
    },
    heart: {
        position:"absolute",
        right:5,
        top:5
    },
    list: {
        width:"100%",
    },
    foods: {
        width:"100%",
        justifyContent:"flex-start",
        alignItems:"flex-start"
    },
    alignText: {
        justifyContent:"flex-start",
        alignItems:"flex-start",
        marginLeft:10,
        width: 170
    },
    align: {
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },
    rate: {
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        marginLeft:5
    }
})

export default OrderAgain;
