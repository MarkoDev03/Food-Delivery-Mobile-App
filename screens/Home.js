import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Categories from "../components/home/Categories";
import HeaderTab from "../components/home/HeaderTab";
import RestaurantItem from "../components/home/RestaurantItem";
import SearchBar from "../components/home/SearchBar";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import OrderAgain from "../components/home/OrderAgain";
import Banner from "../components/home/Banner";
import Kitchens from "../components/home/Kitchens";
import Products from "../components/home/Products";

const Home = ({ navigation }) =>  {

    const [city, setCity] = React.useState("Los Angeles");
    const [activeTabHeader, setActiveTabHeader] = React.useState("Delivery");

    const mode = useSelector((state) => state.themeReducer.modes.dark);

    const drinks = [
      {title:"Next Joy", image: require("../assets/images/sok1.png"), price: 2.50},
      {title:"7Up", image: require("../assets/images/sok2.png"), price: 2.00},
      {title:"Fanta Sokata", image: require("../assets/images/sok3.png"), price: 2.30},
      {title:"Mirinda", image: require("../assets/images/sok4.png"), price: 1.75},
      {title:"Ice Tea", image: require("../assets/images/sok5.png"), price: 2.20},
      {title:"Coca-Cola", image: require("../assets/images/sok6.png"), price: 2.10},
      {title:"Fanta Orange", image: require("../assets/images/sok7.png"), price: 2.50},
      {title:"Sprite", image: require("../assets/images/sok8.png"), price: 2.00},
      {title:"Na eks", image: require("../assets/images/sok9.png"), price: 1.65},
      {title:"Fit Pro", image: require("../assets/images/sok10.webp"), price: 3.25},
    ]
  
    const snacks = [
      {title:"Lay's", image: require("../assets/images/snack1.png"), price: 1.50},
      {title:"Cheez It", image: require("../assets/images/snack2.png"), price: 2.00},
      {title:"Puzzles", image: require("../assets/images/snack3.png"), price: 2.15},
      {title:"Halar", image: require("../assets/images/snack4.png"), price: 1.75},
      {title:"Sumo Ring", image: require("../assets/images/snack5.png"), price: 2.75},
      {title:"Bingo", image: require("../assets/images/snack6.png"), price: 1.30},
      {title:"Ruffles", image: require("../assets/images/snack7.png"), price: 2.10},
      {title:"Pop Corners", image: require("../assets/images/snack8.png"), price: 2.10},
    ]
  
    const sweets = [
      {title:"Snickers", image: require("../assets/images/sweet1.png"), price: 0.50},
      {title:"Mars", image: require("../assets/images/sweet2.png"), price: 0.50},
      {title:"Twix", image: require("../assets/images/sweet3.png"), price: 0.70},
      {title:"Milka", image: require("../assets/images/sweet4.png"), price: 1.25},
      {title:"Milka", image: require("../assets/images/sweet4.png"), price: 1.25},
      {title:"Najlepse zelje", image: require("../assets/images/sweet5.png"), price: 1.25},
      {title:"Schogetten", image: require("../assets/images/sweet6.png"), price: 1.25},
    ]
    
    let textColor = mode == true ? "#fff" : "#000"

    const covers = [require("../assets/images/banner1.jpg"), require("../assets/images/banner2.jpg"), require("../assets/images/banner3.jpg"), require("../assets/images/banner_4.jpg"),  require("../assets/images/banner5.jpg")]
    let cover = covers[Math.floor(Math.random() * covers.length)]

    const items = [
        {image: require("../assets/images/shopping-bag.png"),text: "Pick-up",},
        {image: require("../assets/images/soft-drink.png"),text: "Soft Drinks",},
        {image: require("../assets/images/bread.png"),text: "Bakery Items",},
        {image: require("../assets/images/fast-food.png"),text: "Fast Foods",},
        {image: require("../assets/images/deals.png"),text: "Deals",},
        {image: require("../assets/images/coffee.png"),text: "Coffee & Tea",},
        {image: require("../assets/images/desserts.png"),text: "Desserts",},
        {image: require("../assets/images/tortila.png"),text: "Tortilla",},
        {image: require("../assets/images/omlette.png"),text: "Omelette",},
        {image: require("../assets/images/salads.png"),text: "Salads",},
        {image: require("../assets/images/dounte_ccexpress.png"),text: "Sweets",},
        {image: require("../assets/images/pizza.png"),text: "Pizza",},
      ];

      const Header = () => {
        return (
            <View style={{backgroundColor:mode === false ? "rgba(255,255,255,0.93)" : "rgba(0,0,0,0.9)", padding:15, zIndex:99, }}>
               <HeaderTab setActiveTabHeader={setActiveTabHeader} activeTabHeader={activeTabHeader} mode={mode} />
                <SearchBar cityHandler={setCity} mode={mode}  />
            </View>
        )
      }
    
    return (
        <>
        <StatusBar style={mode == true ? "light" : "dark"} />
        <SafeAreaView style={{
            flex: 1,
            backgroundColor:mode === false ? "#eee" : "#444"
        }}
        >
              <Header/>
            <ScrollView  scrollsToTop={false} showsVerticalScrollIndicator={false} style={{backgroundColor:mode === false ? "white" : "black",  marginTop:-210}}>
              <View style={{height:210,width:.1}}></View>
              <Banner cover={cover} />
              <Categories mode={mode} items={items} />
              <Kitchens mode={mode} />
              <OrderAgain mode={mode} />
              <RestaurantItem navigation={navigation} mode={mode} city={city} />
              <Products key={2 + "product"} products={snacks} headline="Salty snacks" description="Snacks you'll like" mode={mode} textColor={textColor} />
            <Products key={3+ "product"} isSweet={true} products={sweets} headline="Sweet treats" description="Sweets you'll like" mode={mode} textColor={textColor} />
            <Products key={1+ "product"} products={drinks} headline="Refreshing drinks" description="Drinks you'll like" mode={mode} textColor={textColor} />
            </ScrollView>
        
        </SafeAreaView>
        </>
    )
}

export default Home;
