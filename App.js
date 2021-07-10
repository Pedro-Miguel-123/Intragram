import { StatusBar } from "expo-status-bar";
import React, { Component } from 'react';
import {View, Text } from 'react-native'


import * as firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk))


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxE7qK626l1ttOCUKHY8KfYctYnlaLHcA",
  authDomain: "instagram-dev-ead69.firebaseapp.com",
  projectId: "instagram-dev-ead69",
  storageBucket: "instagram-dev-ead69.appspot.com",
  messagingSenderId: "213952423336",
  appId: "1:213952423336:web:ce2e27978540a82e66299d",
  measurementId: "G-8DWV7DGC7T"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'


const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      loaded:false,

    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn:true,
          loaded:true,
        })
      }
    })
  }
  render() {
    const {loggedIn, loaded} =this.state;
    if(!loaded){
      return(
        <View style ={{ flex:1, justifyContent: 'center '}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return ( 
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name ="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store ={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name ="Main" component={MainScreen} options={{headerShown: false}}/>
              <Stack.Screen name ="Add" component={AddScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
