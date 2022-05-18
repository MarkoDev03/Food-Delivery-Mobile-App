import React, { useState, useLayoutEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Home from './screens/Home';
import RestaurantDetails from './screens/RestaurantDetails';
import OrderCompleted from './screens/OrderCompleted';
import Browse from './screens/Browse';
import { LogBox } from 'react-native';
import Grocery from './screens/Grocery';
import Settings from './screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from './components/home/BottomTab';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from "react-native"
import AppLoading from 'expo-app-loading';
 
const RootNavigation = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const dispatch = useDispatch()

    const [themeColor, setThemeColor] = useState("#fff")
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
          async function get() {
            setLoading(true)

            dispatch({
              type: "LOADED",
              payload: {
                loaded: true
              },
            });

           try {
               const value = await AsyncStorage.getItem('@theme');
               const type = await AsyncStorage.getItem("@type");
  
               const colorScheme = Appearance.getColorScheme();
            
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

    const mode = useSelector((state) => state.themeReducer.modes.dark);

    if (!loading) {
      return <AppLoading />
    }

    function HomeNavigator() {
      return (
        <Tab.Navigator screenOptions={{headerShown:false, bottomTab:false,  tabBarStyle: { display: "none" },}}   
        tabBar={({navigation}) => <BottomTab mode={mode} navigation={navigation} />}
        initialRouteName='Home' >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Browse" component={Browse} />
        <Tab.Screen name="Grocery" component={Grocery} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
      )
    }

    LogBox.ignoreLogs(["Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.","Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.","Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got:", "Check the render method of", "Got an invalid value for 'component' prop for the screen"]);
 
    return (
        <NavigationContainer>
          <Stack.Navigator 
              screenOptions={{
                gestureEnabled: true,
                headerShown:false,
                headerMode:"none",
                mode:"modal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}  
              initialRouteName='HomeScreen' >   
             <Stack.Screen name="HomeScreen" component={HomeNavigator} options={{mode:"modal"}} />
             <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} options={{mode:"modal"}} />
             <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;