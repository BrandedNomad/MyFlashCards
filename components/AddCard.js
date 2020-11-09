/**
 * @overview AddCard represents the view where a user can add a new card to their deck
 */
//imports
import React,{useState} from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import StyledButton from "./StyledButton";
import {BLACK} from "../utils/colors";
import {handleAddCard} from "../actions/decksAction";


/**
 * @function
 * @description Represent the AddCard Component
 * @param {Object} route - contains the parameters passed from the previous view
 * @param {Object} navigation - contains the navigate method passed in from navigation
 * @param {function} dispatch - function for dispatching actions that updates Redux and Async store
 * @returns {JSX.Element}
 */
function AddCard({route,navigation,dispatch}){

    //initializing variables
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const title = route.params.title
    const number = route.params.number

    /**
     * @function
     * @description updates a decks cards when button is clicked
     * @param {String} title - title of the deck
     * @param {String} question - question to add
     * @param {String} answer - answer to the question
     */
    const handleSubmit=(title,question,answer)=>{
        const card = {question,answer}
        dispatch(handleAddCard(title,card))
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a Quiz Item</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textField}
                    placeholder="Question"
                    onChangeText={(text)=>{
                        setQuestion(text)
                    }}
                    defaultValue={question}
                />
                <TextInput
                    style={styles.textField}
                    placeholder="Answer"
                    onChangeText={(text)=>{
                        setAnswer(text)
                    }}
                    defaultValue={answer}
                />
            </View>
            <View style={styles.btnContainer}>
                <StyledButton
                    btnText={"Add Card"}
                    btnType={"primary"}
                    onPress={()=>{
                        handleSubmit(title,question,answer)
                        setQuestion('')
                        setAnswer('')
                        console.log("ddd", navigation)
                        navigation.goBack();

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
        justifyContent:'center',
        alignItems:'center',

    },
    btnContainer:{
        height:200,
        justifyContent: 'center',
        alignItems:'center',
    },
    inputContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    textField:{
        height:60,
        fontSize:20,
        padding:10,
        borderBottomColor:BLACK,
        borderBottomWidth:1,
        width: 300,
        marginTop:20,
    },
    title:{
        fontSize:30,
        marginTop:10

    }
})

//exporting AddCard component
export default connect()(AddCard);