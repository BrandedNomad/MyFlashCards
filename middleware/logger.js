/**
 * @description Logging middleware used in development. Enables developer to see state changes in the console
 * @param {object} store - the Redux store
 * @returns {function(*): function(*=): *}
 */
const logger = (store)=>(next)=>(action)=>{
    console.group(action.type)
    console.log("The action: ", action)
    const returnValue = next(action)
    console.log("The new state: ", store.getState())
    console.groupEnd()
    return returnValue
}

export default logger;