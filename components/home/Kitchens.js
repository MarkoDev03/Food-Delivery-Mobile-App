import React from 'react';
import { View, StyleSheet, Text, Animated, Easing} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Kitchens = ({ mode }) => {

    const kitchens = ["🇺🇸 USA", "🇮🇹 Italy","🇪🇸 Spain","🇷🇸 Serbia", "🇬🇧 UK", "🇯🇵 Japan", "🇵🇹 Portugal", "🇧🇷 Brazil"]

    const Kitchen = ({kitchen, index}) => {
         let moveRight = React.useRef(new Animated.Value(0)).current

                  React.useEffect(() => {
                    let delay =  (150 * index)
                      Animated.timing(
                        moveRight , {
                          toValue: 1,
                          duration:280,
                          delay: delay,            
                          useNativeDriver: true,
                          easing: Easing.linear
                        }
                      ).start()     
                  }, [index]);

                 return (
                 <Animated.View style={[styles.item, { backgroundColor: mode === false ? "#dbd9d9" : "#444",
                 transform: [
                    { translateX: moveRight.interpolate({
                       inputRange: [0, 1],
                       outputRange: [800, 0]
                    }) }
                  ]}]} key={index}>
                       <Text style={{color:mode == true ? "white" : "black"}}>{kitchen}</Text>
                 </Animated.View>
            )
    }

    return (
        <View style={[styles.wrapper, { borderBottomColor:mode === false ? "#eee" : "#262626", backgroundColor: mode == true ? "#262626" : "#eee"}]}>
            <View style={[styles.item, { backgroundColor: mode === false ? "#dbd9d9" : "#444", marginVertical:5}]}>
                <Text style={{color:mode == true ? "white" : "black"}}>🧑‍🍳 Cuisines</Text>
            </View>
            <ScrollView bounces={true} style={[ styles.scroll,{backgroundColor: mode == true ? "black" : "white"}]} horizontal showsHorizontalScrollIndicator={false}>
             {
                kitchens.map((kitchen, index) => (<Kitchen kitchen={kitchen} index={index} key={index} />))
              }
             <View style={{width:10, height:1}}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width:"100%",
        padding:5,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderBottomWidth:1,
        paddingVertical:0,
        paddingRight:0
    },
    item: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 25,
        justifyContent:"center",
        alignItems:"center",
        marginRight: 5
    },
    scroll: {
      paddingLeft:7,
      paddingVertical:5, 
      paddingRight:1
    }
})

export default Kitchens;
