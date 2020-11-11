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
import {
    PRIMARY_BLUE,
    WHITE,
    GRAY,
    SECONDARY_PINK,
    DARK_BLUE,
    PRIMARY_WHITE_CONTRAST,
    PRIMARY_PURPLE_CONTRAST,
    PRIMARY_BLUE_CONTRAST, PRIMARY_GRAY_CONTRAST
} from "./utils/colors";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import {createTrigger,createNotification,setLocalNotification,isKeySet} from "./utils/notifications";

//Creating Redux store
const store = createStore(decksReducer,applyMiddleware(thunk,logger));


/**
 * @function
 * @description Represents the status bar at the top of the screen
 * @param {Object} backgroundColor -The color of the status bar
 * @param {Object} props
 * @returns {JSX.Element}
 */
function MyStatusBar({backgroundColor,...props}){
    return (
        <View
            style={{backgroundColor,height:Constants.statusBarHeight}}
        >
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>

        </View>
    )

}

/**
 * @function
 * @description Represents the bottom Navigation Tabs on the Home screen
 * @returns {JSX.Element}
 */
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
            activeTintColor: Platform.OS === 'ios' ? PRIMARY_BLUE_CONTRAST: PRIMARY_WHITE_CONTRAST,
            inactiveTintColor: PRIMARY_GRAY_CONTRAST,
            style:{
              height:56,
              backgroundColor:Platform.OS === 'ios' ? WHITE:PRIMARY_BLUE_CONTRAST,
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

/**
 * @function
 * @description Represents the Main navigation for the application
 * @returns {JSX.Element}
 */
const mainNavigator=()=>{
  const Stack = createStackNavigator()

  return (
      <Stack.Navigator
          screenOptions={{
            headerTintColor: PRIMARY_WHITE_CONTRAST,
            headerStyle:{
              backgroundColor:PRIMARY_BLUE_CONTRAST,
            }
          }}
          navigationOptions={{
              initialRouteName:'My Study Cards'
          }}

      >
        <Stack.Screen
            name='My Study Cards'
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

/**
 * @function
 * @description Represents the App Component
 * @returns {JSX.Element}
 */
export default function App() {

    //Runs only once, when app loads
    //Sets initial study reminder notification
    useEffect(()=>{
        const hasKey = isKeySet() //checks if notification has already been set

        //Sets notification when no key is found
        //todo: udpate initial notification to repeat
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
              <MyStatusBar backgroundColor={PRIMARY_PURPLE_CONTRAST} barStyle='light-content'/>
              <NavigationContainer>
                  {mainNavigator()}
              </NavigationContainer>
          </View>
      </Provider>

  )
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_WHITE_CONTRAST,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
