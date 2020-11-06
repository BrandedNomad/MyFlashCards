import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {FontAwesome,MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import Constants from 'expo-constants'

import Home from './components/Home'
import NewDeck from "./components/NewDeck";
import {PRIMARY_BLUE, WHITE, GRAY, SECONDARY_PINK, DARK_BLUE} from "./utils/colors";


function MyStatusBar({backgroundColor,...props}){
    return (
        <View
            style={{backgroundColor,height:Constants.statusBarHeight}}
        >
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>

        </View>
    )

}

function tabNavigation(){
  const Tab = createBottomTabNavigator()

  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({tintColor }) => {
              if(route.name === 'Decks') {
                return <MaterialCommunityIcons name="cards" size={30} color={Platform.OS ==='ios' ? tintColor: "white" } />
              } else if(route.name === 'Create Deck'){
                return <MaterialIcons name="library-add" size={30} color={Platform.OS ==='ios' ? tintColor: "white" } />

              }
            },
          })}
          navigationOptions={{
            header:null
          }}
          tabBarOptions={{
            activeTintColor: Platform.OS === 'ios' ? PRIMARY_BLUE: WHITE,
            inactiveTintColor: GRAY,
            style:{
              height:56,
              backgroundColor:Platform.OS === 'ios' ? WHITE:PRIMARY_BLUE,
              shadowColor: 'rgba(0,0,0,0.24)',
              shadowOffset:{
                width:0,
                height:3,
              },
              shadowRadius:6,
              shadowOpacity:1,
            }
          }}
      >
        <Tab.Screen name='Decks' component={Home}/>
        <Tab.Screen name='Create Deck' component={NewDeck}/>
      </Tab.Navigator>
  )


}

const mainNavigator=()=>{
  const Stack = createStackNavigator()

  return (
      <Stack.Navigator
          screenOptions={{
            headerTintColor: WHITE,
            headerStyle:{
              backgroundColor:PRIMARY_BLUE,
            }
          }}
      >
        <Stack.Screen name='Home' component={tabNavigation}/>
      </Stack.Navigator>
  )
}

export default function App() {
  return (
      <View style={{flex:1}}>
          <MyStatusBar backgroundColor={DARK_BLUE} barStyle='light-content'/>
          <NavigationContainer>
              {mainNavigator()}
          </NavigationContainer>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
