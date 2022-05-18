import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HeaderTab = (props) => {
    return (
        <View style={styles.header}>
           <HeaderButton text="Delivery" backColor="black" textColor="white" mode={props.mode} setActiveTab={props.setActiveTabHeader} activeTab={props.activeTabHeader}></HeaderButton>
           <HeaderButton text="Pick up" backColor="white" textColor="black"  mode={props.mode} setActiveTab={props.setActiveTabHeader} activeTab={props.activeTabHeader}></HeaderButton>
           <HeaderButton text="Dine-In" backColor="white" textColor="black"  mode={props.mode} setActiveTab={props.setActiveTabHeader} activeTab={props.activeTabHeader}></HeaderButton>
        </View>
    )
}

const HeaderButton = (props) => (
    <View>
        <TouchableOpacity style={[styles.tab, {backgroundColor:props.mode === false ? props.activeTab === props.text ? "black" : "transparent" : props.activeTab === props.text ? "#262626" : "transparent"}]} onPress={() => props.setActiveTab(props.text)}>
            <Text  style={{color: props.mode === false ? props.activeTab === props.text ? "white" : "black" : props.activeTab === props.text ? "white" : "white", fontSize:15, fontWeight:"900"}}>{props.text}</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        paddingTop:11,
    },
    tab: {
        paddingVertical:6, 
        paddingHorizontal:16, 
        borderRadius:30, 
    }
})

export default HeaderTab;