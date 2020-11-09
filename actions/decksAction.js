/**
 * @overview This file contains all the actions dispatched by the Redux store
 */

//imports
import {AsyncStorage} from "react-native";
import {NOTIFICATION_KEY} from "../utils/notifications";

//Constants
export const INITIALIZE = 'INITIALIZE';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const STORAGE_KEY = 'MyFlashcards:decks'

//Methods for removing a single deck

/**
 * @function
 * @description Action generator that removes a deck from redux store
 * @param {string} title -title of deck to be removed
 * @returns {{type: string, title: *}}
 */
const removeDeck =(title)=>{
    return {
        type:REMOVE_DECK,
        title:title
    }
}

/**
 * @function
 * @description Removes a single deck from local storage
 * @param {String} title - The title of deck to be removed
 * @returns {Promise<void>}
 */
const removeStorage = async (title)=>{
    try{
        const success = await AsyncStorage.removeItem(title)
        return success
    }catch(error){
        console.warn("Unable to remove deck",error)
    }

}

/**
 * @function
 * @description A H.O.F that removes an item from both the Redux store and local storage
 * @param {String} title - title of deck to be removed
 * @returns {function(*): Promise<void>}
 */
export function handleRemoveDeck(title){
    return (dispatch)=>{

        dispatch(removeDeck(title)) // removes from redux store

        return removeStorage(title).catch((error)=>{ //removes from local storage

            console.log(error)
        })
    }
}

//methods for adding a new deck

/**
 * @function
 * @description Action generator that adds a new deck to Redux store
 * @param {Object} deck - the new deck to be added
 * @returns {{deck: *, type: string}}
 */
export const addDeck =(deck)=> {
    return{
        type:ADD_DECK,
        deck:deck
    }
}

/**
 * @function
 * @description Adds new deck to local storage
 * @param {Object} deck - the new deck to be added
 * @returns {Promise<void>}
 */
async function storeNewDeck(deck){
    try{
        const deckId = deck.title
        const deckStringified = JSON.stringify(deck);
        await AsyncStorage.setItem(deckId,deckStringified)
    }catch(error){
        console.warn("Unable to add deck to storage",error)
    }
}

/**
 * @function
 * @description A H.O.F that adds new deck to both redux store and local storage
 * @param {Object} deck -the new deck to be added
 * @returns {function(*): Promise<void>}
 */
export const handleAddDeck = (deck)=>{
    return (dispatch)=>{

        dispatch(addDeck(deck))

        return storeNewDeck(deck).catch((error)=>{
            console.log(error)
        })
    }

}

//Methods for setting initial state of Redux store

/**
 * @function
 * @description Action generator that generates an action which initializes Redux store with decks stored in local storage
 * @param {Object} decks - decks to be loaded into redux store
 * @returns {{decks: *, type: string}}
 */
const initializeDecks = (decks)=>{
    return {
        type:INITIALIZE,
        decks:decks
    }
}

/**
 * @function
 * @description Fetches decks stored in local storage
 * @returns {Promise<{}>}
 */
async function getData(){
    try{
        let fetchedResults = {}
        const keys = await AsyncStorage.getAllKeys(); //returns all the keys in storage
        const jsonResults = await AsyncStorage.multiGet(keys) //returns all the objects in storage
        const parsedResults = jsonResults.map((item)=>{

            return item[0] !== NOTIFICATION_KEY ? JSON.parse(item[1]) : null; //parses only the deck items (not notification items)
        }).filter((item)=>{
            return item !== null; //removes all null items from parsed results
        })

        //creates a new object that contains the decks in storage
        parsedResults.forEach((deck)=>{
            fetchedResults[deck.title] = deck
        })

        return fetchedResults
    }catch(error) {
        console.warn("Unable to fetch data", error)
    }
}

/**
 * @fucntion
 * @description handles setting the initial state on app load
 * @returns {function(*): Promise<void>}
 */
export const handleInitialData = ()=>{
    return (dispatch)=>{
        return getData().then((result)=>{
            dispatch(initializeDecks(result))
        })
    }

}

//Methods for adding a single card

/**
 * @function
 * @description Action generator for adding a single card to a deck
 * @param {String} title - The title of the deck
 * @param {Object} card - An object that contains the question and answer of an individual card
 * @returns {{type: string, title: *, card: *}}
 */
const addCard = (title,card)=>{
    return {
        type:ADD_CARD,
        title:title,
        card

    }
}

/**
 * @function
 * @description Adds an individual card to a deck in local storage
 * @param {String} title - the title of the deck
 * @param {Object} card - an object that contains the question and answer of a card
 * @returns {Promise<void>}
 */
async function addCardToStore(title,card){
    try{

        //get a list of existing cards and push it onto an array
        const itemFromStore = await AsyncStorage.getItem(title)
        const parsedItemFromStore = JSON.parse(itemFromStore)
        const arrayOfCards = []
        parsedItemFromStore.cards.forEach((item)=>{
            arrayOfCards.push(item)
        })

        //create new object to save to store
        const preppedItem = {
            title,
            cards:arrayOfCards.concat(card) //add new card to existing cards
        }

        //store items
        const stringifiedItem = JSON.stringify(preppedItem)
        await AsyncStorage.setItem(title,stringifiedItem)

    }catch(error){
        console.warn("Unable to add card to store", error)
    }
}

/**
 * @function
 * @description Updates a decks cards in both Redux and local storage
 * @param {String} title - the title of the deck
 * @param {Object} card - an object containing the question and answer to be added as a card
 * @returns {function(*): Promise<void>}
 */
export const handleAddCard=(title,card)=>{
    return (dispatch)=>{
        dispatch(addCard(title,card))
        return addCardToStore(title,card).catch((error)=>{
            console.warn(error)
        })
    }
}

