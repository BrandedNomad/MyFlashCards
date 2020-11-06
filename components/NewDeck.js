import React from 'react'
import {View,Text, StyleSheet} from 'react-native'
import StyledButton from "./StyledButton";



function NewDeck(){
    return (
        <View style={styles.container}>
            <Text>Create New Deck</Text>
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
    }
})

export default NewDeck