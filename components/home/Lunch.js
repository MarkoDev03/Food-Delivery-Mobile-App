import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";

const Lunch = ({ mode, restaurants, navigation, visibility, description, title, color, animated, animation, starred }) => {

    const timeSmall = [5, 10, 15, 20, 25]
    const timeBig = [30,35,40,45,50,55]
 
    const Restaurant = ({ restaurant }) => {
        let bounce = React.useRef(new Animated.Value(0)).current

        const bounceEffect = () => {
            Animated.timing(
               bounce, 
               {
                   toValue: 1,
                   duration:100,
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
                    duration:100,
                    useNativeDriver: true,
                    easing: Easing.linear
                }
             ).start()
        }

        const openRestaurant = (restaurant) => {
            navigation.navigate("RestaurantDetails", {
                name: restaurant.name,
                image: restaurant.image_url ? restaurant.image_url : noImg,
                price: restaurant.price,
                reviews: restaurant.review_count,
                rating: restaurant.rating,
                categories: restaurant.categories,
                mode: mode
              })
        }

        let stars = [1,2,3,4,5]
        let earned = Math.floor(Math.random() * (5 - 0 + 1)) + 0
        let many = 5 - earned

        let time = timeSmall[Math.floor(Math.random() * timeSmall.length)].toString() + " - " + timeBig[Math.floor(Math.random() * timeBig.length)].toString()
        let rndSpend = Math.floor(Math.random() * (20 - 5 + 1)) + 5
        let rndSave = Math.floor(Math.random() * (15 - 3 + 1)) + 3
        let noImg = "https://media.istockphoto.com/photos/food-backgrounds-table-filled-with-large-variety-of-food-picture-id1155240408?k=20&m=1155240408&s=612x612&w=0&h=Zvr3TwVQ-wlfBnvGrgJCtv-_P_LUcIK301rCygnirbk="

        return (
            <TouchableOpacity  onPressIn={bounceEffect} onPressOut={leaveEffect} onPress={() => {openRestaurant(restaurant)}}>
           <Animated.View style={[styles.food, {
                transform: [
                    { scale: bounce.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.93]
                    }) }
                ]
             }]}>
               <View style={styles.imagewrp}>
                  {visibility && (
                    <View style={[styles.popup, { backgroundColor: color }]}>
                        <Text style={styles.spend}>Spend US${rndSpend}, save US${rndSave}</Text>
                     </View>
                  )
                  }
                    <Image source={{ uri: restaurant.image_url ? restaurant.image_url  : noImg}} style={styles.image} />
                    <TouchableOpacity style={styles.heart}>
                       <MaterialCommunityIcons name="heart-outline" size={24} color="white"/>
                    </TouchableOpacity>
               </View>
               <View style={styles.wrap}>
               <View style={styles.alignText}>
                   <Text style={{color: mode == true ? "#fff" : "#000", fontSize: 17}} ellipsizeMode="tail" numberOfLines={1}>{restaurant.name} ({restaurant.location.address1 ? restaurant.location.address1 : "No address"})</Text>
                   <View style={styles.icons}>
                   <MaterialCommunityIcons name="clock-outline" size={15} color="#ffc043"/>
                  <Text style={[styles.mini, { color:"gray" }]}>$0.99 Delivery Free • {time} min</Text> 
                  </View> 
               </View>
                 
               <View style={styles.setcontent}>
                  <View style={[ styles.content, {backgroundColor:mode === false ? "#eee" : "#444",}]}>
                     <Text style={{fontSize:14, color: mode === false ? "black" : "white",}}>{restaurant.rating}</Text>
                  </View>
               </View>
               </View>
               {
                      starred && (
                        <View style={styles.starred}>
                                   <MaterialCommunityIcons name="star" size={25} color="#FFD700"/>
                                  <View style={styles.items}>
                                  <Text style={{color: mode == true ? "#fff" : "#000", fontSize: 15}} ellipsizeMode="tail" >{many} orders until US$15 reward</Text>
                                   <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:3}}>
                                   <View  style={{width:"18%", height:5, backgroundColor:earned > 0 ? "rgb(63, 192, 96)" : "gray", marginLeft: 2, borderRadius: 10}}></View>
                                   <View  style={{width:"18%", height:5, backgroundColor:earned > 1 ? "rgb(63, 192, 96)" : "gray", marginLeft: 2, borderRadius: 10}}></View>
                                   <View  style={{width:"18%", height:5, backgroundColor:earned > 2 ? "rgb(63, 192, 96)" : "gray", marginLeft: 2, borderRadius: 10}}></View>
                                   <View style={{width:"18%", height:5, backgroundColor:earned > 3? "rgb(63, 192, 96)" : "gray", marginLeft: 2, borderRadius: 10}}></View>
                                   <View  style={{width:"18%", height:5, backgroundColor:earned > 4 ? "rgb(63, 192, 96)" : "gray", marginLeft: 2, borderRadius: 10}}></View>
                                   </View>
                                  </View>
                        </View>  
                      )
                  }
           </Animated.View>
           </TouchableOpacity>
        )
    }
    
    return (
        <View style={[styles.wrapper, { borderBottomColor: mode === false ? "#eee" : "#262626", }]}>
           {
               !animated ? (
                <View style={styles.textWrapper}>
                <Text style={[styles.boldText, { color: mode == true ? "#fff" : "#000" }]}>{title}</Text>
                <View style={styles.bottomText}>
                      <Text style={[styles.mini, { color:"gray" }]}>{description}</Text>
                      <Text style={[styles.mini, { color: mode == true ? "#fff" : "#000" }]}>See all</Text>
                </View>
           </View>
               ) : (
            <View style={styles.animated}>
                <View style={styles.animatedWrp}>
                   <Text style={[styles.boldText, { color: mode == true ? "#fff" : "#000" }]}>{title}</Text>
                   <Text style={[styles.mini, { color:"gray" }]}>{description}</Text>
                </View>
                {/* <LottieView style={styles.animationLottie} source={animation} autoPlay speed={1.5} loop={true}/> */}
           </View>
               )
           }
             <View style={styles.foods}>
             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.list}>
            {
              restaurants.sort((a, b) => 0.5 - Math.random()).map((restaurant, index) => (
                    <Restaurant key={index} restaurant={restaurant} />
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
        borderBottomWidth:5,
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
        fontSize: 14,
        marginLeft:3
    },
    all: {
        fontWeight:"bold",
        fontSize:14
    },
    food: {
        justifyContent:"flex-start",
        alignItems:"flex-start",
        padding: 5,
        paddingHorizontal:10,
        width:290,
        marginRight:20,
        marginLeft:0,
        paddingLeft:0,
        borderRadius:0
    },
    image: {
        width: 290,
        height: 145,
        borderRadius:10
    },
    heart: {
        position:"absolute",
        right:0,
        top:15
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
        width: "85%",
    },
    setcontent: {
       width:"15%",
       justifyContent:"center",
       alignItems:"center",
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
    },
    wrap: {
        width:300,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        marginTop:4,
    },
    content: {
        width:30,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 30
    },
    popup: {
        borderTopRightRadius: 15,
        borderBottomRightRadius:15,
        padding:3,
        paddingHorizontal: 10,
        position:"absolute",
        left:0,
        top:15,
        justifyContent:"flex-start",
        alignItems:"center",
        flexDirection:"row",
        zIndex:9999
    },
    imagewrp: {
        width:"100%"
    },
    icons: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    spend: {
        color:"white", 
        marginLeft:5, 
        fontSize:12
    },
    animatedWrp: {
        width:"80%",
        justifyContent:"flex-start",
        alignItems:"flex-start"
    },
    animated: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    animationLottie: {
        width: 45,
        height: 45,
        justifyContent:"center",
        alignItems:"center",
    },
    starred: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },
    items: {
        width: 230,
        justifyContent:"flex-start",
        alignItems:"flex-start",
        marginLeft:10
    }
})

export default Lunch;
