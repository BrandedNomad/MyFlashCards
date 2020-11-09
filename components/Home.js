import React,{useEffect,useState} from 'react';
import {View,Text,FlatList, StyleSheet,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {setLocalNotification} from "../utils/notifications";


import DeckListItem from "./DeckListItem"
import {handleInitialData} from "../actions/decksAction";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import {PRIMARY_PURPLE, SECONDARY_PINK} from "../utils/colors";



function Home(props){


    const [ready,setReady] = useState(false)

    useEffect(()=>{
        setReady(false)
        props.dispatch(handleInitialData()).then(setReady(true))

    },[])

    const decks = props.decks
    const cardsKeysList =  Object.keys(decks)

    console.log(cardsKeysList)

    if(cardsKeysList.length === 0){
        return (
            <View style={styles.noDeck}>
                <Text>You Dont have any decks yet!</Text>
            </View>
        )
    }

    if(ready === false){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large"  color={PRIMARY_PURPLE}/>
            </View>
        )
    }

    const decksKeys = Object.keys(props.decks)
    const decksList = []
    decksKeys.forEach((item)=>{
        decksList.push(props.decks[item])
    })






    return (
        <View style={styles.container}>
            <FlatList

                data={decksList}
                keyExtractor={(item, index) => 'key'+index}
                renderItem={(item)=>{
                    const deck = item.item
                    return (
                        <DeckListItem deck={deck} navigation={props.navigation}/>
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
    },
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

function mapStateToProps(state){
    return{
        decks:state
    }
}

export default connect(mapStateToProps)(Home)