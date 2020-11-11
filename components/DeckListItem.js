/**
 * @overview Represents individual list item in the list of decks on the Home view.
 */

//import
import React from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";

import {
    PRIMARY_BLUE_CONTRAST,
    PRIMARY_PURPLE_CONTRAST,
    PRIMARY_PINK_CONTRAST,
    WHITE, PRIMARY_GRAY_CONTRAST
} from "../utils/colors";

/**
 * @function
 * @description Represents individual list item in the list of decks on the Home view.
 * @param {Object} deck - the individual deck
 * @param {Object} navigation - contains the navigate method used to navigate
 * @returns {JSX.Element}
 * @constructor
 */
function DeckListItem({deck,navigation}){

    //initializing variables
    const title = deck.title;
    const number = deck.cards.length !== undefined ? deck.cards.length + "" : "0"


    return (
        <TouchableOpacity
            style={styles.container}
            onPress={()=>{
                navigation.navigate('Deck',{deck})
            }}
        >
            <LinearGradient
                colors={[PRIMARY_PURPLE_CONTRAST,PRIMARY_BLUE_CONTRAST]}
                style={styles.gradient}
                start={{x:0.3,y:0.1}}


            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{number + (number > 1 ? " Cards" : " Card")}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

//styles
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:350,
        borderWidth:1,
        borderRadius:10,
        borderColor:PRIMARY_BLUE_CONTRAST,
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"center",
        margin:5,
        shadowRadius:10,
        shadowOpacity:0.8,
        shadowColor:PRIMARY_GRAY_CONTRAST,
        shadowOffset:{
            width:5,
            height:10
        },
    },
    gradient:{
        flex:1,
        width:350,
        padding:10,
        borderRadius:10,
        borderColor:PRIMARY_BLUE_CONTRAST,
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"center",

    },
    title:{
        fontSize:20,
        color:WHITE
    },
    body:{
        color:WHITE
    }
})

//exporting component
export default DeckListItem;