import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  TouchableNativeFeedback
} from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import LottieView from "lottie-react-native";

export default function ViewCart({ navigation, mode }) {
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isShown, setIShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const fadeIn = useRef(new Animated.Value(0)).current
  const scaleIn = useRef(new Animated.Value(0)).current

  const total = items
    .map((item) => parseFloat(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
      backgroundColor: mode === false ? "white" : "#0f0f0f",
      padding: 16,
      height: 500,
      borderWidth: 1,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },

    restaurantName: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 10,
      color:mode === false ? "black" : "white"
    },

    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      borderTopColor: "#eee",
      borderTopWidth: 1,
      paddingTop: 5,
    },

    subtotalText: {
      textAlign: "left",
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 10,
      color:mode === false ? "black" : "white"
    },
  });

  const animateSize = () => {
    Animated.timing(
      scaleIn, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start()

    setTimeout(() => {
       scaleIn.setValue(0)
    }, 305);
  }

  useEffect(() => {
    if (items.length > 0) {
      setIShown(true)
    } else {
      setTimeout(() => {
        setIShown(false)
      }, 560);
    }
  }, [items.length]);

  if (items.length > 0) {
    Animated.timing(
      fadeIn, {
        toValue:1,
        duration:280,
        useNativeDriver: true,
        easing: Easing.circle
      }
    ).start()
  } else {
    Animated.timing(
      fadeIn, {
        toValue:0,
        duration:280,
        useNativeDriver: true,
      }
    ).start()
  }

  const orderItemsFromCart = () => {
    animateSize()
    setModalVisible(false);
    setLoading(true);
    setTimeout(() => {
        navigation.navigate("OrderCompleted", {
        items: items,
        restaurantName: restaurantName,
        total: totalUSD,
        mode:mode
    });
    setLoading(false);
    }, 2500);
  };

  const checkoutModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 300, height: 300 }}
          >
            {items.map((item, index) => (
              <OrderItem item={item} key={index} mode={mode} />
            ))}
          </ScrollView>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text style={{fontWeight:"bold", fontSize:20,color:mode === false ? "black" : "white"}}>${total}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems:"center"
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "red",
                borderRadius: 30,
                alignItems: "center",
                padding: 13,
                width: 300,
                position: "relative",
                transform: [
                  { scale: scaleIn.interpolate({
                    inputRange: [0, .5, 1],
                    outputRange: [1, 1.5, 1]
                  }) }
                ]
              }}
              onPress={() => {
               orderItemsFromCart()
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                Checkout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 5,
                backgroundColor: "red",
                borderRadius: 30,
                alignItems: "center",
                padding: 13,
                width: 300,
                position: "relative",
                transform: [
                  { scale: scaleIn.interpolate({
                    inputRange: [0, .5, 1],
                    outputRange: [1, 1.5, 1]
                  }) }
                ]
              }}
              onPress={() => {
                setModalVisible(false)
              }}
            >
              <Text
                style={{
                  color:"white",
                  fontSize: 20,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 99999,
          }}
        >
          <LottieView
            style={{
              height: 200,
            }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
        style={{
          margin: 0,
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        {checkoutModalContent()}
      </Modal>
      {isShown ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 30,
            zIndex: 999,
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              opacity: fadeIn,
              padding:1,
              
            }}
          >
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#292929', false, 100)}
              onPress={() =>{ setModalVisible(true)}}
            >
              <Animated.View style={{
                alignItems: "center",
                backgroundColor: mode === false ? "black" : "red",
                borderRadius: 30,
                width: 285,
                padding: 15,
                flexDirection: "row",
                justifyContent: "flex-end",
                zIndex: 999,
  
                
              }}
               onStartShouldSetResponder={animateSize}
              >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  marginRight: 30,
                }}
              >
                VIEW CART
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                ${totalUSD}
              </Text>
              </Animated.View>
            </TouchableNativeFeedback>
          </Animated.View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
