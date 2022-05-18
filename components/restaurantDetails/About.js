import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function About(props) {
const { image, name, reviews, rating, categories, price } = props.route.params;
const formattedCategories = categories.map((category) => category.title).join(" • ");
const description = `${formattedCategories} ${price ? " • " + price : ""} • 🎫 • ${rating} ⭐ (${reviews}+)`;
const mode = useSelector((state) => state.themeReducer.modes.dark);

    return (
        <View style={{
            width:"100%",
            backgroundColor:mode === false ? "white" : "black"
        }}>
            <Image source={{uri: image}} style={{
                width:"100%",
                height:200
            }} />
            <Text style={{
                fontSize:23,
                marginTop:5,
                marginHorizontal:15,
                fontWeight:"bold",
                color:mode === false ? "black" : "white"
            }}>{name}</Text>
            <Text style={{
                marginTop:5,
                marginHorizontal:15,
                fontWeight:"400",
                fontSize:15.5,
                color:mode === false ? "black" : "gray"
            }}>{description}</Text>
            <View style={{
                width:"100%",
                height:1,
                backgroundColor:mode === false ? "#9da39d" :"#5c5e5c",
                marginTop:8
            }}></View>
        </View>
    )
}
