import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {FontAwesome,MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import Constants from 'expo-constants'
import {createStore,applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import decksReducer from "./reducers/decksReducer";
import thunk from "redux-thunk";

import Home from './components/Home'
import NewDeck from "./components/NewDeck";
import Deck from './components/Deck';
import logger from "./middleware/logger";
import {PRIMARY_BLUE, WHITE, GRAY, SECONDARY_PINK, DARK_BLUE} from "./utils/colors";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import {createTrigger,createNotification,setLocalNotification,isKeySet} from "./utils/notifications";


const store = createStore(decksReducer,applyMiddleware(thunk,logger));


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
            header:null,
            initialRouteName:'Decks',
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
          navigationOptions={{
              initialRouteName:'Home'
          }}

      >
        <Stack.Screen
            name='Home'
            component={tabNavigation}
        />
        <Stack.Screen
            name='Deck'
            component={Deck}
            options={({route})=>{
                return {
                    title:route.params.title,
                    number:route.params.number
                }
            }}
            navigationOptions = {{
                backBehavior:'initialRoute'
            }}
        />
          <Stack.Screen
              name='Add Card'
              component={AddCard}
              options={({route})=>{
                  return {
                      title:route.params.title,
                      number:route.params.number
                  }
              }}
          />
          <Stack.Screen
              name='Quiz'
              component={Quiz}
              options={({route})=>{
                  return {
                      title:route.params.title,
                      number:route.params.number
                  }
              }}
          />

      </Stack.Navigator>
  )
}

export default function App() {

    useEffect(()=>{
        const hasKey = isKeySet()
        if(!hasKey){
            let DateNow = new Date(Date.now())
            let message = createNotification("Study Reminder","Remember to study today")
            let trigger = createTrigger(DateNow.getHours() + 3,5)
            setLocalNotification(message,trigger).catch((error)=>{
                console.log(error)
            })
        }

    },[])

  return (
      <Provider store={store}>
          <View style={{flex:1}}>
              <MyStatusBar backgroundColor={DARK_BLUE} barStyle='light-content'/>
              <NavigationContainer>
                  {mainNavigator()}
              </NavigationContainer>
          </View>
      </Provider>

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
