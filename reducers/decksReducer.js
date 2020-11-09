/**
 * @overview This file contains the reducer for managing the state of the Redux store
 */

//importing constants
import {INITIALIZE, ADD_DECK, REMOVE_DECK,ADD_CARD} from '../actions/decksAction'

/**
 * @function
 * @description Reducer that manages the state of redux store
 * @param {Object} state - the state of Redux store
 * @param {Object} action - the Action to be performed
 * @returns {Object} - the new state
 */
function decksReducer(state={},action){
    switch(action.type){
        case INITIALIZE:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]:action.deck
            }
        case REMOVE_DECK:

            delete state[action.title]

            return {
                ...state
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]:{
                    title:action.title,
                    cards:[
                        ...state[action.title].cards,
                        action.card
                    ]
                }
            }
        default:
            return state
    }
}


//exporting Reducer
export default decksReducer;