/**
 * @overview Represents the Quiz View where user can check their understanding
 */

//imports
import React,{ useState} from 'react';
import {View,Text, StyleSheet,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {WHITE} from "../utils/colors";
import StyledButton from "./StyledButton";
import {
    clearLocalNotification,
    createNotification,
    createTriggerTomorrow,
    setLocalNotification
} from "../utils/notifications";

/**
 * @function
 * @description Represents the quiz component
 * @param {Object} route -passed in from navigator, contains params from previous view
 * @param {function} dispatch - dispatches actions that are used to update Redux and local storage
 * @param {Object} navigation - contains the navigate method used to navigate to other views
 * @param {Object} props - contains all the props passed to component from Redux store and other components
 * @returns {JSX.Element}
 * @constructor
 */
function Quiz({route,dispatch,navigation,...props}){

    //initializing variables
    const [front, setFront] = useState(true)
    let [cardIndex,setCardIndex] = useState(0)
    let [score, setScore] = useState(0)
    const [quizComplete,setQuizComplete] = useState(false)
    let question;
    let answer;
    const {title} = route.params;
    const cards = props.state[title].cards !== undefined ? props.state[title].cards : [];
    const numberOfCards = cards.length;


    //checks if there are any cards in the deck, and extracts each card's question and answer
    if(cards.length > 0){
        question = cards[cardIndex].question
        answer = cards[cardIndex].answer
    }

    //Presents user with a message to add cards if a deck has no cards in it
    if(numberOfCards === 0){
        return (
            <View style={styles.container}>
                <Text style={styles.noCardsFont}>You haven't added any cards yet! Go back and add some cards</Text>
            </View>
        )
    }

    //Checks if quiz is complete, and presents the user with the user's score if it is.
    if(quizComplete){

        let percentage = Math.floor(score/numberOfCards * 100) + "%"

        return (
            <View style={styles.container}>
                <Text style={{fontSize:50}}>Your Score</Text>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{percentage}</Text>
                </View>
                <View style={styles.scoreBtnContainer}>
                    <StyledButton
                        btnType={'secondary'}
                        btnText={'Back'}
                        onPress={()=>{
                            navigation.goBack()
                            clearLocalNotification().catch((error)=>{ console.log("unable to clear notification",error)})
                            let message = createNotification("Study Reminder","Remember to Study!")
                            let trigger = createTriggerTomorrow(16,0)
                            setLocalNotification(message,trigger).catch((error)=>{
                                console.log(error)
                            })
                        }}
                    />
                    <StyledButton
                        btnType={'primary'}
                        btnText={'Restart'}
                        onPress={()=>{
                            setCardIndex(0)
                            setFront(true)
                            setQuizComplete(false)
                            setScore(0)
                            clearLocalNotification().catch((error)=>{ console.log("unable to clear notification",error)})
                            let message = createNotification("Study Reminder","Remember to Study!")
                            let trigger = createTriggerTomorrow(16,0)
                            setLocalNotification(message,trigger).catch((error)=>{
                                console.log(error)
                            })
                        }}
                    />
                </View>
            </View>
        )
    }

    //renders either the front or the back of the card, depending on the state of the "front" flag
    return (
        <View style={styles.container}>
            {front &&
                <View style={styles.innerContainer}>
                    <View style={styles.totalContainer}>
                        <Text>{cardIndex + 1} out of {numberOfCards}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentText}>{question}</Text>
                    </View>
                    <View style={styles.flipBtnContainer}>
                        <StyledButton
                            btnType='primary'
                            btnText='Show Answer'
                            onPress={()=>{
                                setFront(false)
                            }}
                        />
                    </View>
                </View>
            }
            {!front &&
                <View style={styles.innerContainer}>
                    <View style={styles.totalContainer}>
                        <Text>{cardIndex + 1} out of {numberOfCards}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentText}>{answer}</Text>
                    </View>
                    <View style={styles.resultBtnContainer}>
                        <TouchableOpacity
                            style={[styles.resultBtn,{backgroundColor:'green'}]}
                            onPress={()=>{

                                if(cardIndex < numberOfCards -1){
                                    cardIndex++
                                    setCardIndex(cardIndex)
                                    score++
                                    setScore(score)
                                    setFront(true)

                                }else{
                                    score++
                                    setScore(score)
                                    setQuizComplete(true)
                                }

                            }}
                        >
                            <MaterialCommunityIcons name="check-bold" size={50} color={WHITE} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.resultBtn,{backgroundColor:'red'}]}
                            onPress={()=>{
                                if(cardIndex < numberOfCards -1){
                                    cardIndex++
                                    setCardIndex(cardIndex)
                                    setFront(true)
                                }else{
                                    setQuizComplete(true)
                                }
                            }}
                        >
                            <Entypo name="cross" size={50} color={WHITE} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flipBtnContainer}>
                        <StyledButton
                            btnType='primary'
                            btnText='Show Question'
                            onPress={()=>{
                                setFront(true)
                            }}
                        />
                    </View>
                </View>
            }
        </View>
    )


}

//styles
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    innerContainer:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center'
    },
    contentContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText:{
        fontSize:30,
        textAlign:'center'
    },
    flipBtnContainer:{
        height:200,
        justifyContent:'center'
    },
    totalContainer:{
        height:100,
        justifyContent:'center'
    },
    noCardsFont:{
        fontSize:30,
        textAlign:'center',
    },
    resultBtn:{
        borderRadius:50,
        width:80,
        height:80,
        justifyContent:'center',
        alignItems:'center'
    },
    resultBtnContainer:{
        flexDirection:'row',
        width:200,
        justifyContent:'space-around',
        alignItems:'center'

    },
    scoreContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    scoreText:{
        fontSize:100
    },
    scoreBtnContainer:{
        justifyContent:'space-around',
        alignItems:'center',
        height:150,
        marginBottom:20
    }
})


/**
 * @function
 * @description Maps state from the redux stores to the component's props
 * @param {Object} state - state from redux store
 * @returns {{state: *}}
 */
function mapStateToProps(state){
    return{
        state
    }
}

//exporting component
export default connect(mapStateToProps)(Quiz)