import React from 'react';
import {View,Text,FlatList, StyleSheet} from 'react-native'

import {decks} from "../utils/_DATA";
import DeckListItem from "./DeckListItem"


function Home(){

    if(Object.keys(decks).length === 0 || Object.keys(decks) === undefined){
        return (
            <View style={styles.noDeck}>
                <Text>You Dont have any decks yet!</Text>
            </View>
        )
    }

    const decksKeys = Object.keys(decks)
    const decksList = []
    decksKeys.forEach((item)=>{
        decksList.push(decks[item])
    })




    return (
        <View style={styles.container}>
            <FlatList

                data={decksList}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={(item)=>{
                    const title = item.item.title;
                    const number = item.item.cards.length + ""
                    return (
                        <DeckListItem number={number} title={title}/>
                    )
                }}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    noDeck:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Home