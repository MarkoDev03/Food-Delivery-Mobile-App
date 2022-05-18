import React from 'react';
import { View } from 'react-native';
import About from '../components/restaurantDetails/About';
import MenuItem from '../components/restaurantDetails/MenuItem';
import ViewCart from '../components/restaurantDetails/ViewCart';

export const foods = [
    {
      title: "Lasagna",
      description: "With butter lettuce, tomato and sauce bechamel",
      price: "$13.50",
      image:
        "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
    },
    {
      title: "Tandoori Chicken",
      description:
        "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
      price: "$19.20",
      image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
    },
    {
      title: "Chilaquiles",
      description:
        "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
      price: "$14.50",
      image:
        "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
    },
    {
      title: "Spaghetti",
      description: "Spaghetti with meat sauce in the Instant Pot is nothing short of life-changing",
      price: "$20.00",
      image:
        "https://www.lux-review.com/wp-content/uploads/2020/03/Pasta-1.jpg",
    },
    {
      title: "Chicken Caesar Salad",
      description:
        "One can never go wrong with a chicken. Healthy option with greens and proteins!",
      price: "$21.50",
      image:
        "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
    },
    {
      title: "Butter Lettuce Lasagna ",
      description: "With butter lettuce, tomato and sauce bechamel",
      price: "$13.50",
      image:
        "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
    }, 
    {
      title: "Schezwan Noodles",
      description: "This easy recipe for spicy and tangy Schezwan noodles is completely vegan!",
      price: "$10.00",
      image:
        "https://www.vegrecipesofindia.com/wp-content/uploads/2021/02/schezwan-noodles-recipe-1-1024x1536.jpg",
    },
    {
      title: "Fettuccine Pomodoro",
      description: "This easy recipe for spicy and tangy Schezwan noodles is completely vegan!",
      price: "$20.00",
      image:
        "https://c.ndtvimg.com/0oc68rbg_fettuccine-pomodoro_625x300_30_August_18.jpg",
    },
    {
      title: "Capricciosa",
      description: "No mushrooms. Just tasty salamy and cheese stirred with ketchup",
      price: "$8.50",
      image:
        "https://www.buttalapasta.it/wp-content/uploads/2017/11/pizza-capricciosa.jpg",
    },
    {
      title: "Pasta",
      description: "Another symbol, a national icon, loved all over the world, is pasta.",
      price: "$5.80",
      image:
        "https://www.chefspencil.com/wp-content/uploads/Spaghetti-alla-carbonara.jpg.webp",
    },
    {
      title: "Sicilian pizza",
      description: "Mix of capricciosa and hot spices with ketchup and mayonnaise as spices and tomato",
      price: "$12.60",
      image:
        "https://i.guim.co.uk/img/media/4f75ad4b9aceef93107f2037ce41f9da4d9df90a/0_554_7216_4330/master/7216.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=86a0f61548972acf321c24f2b15367fd",
    },
    {
      title: "Arancini",
      description: "A must-eat Sicilian dish that is perfect to enjoy when you are out for a walk: arancini.",
      price: "$9.50",
      image:
        "https://www.chefspencil.com/wp-content/uploads/Arancini.jpg.webp",
    },
    {
      title: "Tortilla",
      description: "Hot wings mixed up with tomato in tortilla",
      price: "$3.20",
      image:
        "https://static.toiimg.com/thumb/53784736.cms?width=1200&height=900",
    },
    {
      title: "Gyros",
      description: "Originally Greek food. Pork or Chicken's meat with french fries and other deleciouses",
      price: "$5.00",
      image:
        "https://res.cloudinary.com/glovoapp/h_225,f_auto,q_auto/Stores/aqvhw1fzk7hvkphw20it",
    },
    {
      title: "Hot wings",
      description: "American food favorites you will love. Spicy chicken wings with additional spices",
      price: "$21.50",
      image:
        "https://www.2foodtrippers.com/wp-content/uploads/2021/03/American-Food-Icons-Social-IMG.jpg",
    },
    {
      title: "Chicken Burger",
      description: "Hot american burger with chicken wing, melted chees, cabage, ketchup",
      price: "$8.30",
      image:
        "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/content8274.jpg",
    },
    {
      title: "Hamburger",
      description: "Hamburger with bacon, chees and salat",
      price: "$8.30",
      image:
        "https://www.thedailymeal.com/sites/default/files/story/2020/best-burger-recipe-ever-shutterstock-recipe_1__0.jpg",
    },
    {
      title: "Fried Chees",
      description: "Fried chees with french fries and many other delecious spices",
      price: "$1.80",
      image:
        "https://dancingthroughtherain.com/wp-content/uploads/2020/02/Easy-Fried-Cheese-Bites81-720x405.jpg",
    }, 
    {
      title: "ALABAMA",
      description: "This Southern classic is especially beloved in Alabama. Try dipping these fried bites",
      price: "$8.50",
      image:
        "https://www.eatthis.com/wp-content/uploads/sites/4/2018/07/alabama-fried-green-tomato-shutterstock.jpg?resize=640,468&quality=82&strip=all",
    },
    {
      title: "French fries",
      description: "Crunchy, tasty, salty and hot french fries with ketchup as addition",
      price: "$5.00",
      image:
        "https://kirbiecravings.com/wp-content/uploads/2019/09/easy-french-fries-1-500x500.jpg",
    },
    {
      title: "Hot dog",
      description: "Sausage with mustard or ketchup in croissant",
      price: "$4.00",
      image:
        "https://www.eatthis.com/wp-content/uploads/sites/4/2021/12/hot-dogs.jpg?quality=82&strip=all",
    }, 
    {
      title: "Grilled Sandwich",
      description: "This Indian street food favorite is filled with spiced cilantro chutney",
      price: "$2.60",
      image:
        "https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-1-1152x1536.jpg",
    },
    {
      title: "Sandwich",
      description: "Four sandwiches for good breakfast with decoration",
      price: "$2.50",
      image:
        "https://www.parkgrandlondon.co.uk/blog/wp-content/uploads/2019/12/food-2.jpg",
    },
    {
      title: "Scrambled eggs",
      description: "2 scrambled eggs with dates and slice of bread",
      price: "$4.50",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1036880806.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*",
    },
    {
      title: "Cake",
      description: "Sweet cake for desert after good meal",
      price: "$4.50",
      image:
        "https://www.popsci.com/uploads/2019/03/18/GHDDTIRYTR22T6DYZG6GGWUZCQ-scaled.jpg?auto=webp",
    },
    {
      title: "Sweet tooth waffle",
      description: "Sweet tooth waffle with additional curry for better taste",
      price: "$12.50",
      image:
        "https://www.kupon.rs/upload/kuponi/10183/vafl-beograd-2.jpg",
    },
    {
      title: "Chocolate",
      description: "200 grams of chocolate from box of chocolates",
      price: "$15.50",
      image:
        "https://s2.best-wallpaper.net/wallpaper/2560x1920/1405/Sweet-food-chocolate_2560x1920.jpg",
    },
    {
      title: "American panckes",
      description: "5 American pancakes with curry of Maple syrup",
      price: "$20.00",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-210722-pancakes-04-portrait-jg-1627339799.jpg",
    },
    {
      title: "Pancakes",
      description: "5 pancakes with Nutella, banana, and crushed cookies",
      price: "$5.00",
      image:
        "https://molinocosma.com/wp-content/uploads/crepes1.jpg",
    },
    {
      title: "Fruit pancakes",
      description: "5 pancakes with Nutella, raspberry, strawberry and crushed cookies",
      price: "$8.00",
      image:
        "https://vital.rs/wp-content/uploads/2020/03/Vital-Recept-za-palacinke-Fotografija-1.jpg",
    },
    {
      title: "Banana protein dounts",
      description: "Dounts overflowed with splice colorful crumbs",
      price: "$22.00",
      image:
        "https://healthyfitnessmeals.com/wp-content/uploads/2018/06/instagram-In-Stream_Square___banana-protein-donuts-3.jpg",
    },
    {
      title: "Tiramisu",
      description: "The delightful tiramisu recipe with sponge fingers soaked in coffee",
      price: "$18.00",
      image:
        "https://i.ndtvimg.com/i/2017-09/tiramisu-the-pick-me-up-cake_625x350_81506418133.jpg",
    },
  ];


const RestaurantDetails = ({ route, navigation }) => {
    return (
        <>
        <View style={{
            flex: 1,
            backgroundColor:"#eee"
        }}>
           <About route={route} />
           <MenuItem restaurantName={route.params.name} foods={foods} hideCheckbox={false} textWidth={200} mode={route.params.mode} isShown={true} />
           <ViewCart navigation={navigation} restaurantName={route.params.name} mode={route.params.mode} />
           </View>
        </>
    )
}

export default RestaurantDetails;