import React from 'react';
import {View, StyleSheet, ScrollView, Image, Dimensions, Text} from 'react-native';

const Products = ({ mode, products, headline, description, textColor, isSweet}) => {
    return (
        <View style={{width:"100%",  borderBottomColor: mode === false ? "#eee" : "#262626", borderBottomWidth:5}}>
        <View style={styles.wrapper}>
            <Text style={{ color: textColor, fontSize:17 }}>{headline}</Text>
            <Text style={styles.grayTxt}>{description}</Text>
         </View>    
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.list}>
               {products.sort((a, b) => 0.5 - Math.random()).map((product, index) => (
                   <View style={[styles.itm, { width: isSweet ? 170 : 120 }]} key={index}>
                     <View style={[styles.gray,{backgroundColor: mode == true ? "#292929" : "#eee"}]}>
                      <Image source={product.image} style={{
                          width: isSweet ? 150 : 75,
                          height: isSweet ? 75 : 150,
                      }} />
                      </View>
                      <View style={styles.wrp}>
                  <Text style={{ color: textColor, fontSize:17 }} adjustsFontSizeToFit numberOfLines={1}>{product.title}</Text>
                  <Text style={styles.grayTxt}>US$ {product.price.toFixed(2)}</Text>
             </View>
                   </View>
                 ))
               }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    gray: {
        padding:10,
        borderRadius:10,
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    image: {
        height:150, 
        width:75
    },
    list: {
        width:"100%", 
        paddingHorizontal:10
    },
    grayTxt: {
        color:"gray", 
        fontSize:14
    },
    wrp: {
        width:"100%", 
        paddingVertical: 3, 
        justifyContent:"flex-start", 
        alignItems:"flex-start"
    },
    itm:{
        justifyContent:"flex-start", 
        alignItems:"center", 
        marginRight:10, 
        paddingBottom:12
    },
    avatar: {
        width:25, 
        height:30, 
        marginHorizontal:10
    },
    wrapper: {
        width:Dimensions.get("window").width - 70, 
        paddingHorizontal:10, 
        justifyContent:"flex-start", 
        alignItems:"flex-start", 
        paddingVertical: 10
    }
})

export default Products;
