/**
 * @overview Deck represents the individual deck view
 */

//imports
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux'

import StyledButton from "./StyledButton";
import {BLACK, GRAY} from "../utils/colors";
import {handleRemoveDeck} from "../actions/decksAction";


/**
 * @function
 * @description Represents the individual deck view
 * @param {Object} route - contains params passed in from previous view
 * @param {function} dispatch - dispatches actions that update Redux and local storage
 * @param {Object} navigation - contains navigate method
 * @param {Object} props - props passed in to deck
 * @returns {JSX.Element}
 * @constructor
 */
function Deck({route,dispatch,navigation,...props}){

    //initializing variables
    const deck = route.params.deck;
    const title = deck.title;
    let number = 0;

    //prevents app from crashing when the title has not
    if(props.state[title] !== undefined){
        number = props.state[title].cards.length + "";
    }


    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{number + (number > 1? ' Cards': ' Card')}</Text>
            </View>
            <View style={styles.options}>
                <StyledButton
                    btnType={'secondary'}
                    btnText={'Add Card'}
                    onPress={()=>{
                        navigation.navigate('Add Card',{title:title,number:number})
                    }}
                />
                <StyledButton
                    btnType={'primary'}
                    btnText={'Start Quiz'}
                    disabled={number<=0}
                    onPress={()=>{
                        navigation.navigate('Quiz', {title,number})


                    }}
                />
                <StyledButton
                    btnType={'tertiary'}
                    btnText={'Delete Deck'}
                    onPress={()=>{
                        dispatch(handleRemoveDeck(title))
                        navigation.navigate('My Study Cards')
                    }}
                />
            </View>
        </View>
    )
}

//Styles
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    options:{
        height:200,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom:50
    },
    main:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:30,
        color:BLACK
    },
    subTitle:{
        fontSize:20,
        color:GRAY,
    }

})

/**
 * @function
 * @description maps redux state to component props
 * @param {Object} state - redux state from the store
 * @returns {{state: *}}
 */
function mapStateToProps(state){

    return{
        state
    }
}

//exporting component
export default connect(mapStateToProps)(Deck);