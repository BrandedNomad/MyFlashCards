/**
 * @overview Represents individual list item in the list of decks on the Home view.
 */

//import
import React from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import {DARK_BLUE, DARK_PINK, DARK_PURPLE, LIGHT_BLUE, LIGHT_PURPLE, PRIMARY_PURPLE, WHITE} from "../utils/colors";

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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{number + (number > 1 ? " Cards" : " Card")}</Text>
        </TouchableOpacity>
    )
}

//styles
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:350,
        padding:10,
        borderWidth:1,
        borderRadius:10,
        borderColor:PRIMARY_PURPLE,
        flexDirection:'column',
        justifyContent:"center",
        alignItems:"center",
        margin:5,
        shadowRadius:3,
        shadowOpacity:0.8,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
            width:0,
            height:3
        },
        backgroundColor:PRIMARY_PURPLE,
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