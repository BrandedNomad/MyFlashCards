import React,{useState} from 'react'
import {View,Text, StyleSheet,TextInput} from 'react-native'
import {connect} from 'react-redux'

import StyledButton from "./StyledButton";
import {GRAY} from "../utils/colors";
import {handleAddDeck} from "../actions/decksAction";


function NewDeck({route,navigation,dispatch}){


    const [text,setText] = useState('');

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.inputField}
                    placeholder="Give your deck a title!"
                    onChangeText={(text)=>{
                        setText(text)
                    }}
                    defaultValue={text}
                />
            </View>
            <View>
                <StyledButton
                    btnText={"Create Deck"}
                    btnType={"primary"}
                    onPress={()=>{
                        const title = text
                        dispatch(handleAddDeck({title:title,cards:[]}))
                        navigation.navigate('Deck',{deck:{title:title,cards:[]}})
                        setText('')
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
        justifyContent:'center',
        alignItems:'center'
    },
    inputField:{
        height:100,
        padding:10,
        borderBottomColor:GRAY,
        borderBottomWidth:1,
        fontSize:30,
        marginBottom:20,
    }
})

export default connect()(NewDeck)