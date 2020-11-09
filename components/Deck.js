import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux'

import StyledButton from "./StyledButton";
import {BLACK, GRAY} from "../utils/colors";
import {handleRemoveDeck} from "../actions/decksAction";
import {
    setLocalNotification,
    createNotification,
    clearLocalNotification,
    createTriggerTomorrow
} from "../utils/notifications";


function Deck({route,dispatch,navigation,...props}){
    const deck = route.params.deck;
    const title = deck.title;
    let number = 0;

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
                    onPress={()=>{
                        navigation.navigate('Quiz', {title,number})
                        clearLocalNotification()
                        let message = createNotification("Study Reminder","Remember to Study!")
                        let trigger = createTriggerTomorrow(16,0)
                        setLocalNotification(message,trigger).catch((error)=>{
                            console.log(error)
                        })

                    }}
                />
                <StyledButton
                    btnType={'tertiary'}
                    btnText={'Delete Deck'}
                    onPress={()=>{
                        dispatch(handleRemoveDeck(title))
                        navigation.navigate('Home')
                    }}
                />
            </View>
        </View>
    )
}

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

function mapStateToProps(state){



    return{
        state
    }
}

export default connect(mapStateToProps)(Deck);