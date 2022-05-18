import React from 'react';
import {View, StyleSheet} from 'react-native';
import Products from './Products';
import Lunch from './Lunch';

const MoreData = ({ mode, restaurants, sweets, localRestaurants, snacks, navigation, getPopular, textColor, drinks}) => {
    return (
      <>
        <Lunch key={1} mode={mode} restaurants={restaurants} navigation={navigation} description="Most popular for lunch 🍔 🍟 🍕 🌮" title="Lunch Classics" visibility={true} color="rgb(63, 192, 96)" />
        <Lunch key={2} mode={mode} restaurants={restaurants.slice(0, 5)} navigation={navigation} description="Bring happiness to your home" title="Familiy favourites" visibility={true} color="#ffc043" />
       <Lunch key={3} mode={mode} restaurants={localRestaurants} navigation={navigation} description="Popular near you 🥪 🍗 🍝 🍧" title="Local Favorites" visibility={true} color="#ff1100" /> 
        {/* <Lunch key={4} mode={mode} animated={true} animation={require("../../assets/animations/award.json")} restaurants={getPopular} navigation={navigation} description="Top rating and consistently great service" title="Excellent service" visibility={false} color="#ff1100" /> */}
        <Lunch key={5}  mode={mode} restaurants={restaurants.slice(3, 9)} navigation={navigation} starred={true} description="Try spots from further away" title="More to love" visibility={true} color="rgb(63, 192, 96)" />
        <Products key={1+ "product"} products={drinks} headline="Refreshing drinks" description="Drinks you'll like" mode={mode} textColor={textColor} />
        <Products key={2 + "product"} products={snacks} headline="Salty snacks" description="Snacks you'll like" mode={mode} textColor={textColor} />
        <Products key={3+ "product"} isSweet={true} products={sweets} headline="Sweet treats" description="Sweets you'll like" mode={mode} textColor={textColor} />
        </>
    );
}

const styles = StyleSheet.create({})

export default MoreData;
