import {INITIALIZE, ADD_DECK, REMOVE_DECK,ADD_QUESTION} from '../actions/decksAction'


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
        default:
            return state
    }
}

export default decksReducer;