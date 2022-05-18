import React from "react";
import { View, Text, Image, ScrollView, Dimensions  } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

const MenuItem = ({ restaurantName, foods, hideCheckbox, textWidth, isShown }) => {
  const mode = useSelector((state) => state.themeReducer.modes.dark);
 
  const [width, setWidth] = React.useState(0)
  const [width2, setWidth2] = React.useState(0)
  const [width3, setWidth3] = React.useState(0)
   const dispatch = useDispatch();

   const selectItem = (item, checkboxValue) =>
   dispatch({
     type: "ADD_TO_CART",
     payload: {
       ...item,
       restaurantName: restaurantName,
       checkboxValue: checkboxValue,
     },
   });

   const cartItems = useSelector((state) => state.cartReducer.selectedItems.items);
  let get = textWidth
   React.useEffect(() => {
    get = width == 0 ? textWidth : (width - width2 - width3 - 20 )
   }, [width, width2, width3])

   const isFoodInCart = (food, cartItems) => {
    return Boolean(cartItems.find((item) => item.title == food.title));
   }

    return (
      <ScrollView style={{position:"relative",    backgroundColor:mode === false ? "white" : "black",}} showsVerticalScrollIndicator={false}  >
          {
              foods.map((food, index) => (
               <View key={index}>          
                <View style={{
                   flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center",
                    padding:10,
                    paddingHorizontal:10,
                    borderBottomColor:mode === false ? "#eee" : "#444",
                    borderBottomWidth:1,
                    backgroundColor:mode === false ? "white" : "black",
            }}
            onLayout={(e) => {
              setWidth(e.nativeEvent.layout.width)
            }}
            >
              {
                hideCheckbox ? (<></>) : (
                   <BouncyCheckbox 
                   onLayout={(e) => {
                    setWidth2(  e.nativeEvent.layout.width + 5)
                  }}
                  
                  fillColor="green"
                  style={{
                    width:"10%"
                  }}
                  onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                  isChecked={isFoodInCart(food, cartItems)}
               />
                )
              }
              
                <View style={{
                    width:hideCheckbox == true ? "65%" : "55%",
                    justifyContent:"space-evenly",
                }}>
                    <Text style={{
                        fontSize:18,
                        fontWeight:"bold",
                          color:mode === false ? "black" : "white"
                    }} numberOfLines={1} adjustsFontSizeToFit >{food.title}</Text>
                    <Text style={{marginRight:10,
                color:mode === false ? "black" : "gray"}} numberOfLines={3} adjustsFontSizeToFit>{food.description}</Text>
                    <Text style={{
                        fontWeight:"700",
                        color:mode === false ? "black" : "white"
                    }}>{food.price}</Text>
                </View>
                    <Image source={{uri: food.image}} style={{
                        width:hideCheckbox == true ? "35%" : "30%",
                        height:hideCheckbox == true ? ((Dimensions.get("window").width / 100) * 35) : ((Dimensions.get("window").width / 100) * 30) ,
                        borderRadius:10,
                        marginRight:5
                    }}
                    onLayout={(e) => {
                      setWidth3(e.nativeEvent.layout.width + 20)
                    }}
                    />
                </View>
            </View>
              ))
          }
          {cartItems.length > 0 &&  isShown == true ? (
          <View style={{height:100, width:1}}></View>
          ):(<></>)}
      </ScrollView>
    )
}



export default MenuItem;