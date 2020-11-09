/**
 * @overview this component is a reusable button component that can return either a primary, secondary or tertiary button, depending on its props
 */

//imports
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {BLACK,DARK_PINK, WHITE} from "../utils/colors";

/**
 * @function
 * @description Represents a reusable button component
 * @param {String} btnType -specifies whether the button should be a primary, secondary or tertiary button
 * @param {String} btnText - the text displayed on the button
 * @param {function} onPress - the function that should be called when button is pressed
 * @returns {JSX.Element}
 * @constructor
 */
function StyledButton({btnType, btnText, onPress}){
    return(
        <View>
            {btnType === 'primary' && <TouchableOpacity style={styles.primaryBtn} onPress={onPress}>
                <Text style={styles.primaryText}>{btnText}</Text>
            </TouchableOpacity>}
            {btnType === 'secondary' && <TouchableOpacity style={styles.secondaryBtn} onPress={onPress}>
                <Text style={styles.secondaryText}>{btnText}</Text>
            </TouchableOpacity>}
            {btnType === 'tertiary' && <TouchableOpacity style={styles.tertiaryBtn} onPress={onPress}>
                <Text style={styles.tertiaryText}>{btnText}</Text>
            </TouchableOpacity>}
        </View>
    )
}

//styles
const styles = StyleSheet.create({
    primaryBtn:{
        width:200,
        backgroundColor:BLACK,
        borderWidth:1,
        borderColor:BLACK,
        borderRadius:3,
        padding:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    primaryText:{
        color:WHITE,
        fontSize:20,
    },
    secondaryBtn:{
        width:200,
        backgroundColor:WHITE,
        borderWidth:1,
        borderColor:BLACK,
        borderRadius:3,
        padding:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    secondaryText:{
        color:BLACK,
        fontSize:20,
    },
    tertiaryBtn:{
        width:200,
        padding:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    tertiaryText:{
        color:DARK_PINK,
        fontSize:25,
    }
})

//exporting button
export default StyledButton;