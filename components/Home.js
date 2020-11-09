/**
 * @overview Represents the Home view which contains a list of decks
 */
import React,{useEffect,useState} from 'react';
import {View,Text,FlatList, StyleSheet,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'


import DeckListItem from "./DeckListItem"
import {handleInitialData} from "../actions/decksAction";
import {PRIMARY_PURPLE} from "../utils/colors";


/**
 * @function
 * @description Represents the Home view which contains a list of decks
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
function Home(props){

    //initializing variables
    const [ready,setReady] = useState(false)

    //Hydrates the Redux store from local storage
    useEffect(()=>{
        setReady(false)
        props.dispatch(handleInitialData()).then(setReady(true))
    },[])

    //initializing variables with state from the redux stores
    const decks = props.decks
    const cardsKeysList =  Object.keys(decks)

    //Returns a massage when user has no decks yet
    if(cardsKeysList.length === 0){
        return (
            <View style={styles.noDeck}>
                <Text>You Dont have any decks yet!</Text>
            </View>
        )
    }

    //Shows loading spinner while data is loading
    if(ready === false){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large"  color={PRIMARY_PURPLE}/>
            </View>
        )
    }

    //creates an array of deck objects for the FlatList
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

//Styles
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

/**
 * @function
 * @description Maps state from redux store to component's props
 * @param {Object} state - state from redux store
 * @returns {{decks: *}}
 */
function mapStateToProps(state){
    return{
        decks:state
    }
}

//exports component
export default connect(mapStateToProps)(Home)