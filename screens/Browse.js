import { SafeAreaView, StatusBar, View, ScrollView, Text, TouchableNativeFeedback } from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import SearchBar from '../components/home/SearchBar';
import Restaurants from "../components/browse/Restaurants";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons"

const YELP_API_KEY = "yd3fsM9A9Ta35sAlWbKrrM3u6QtBoGIbHk1FvLdl5kc70EjuyB3iSSSrI1isUa0DzhJTSzNYIu3FNqr-ij1U6RBLGqec-kpy9LeOkRJYeYj9BoKtQtrmVc_362HgYXYx";

export default function Browse({ navigation, route }) {
 
    const [restaurants, setRestaurants] = React.useState([]);
    const [notFound, setNotFound] = React.useState(false);
    const [history, setHistory] = React.useState([]);
    const [city, setCity] = React.useState("xkw1234");

    const mode = useSelector((state) => state.themeReducer.modes.dark);
   
    const dispatch = useDispatch();

    const addToHistory = async (items) => {
        try {
            await AsyncStorage.setItem("@history", JSON.stringify(items))
            console.log("added")
        } catch(error) {
            console.log(error)
        }
    }

    const loadHistory = async () => {
        const getHistory = await AsyncStorage.getItem("@history")
        if (getHistory != null) {
            setHistory(JSON.parse(getHistory))
        }
    }

    const clearHistory = async () => {
        setHistory([])
        await AsyncStorage.removeItem("@history")
    }

    const getRestaurantsFromYelp = async () => {
        if (city.trim().length == 0 && city != "xkw1234") { 
            return;
        }
        const YELP_URL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        };

        return await fetch(YELP_URL, apiOptions).then((res) => res.json()).then((data) => {
            if (data.businesses) {
                setNotFound(false)
                let items = history;     
                items.push(city)
                let getItems = [...new Set(items)]
                addToHistory(getItems)
                setRestaurants(data.businesses);
            } else {
                console.log(city)
                if (city.trim().length > 0 && city != "xkw1234") {
                    console.log(true)
                    setNotFound(true)
                }
                setRestaurants([])
            }
        });
    };

    useEffect(() => {
        loadHistory()
        getRestaurantsFromYelp();
    }, [city]);

    useLayoutEffect(() => {
        loadHistory()
    }, [history])

    useEffect(() => {
        loadHistory
    }, []);

    useLayoutEffect(() => {
        async function get() {
         try {
             const value = await AsyncStorage.getItem('@theme');
             const type = await AsyncStorage.getItem('@type');
          
             if(value !== null && type !== null) {  

                if (type === "system") {
                 dispatch({
                     type: "CHANGE_COLOR_TEHEM",
                     payload: {
                        mode:colorScheme === "light" ? false : true,
                        type:type
                     },
                   });
                } else {
                 dispatch({
                     type: "CHANGE_COLOR_TEHEM",
                     payload: {
                        mode:value === "light" ? false : true,
                        type:type
                     },
                   });
                }
          } else {
              dispatch({
                  type: "CHANGE_COLOR_TEHEM",
                  payload: {
                     mode:true,
                     type:"manual"
                  },
                });
          }
           } catch(e) {
             // error reading value
           }
        }
        get()
     }, []);

  return (
      <>
     <SafeAreaView style={{
        flex: 1,
        backgroundColor:mode === false ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    }}>
           <ScrollView  stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} style={{backgroundColor:mode === false ? "white" : "black"}}>
        <View style={{backgroundColor:mode === false ? "rgba(255,255,255,0.93)" : "rgba(0,0,0,0.9)", padding:15, paddingTop:StatusBar.currentHeight}}>
           <SearchBar cityHandler={setCity} mode={mode} />
        </View>
             {
                  city === "xkw1234" && (
                     <View style={{width:"100%", padding: 10, justifyContent:"flex-start", alignItems:"flex-start",}}>
                          <View style={{width:"100%", justifyContent:"space-between", alignItems:"center", flexDirection:"row"}}>
                               <Text style={{fontSize: 18, fontWeight:"700", color: mode == true ? "#fff" : "#000"}}>Search history</Text>
                               <Text style={{fontSize: 16, color:"red"}} onPress={clearHistory}>Clear</Text>
                          </View>
                          <View style={{width:"100%", marginTop:3,justifyContent:"flex-start", alignItems:"flex-start"}}>
                             {
                                 history.map((history, index) => (
                                     <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(mode == true ? "#444" : "#eee")} onPress={() => {
                                        setCity(history)
                                     }}>
                                    <View style={{width:"100%", justifyContent:"flex-start", alignItems:"center", flexDirection:"row", padding:5, paddingVertical: 13}} key={index}>
                                          <Ionicons name="location-sharp" size={20} style={{color:"red"}} />
                                        <Text style={{fontSize: 18, color: mode == true ? "#fff" : "#000", marginLeft: 3}}>{history.charAt(0).toUpperCase()}{history.substring( 1)}</Text>  
                                    </View>
                                    </TouchableNativeFeedback>
                                 ))
                             }
                          </View>
                     </View>
                 )
             }
            {
                city === "xkw1234" ? (
                    <View></View>
                ) : (
                    <Restaurants notFound={notFound} restaurants={restaurants} navigation={navigation} city={city} mode={mode} />
                )
            }
           </ScrollView>    
     </SafeAreaView>
     </>
  );
}
