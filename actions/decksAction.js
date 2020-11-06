import {AsyncStorage} from "react-native";

export const INITIALIZE = 'INITIALIZE';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';
export const STORAGE_KEY = 'MyFlashcards:decks'


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
            return  JSON.parse(item[1])
        })

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