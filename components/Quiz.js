import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux'

function Quiz({route,...props}){

    if(route.params.number === 0 || route.params.number === '0'){
        return (
            <View style={styles.container}>
                <Text style={styles.noCardsFont}>Sorry, You dont' have any Flash Cards yet! Go back and add some cards</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.noCardsFont}>Quiz time</Text>
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    },
    noCardsFont:{
        fontSize:50
    }
})

function mapStateToProps(state){
    return{
        state
    }
}

export default connect(mapStateToProps)(Quiz)