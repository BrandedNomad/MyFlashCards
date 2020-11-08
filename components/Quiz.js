import React,{ useState} from 'react';
import {View,Text, StyleSheet,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {WHITE} from "../utils/colors";
import StyledButton from "./StyledButton";

function Quiz({route,dispatch,navigation,...props}){

    const [front, setFront] = useState(true)
    let [cardIndex,setCardIndex] = useState(0)
    let [score, setScore] = useState(0)
    const [quizComplete,setQuizComplete] = useState(false)

    console.log("score: ", score)

    const {title,number} = route.params
    const cards = props.state[title].cards
    const numberOfCards = cards.length


    const question = cards[cardIndex].question
    const answer = cards[cardIndex].answer

    if(number === 0 || number === '0'){
        return (
            <View style={styles.container}>
                <Text style={styles.noCardsFont}>Sorry, You dont' have any Flash Cards yet! Go back and add some cards</Text>
            </View>
        )
    }

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
                        }}
                    />
                </View>

            </View>
        )
    }

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

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',

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
        fontSize:50
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

function mapStateToProps(state){
    return{
        state
    }
}

export default connect(mapStateToProps)(Quiz)