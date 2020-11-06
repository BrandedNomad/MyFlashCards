import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import StyledButton from "./StyledButton";
import {BLACK, GRAY} from "../utils/colors";

function Deck({route}){
    const deck = route.params.deck
    const title = deck.title;
    const number = deck.cards.length + "";
    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{number + (number > 1? ' Cards': ' Card')}</Text>
            </View>
            <View style={styles.options}>
                <StyledButton btnType={'secondary'} btnText={'Add Card'}/>
                <StyledButton btnType={'primary'} btnText={'Start Quiz'}/>
                <StyledButton btnType={'tertiary'} btnText={'Delete Deck'}/>
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

export default Deck;