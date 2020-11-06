export const INITIALIZE = 'INITIALIZE';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export const addDeck =(deck)=> {
    return{
        type:ADD_DECK,
        deck:deck
    }

}

export const initializeDeck = (decks)=>{
    return {
        type:INITIALIZE,
        decks:decks
    }
}