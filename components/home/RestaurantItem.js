import React, { useLayoutEffect, useRef } from "react";
import {View, Image, Dimensions, Text, StyleSheet} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import MostPopular from "./MostPopular";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Lunch from "./Lunch";
import Restaurant from "./Restaurant";
import RBSheet from "react-native-raw-bottom-sheet";
 
const RestaurantItem = ({ navigation, ...props }) => {
  const YELP_API_KEY =
    "yd3fsM9A9Ta35sAlWbKrrM3u6QtBoGIbHk1FvLdl5kc70EjuyB3iSSSrI1isUa0DzhJTSzNYIu3FNqr-ij1U6RBLGqec-kpy9LeOkRJYeYj9BoKtQtrmVc_362HgYXYx";

  let [restaurants, setRestaurants] = React.useState(localRestaurants);
  const [sortType, setSortType] = React.useState("");
  const refRBSheet = useRef();
  let [openModal, setOpenModal] = React.useState(false);

  const getRestaurantsFromYelp = async () => {
    const YELP_URL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${props.city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return await fetch(YELP_URL, apiOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.businesses) {
          setRestaurants(data.businesses);
        } else {
          setRestaurants([]);
        }
      })
      .catch((error) => {
        setRestaurants([]);
      });
  };

  useLayoutEffect(() => {
    getRestaurantsFromYelp();
  }, [props.city]);

  if (sortType == "reviewsascending") {
    restaurants = restaurants.sort((a, b) => {
      return a.review_count > b.review_count;
    });
  } else if (sortType == "reviewsdescending") {
    restaurants = restaurants.sort((a, b) => {
      return a.review_count < b.review_count;
    });
  }

  if (sortType == "ratingascending") {
    restaurants = restaurants.sort((a, b) => {
      return a.rating > b.rating;
    });
  } else if (sortType == "ratingdescending") {
    restaurants = restaurants.sort((a, b) => {
      return a.rating < b.rating;
    });
  }

  let textColor = props.mode == true ? "#fff" : "#000"
  let borderColor =  props.mode == true ? "#000" : "#fff" 


  const Sortbtn = ({ method }) => {
    return (
      <View style={{width:"100%",  paddingVertical:10,  justifyContent:"space-between", alignItems:"center", flexDirection:"row"}} >
       <Text style={[styles.sort, {color: textColor}]}>{method}</Text>
       <BouncyCheckbox  fillColor="green" style={{width:"10%",}}   
            onPress={() => {
              setSortType(method.toLowerCase().replace(" ", ""))
             refRBSheet.current.close()
            }}
            isChecked={method.toLowerCase().replace(" ", "") == sortType ? true : false}
         />
    </View>
    )
  }

  const ModalContent = () => {
    return (
      <View style={{flex:1,justifyContent:"flex-end",  backgroundColor: "rgba(0,0,0,0.7)"}}
      onMoveShouldSetResponder={() => setOpenModal(false)}
   >
   <View style={{
       backgroundColor: props.mode == true ? "#262626" : "#fff",
       borderTopLeftRadius:30,
       borderTopRightRadius: 30,
       paddingHorizontal:10,
       padding:10,
   }}>
   <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
   <Text style={{fontSize:25, color: textColor, fontWeight:"bold", marginTop: 5}}>Sort by</Text>
   <MaterialCommunityIcons name="close" color="gray" size={40}  onPress={() => refRBSheet.current.close()}/>
   </View>
  <View  style={{width:"100%", justifyContent:"flex-start", alignItems:"flex-start", marginTop:5, borderTopColor:"#444", borderTopWidth:1.2}}> 
       <Sortbtn method="Reviews Ascending" key={0 + "sort"} />
       <Sortbtn method="Reviews Descending" key={1 + "sort"} />
       <Sortbtn method="Rating Ascending" key={2 + "sort"} />
       <Sortbtn method="Rating Descending" key={3 + "sort"} />
     
  </View>
   </View>
   </View>
    )
  }

   let uris = restaurants.length > 3 ? [restaurants[0].image_url ? restaurants[0].image_url  : localRestaurants[0].image_url, restaurants[1].image_url ? restaurants[1].image_url  : localRestaurants[1].image_url, restaurants[2].image_url ? restaurants[2].image_url  : localRestaurants[2].image_url, restaurants[3].image_url ? restaurants[3].image_url  : localRestaurants[3].image_url, restaurants[4].image_url ? restaurants[4].image_url  : localRestaurants[4].image_url] : []

  return (
    <React.Fragment>
       <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{     
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.3)",
            flex:1,

          },  
          container: {
            backgroundColor: props.mode == true ? "#262626" : "#fff",
            borderTopLeftRadius:30,
            borderTopRightRadius: 30,
            paddingHorizontal:10,
            padding:10,
          }
        }}
      >
        

   <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
   <Text style={{fontSize:25, color: textColor, fontWeight:"bold", marginTop: 5}}>Sort by</Text>
   <MaterialCommunityIcons name="close" color="gray" size={40}  onPress={() => refRBSheet.current.close()}/>
   </View>
  <View  style={{width:"100%", justifyContent:"flex-start", alignItems:"flex-start", marginTop:5, borderTopColor:"#444", borderTopWidth:1.2}}> 
       <Sortbtn method="Reviews Ascending" key={0 + "sort"} />
       <Sortbtn method="Reviews Descending" key={1 + "sort"} />
       <Sortbtn method="Rating Ascending" key={2 + "sort"} />
       <Sortbtn method="Rating Descending" key={3 + "sort"} />
     
  </View>
  
      </RBSheet>
     {
       restaurants.length > 0 && (
        <MostPopular mode={props.mode} restaurants={restaurants} city={props.city} navigation={navigation} localRestaurants={localRestaurants} />
       )
     }

      <View style={[styles.content, {backgroundColor: borderColor}]}>
         <View style={styles.container}>
         <View style={styles.wrp}>
         <Text style={[styles.name, {color: textColor}]}>Restaurants</Text>
          {
            restaurants.length > 3 && (
              <View style={{justifyContent:"flex-start", alignItems:"flex-start", flexDirection:"row"}}>
                 <Image source={{uri: uris[0],}} style={[styles.image, { borderColor: borderColor }]}/>
                 <Image source={{uri: uris[1]}} style={[styles.image, { borderColor: borderColor, zIndex: 5 }]}/>
                 <Image source={{uri: uris[2]}} style={[styles.image, { borderColor: borderColor, zIndex: 3 }]}/>
                 <Image source={{uri: uris[3]}} style={[styles.image, { borderColor: borderColor, zIndex: 2 }]}/>
                 <Image source={{uri: uris[4]}} style={[styles.image, { borderColor: borderColor, zIndex: 1 }]}/>
          </View>
            )
          }
         </View>
             <Text style={styles.gray}>{restaurants.length} restaurants found in {props.city}</Text>
         </View>
          <MaterialCommunityIcons name="sort-descending" size={35} color={textColor} onPress={() => refRBSheet.current.open()}/>
      </View>
       {
       restaurants.length > 0 ? (
         <>
         {restaurants.map((restaurant, index) => (
               <Restaurant restaurant={restaurant} index={index} key={index} mode={props.mode} navigation={navigation}  />
           ))}

            <Lunch key={1} mode={props.mode} restaurants={restaurants} navigation={navigation} description="Most popular for lunch 🍔 🍟 🍕 🌮" title="Lunch Classics" visibility={true} color="rgb(63, 192, 96)" />
            {/* <Lunch key={2} mode={props.mode} restaurants={restaurants.slice(0, 5)} navigation={navigation} description="Bring happiness to your home" title="Familiy favourites" visibility={true} color="#ffc043" /> */}
            <Lunch key={3} mode={props.mode} restaurants={localRestaurants} navigation={navigation} description="Popular near you 🥪 🍗 🍝 🍧" title="Local Favorites" visibility={true} color="#ff1100" />
            <Lunch key={5}  mode={props.mode} restaurants={restaurants} navigation={navigation} starred={true} description="Try spots from further away" title="More to love" visibility={true} color="rgb(63, 192, 96)" />
           </>
        ) : (
          <View style={[styles.lottie, {backgroundColor:props.mode === false ? "white" : "black"}]}>
          <LottieView style={styles.animation} source={props.mode === false ? require("../../assets/animations/notfound.json") : require("../../assets/animations/notfound-dark.json")} autoPlay speed={1.5} loop={true}/>
        </View>
        )
       } 

     
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
   image: {
    width:28,
    height:28,
    borderRadius:50,
    marginLeft: 5,
    borderWidth:1,
    marginRight:-15,
    zIndex:9
   },
   lottie: {
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    marginVertical:10,
   },
   animation: {
    height: 300,
     alignSelf: "center",
      marginBottom: 30
   },
   wrp: {
    justifyContent:"flex-start",
     alignItems:"flex-start", 
     flexDirection:"row"
   },
   content: {
    width:"100%",
     paddingHorizontal: 10,
     flexDirection:"row",
     justifyContent:"flex-start", 
     alignItems:"center", 
     paddingTop:10 
   },
   container: {
    width:"90%", 
    justifyContent:"flex-start", 
    alignItems:"flex-start"
   },
   gray: {
    color:"gray", 
    fontSize:15
   },
   sort: {
    width:"90%", 
    maxWidth:"90%", 
    fontSize:20, 
   },
   name: {
    fontWeight:"bold", 
    fontSize:20
   }
})

export const localRestaurants = [
  {
    name: "Irish's Food",
    image_url:
      "https://media.istockphoto.com/photos/food-backgrounds-table-filled-with-large-variety-of-food-picture-id1155240408?k=20&m=1155240408&s=612x612&w=0&h=Zvr3TwVQ-wlfBnvGrgJCtv-_P_LUcIK301rCygnirbk=",
    categories: ["Irish", "Bar"],
    price: "$$",
    reviews: 500,
    rating:  5.0,
    location: {
      address1:"No address"
    },
    review_count:150
  },
  {
    name: "Beachside Bar",
    image_url:
      "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
    location: {
      address1:"No address"
    },
    review_count:250
  },
  {
    name: "Benihana",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,location: {
      address1:"No address"
    },
    review_count:300
  },
  {
    name: "India's Grill",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,location: {
      address1:"No address"
    },
    review_count:285
  },
  {
    name: "Fresh Italian Bar",
    image_url:
      "https://heytripster.com/wp-content/uploads/2020/05/cecconis-beyoglu-min.jpg",
    categories: ["Italian", "Bar"],
    price: "$$",
    reviews: 725,
    rating: 4.0,location: {
      address1:"No address"
    },
    review_count:487
  },
];

export default RestaurantItem;