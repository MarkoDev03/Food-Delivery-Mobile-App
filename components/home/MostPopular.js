import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const MostPopular = ({ mode, restaurants, city, localRestaurants, navigation }) => {

   let popular = restaurants.length > 0 ? restaurants.sort((a, b) => {return a.review_count < b.review_count}) : []
   
   const Popular = ({ data }) => {
       const openRestaurant = () => {
        navigation.navigate("RestaurantDetails", {
            name: data.name,
            image: data.image_url ? data.image_url  : localRestaurants[0].image_url,
            price: data.price,
            reviews: data.review_count,
            rating: data.rating,
            categories: data.categories,
            mode: mode
          })
       }
       return (
            <TouchableOpacity style={styles.content}  
            onPress={() => {openRestaurant()}}>
                 <Image source={{ uri: data.image_url }} style={styles.img} />
                 <Text style={{ color: mode == true ? "#fff" : "#000", fontSize: 16, maxWidth:"100%" }} numberOfLines={1}  ellipsizeMode="tail">{data.name}</Text>
                 <Text style={{ color:"gray", fontSize:13 }}>Reviews {data.review_count}</Text>
            </TouchableOpacity>
       )
   }

    return (
        <View style={[styles.wrapper, { borderBottomColor: mode === false ? "#eee" : "#262626", display: popular.length > 0 ? "flex": "none"}]}>
             <View style={styles.textWrapper}>
                  <Text style={[styles.boldText, { color: mode == true ? "#fff" : "#000" }]}>Most popular</Text>
                  <Text style={[styles.mini, { color:"gray" }]} adjustsFontSizeToFit>4 most popular and rated restaurants in {city}</Text>
                 {
                     popular.length > 0 && (
                        <View style={styles.wrp}>
                        <View style={styles.wrp2}>
                            <Popular data={popular[0]} key={0} />
                            <Popular data={popular[1]} key={1} />
                      </View>
                      <View style={styles.wrp2}>
                            <Popular data={popular[2]} key={2} />
                            <Popular data={popular[3]} key={3} />
                      </View>
             </View>
                     )
                 }
             </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
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
    wrp: {
        width:"100%",
         justifyContent:"flex-start",
          alignItems:"flex-start"
    },
    wrp2: {
        width:"100%", 
        justifyContent:"space-between",
         alignItems:"center",
          flexDirection:"row"
    },
    img: {
        width:"100%", 
        height:150, 
        borderRadius: 20
    },
    content: {
        width:"48.5%",
         justifyContent:"flex-start",
          alignItems:"flex-start",
           marginTop:8
    }
})

export default MostPopular;
