import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Banner = ({ cover }) => { 
    return (
    <View style={styles.wrapper}>
       <View style={styles.content}>
       <Text style={styles.banner} adjustsFontSizeToFit numberOfLines={3}>Unlimited $0 delivery fee +5% off with Eats Pass</Text>
        <Text style={styles.gray} adjustsFontSizeToFit numberOfLines={2}>Eat, save and support restaurants</Text>
        <View style={styles.button}>
             <Text style={{color:"white", fontSize:13, marginRight:3,}} adjustsFontSizeToFit numberOfLines={1}>Try 1 month free</Text>
             <MaterialCommunityIcons name="arrow-right" size={15} color="white"/>
        </View>
       </View>
       <Image source={cover} style={{width:"100%", height:190, zIndex:1}} />
   </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        width:210, 
        zIndex:9,
        fontWeight:"bold",
        fontSize:20,
        maxHeight:"50%"
    },
    gray: {
        width:210, 
        color:"black",
        zIndex:9,
        fontSize:15,
        marginVertical:3,
        maxHeight:"30%"
    },
    wrapper: {
        width:"100%",
        height:190
    },
    button: {
        backgroundColor:"black", 
        padding:5, 
        paddingHorizontal:19,
        borderRadius:30,
   
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    content: {
        position:"absolute", 
        top:10, 
        left:10, 
        zIndex:9,
        width:"100%",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    }
})

export default Banner;
