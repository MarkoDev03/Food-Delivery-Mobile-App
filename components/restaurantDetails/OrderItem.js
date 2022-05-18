import React from 'react'
import { View, Text } from 'react-native'

export default function OrderItem({ item, mode }) {
    const { title, price } = item;
    return (
        <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            padding:10,
            borderBottomWidth:1,
            borderBottomColor:"#999",
            backgroundColor:mode === false ? "white" : "#0f0f0f"
        }}>
            <Text style={{
                fontWeight:"600",
                fontSize:16,
                color:mode === false ? "black" : "white"
            }}>{title}</Text>
            <Text style={{
                fontSize:16,
                opacity:0.7,
                color:mode === false ? "black" : "white"
            }}>{price}</Text>
        </View>
    )
}
