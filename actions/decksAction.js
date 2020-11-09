import {AsyncStorage} from "react-native";

export const INITIALIZE = 'INITIALIZE';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';
export const STORAGE_KEY = 'MyFlashcards:decks'

import {NOTIFICATION_KEY} from "../utils/notifications";


const removeDeck =(title)=>{
    return {
        type:REMOVE_DECK,
        title:title
    }
}

const removeStorage = async (title)=>{
    try{
        const success = await AsyncStorage.removeItem(title)
        return success
    }catch(error){
        console.warn("Unable to remove deck",error)
    }

}

export function handleRemoveDeck(title){
    return (dispatch)=>{

        dispatch(removeDeck(title))

        return removeStorage(title).catch((error)=>{
            console.log(error)
        })
    }
}

export const addDeck =(deck)=> {
    return{
        type:ADD_DECK,
        deck:deck
    }
}

async function storeNewDeck(deck){
    try{
        const deckId = deck.title
        const deckStringified = JSON.stringify(deck);
        await AsyncStorage.setItem(deckId,deckStringified)
    }catch(error){
        console.warn("Unable to add deck to storage",error)
    }
}

export const handleAddDeck = (deck)=>{
    return (dispatch)=>{

        dispatch(addDeck(deck))

        return storeNewDeck(deck).catch((error)=>{
            console.log(error)
        })
    }

}

const initializeDecks = (decks)=>{
    return {
        type:INITIALIZE,
        decks:decks
    }
}

async function getData(){
    try{
        let fetchedResults = {}
        const keys = await AsyncStorage.getAllKeys();
        const jsonResults = await AsyncStorage.multiGet(keys)
        const parsedResults = jsonResults.map((item)=>{

            return item[0] !== NOTIFICATION_KEY ? JSON.parse(item[1]) : null;
        }).filter((item)=>{
            return item !== null;
        })

        console.log("This is it", parsedResults)

        parsedResults.forEach((deck)=>{
            fetchedResults[deck.title] = deck
        })

        return fetchedResults
    }catch(error) {
        console.warn("Unable to fetch data", error)
    }
}

export const handleInitialData = ()=>{
    return (dispatch)=>{
        return getData().then((result)=>{
            dispatch(initializeDecks(result))
        })
    }

}

const addCard = (title,card)=>{
    return {
        type:ADD_CARD,
        title:title,
        card

    }
}

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

export const handleAddCard=(title,card)=>{
    return (dispatch)=>{
        dispatch(addCard(title,card))
        return addCardToStore(title,card).catch((error)=>{
            console.warn(error)
        })
    }
}