import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, FlatList, TextInput } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const Drawer = createBottomTabNavigator();

import Home from '../screens/home'
import Register from '../screens/register'
import Login from '../screens/login'
import Profile from '../screens/profile';
import PostForm from '../screens/postForm';
import Search from '../screens/search';


import { auth } from '../firebase/config';
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn:false,
            user: '',
            email: '',
            error: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => { 
              if (user == null) {
                  this.setState({
                      loggedIn: false
                  })
                
              }
              else{this.setState ({
                  loggedIn:true
              })}
        })
    }

    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( response => {
                this.setState({
                    loggedIn: true,
                    user:response.user,
                    email: response.user.email
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                })
            })
    }

   
    register(email, pass, name){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( (response)=>{
                console.log();
                response.user.updateProfile({
                    displayName: name,
                })
                .then(() => {
                    console.log('nombre registrado')
                })
                .catch(e => console.log(e))
            })
            .catch( error => {
                this.setState({
                    error: error.message,
                })
            })
    }

    logout(){
        auth.signOut()
            .then( (res)=>{
                this.setState({
                    user:'',
                    loggedIn: false,
                })
            })
            .catch()
        
    }
    render() {
        return (
            <NavigationContainer>
                
                { this.state.loggedIn ? 
                <Drawer.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'home'
                        : 'home';
                    } else if (route.name === 'Profile') {
                      iconName = focused ? 'user' : 'user';
                    } else if (route.name === 'New Post') {
                        iconName = focused ? 'plus-square-o' : 'plus-square-o';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search';
                    } else if (route.name === 'Login') {
                        iconName = focused ? 'user' : 'user';
                    } else if (route.name === 'Login') {
                        iconName = focused ? 'user' : 'user';
                    }
        
                    // You can return any component that you like here!
                    return <FontAwesome name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#3e92e0',
                  tabBarInactiveTintColor: 'gray',
                })}
              >
                <Drawer.Screen name= "Home" options={ {headerShown:false }} component={()=> <Home/>}/>
                <Drawer.Screen name= "Profile" options={ {headerShown:false }} component={()=> <Profile email={this.state.email} logout={()=>this.logout()}/>}/>
                    <Drawer.Screen name="New Post" options={{ headerShown: false }} component={(drawerProps) => <PostForm drawerProps={drawerProps} />} />
                    <Drawer.Screen name="Search" options={{ headerShown: false }} component={() => <Search />} />
                </Drawer.Navigator>
                :
                <Drawer.Navigator
                    screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Login') {
                        iconName = focused
                            ? 'user'
                            : 'user';
                        } else if (route.name === 'Register') {
                        iconName = focused ? 'user' : 'user';
                        }

                        // You can return any component that you like here!
                        return <FontAwesome name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#3e92e0',
                    tabBarInactiveTintColor: 'gray',
                    })}
                >
                        <Drawer.Screen name="Login" options={{ headerShown: false }} component={() => <Login error={this.state.error} login={(email, pass) => {
                        this.login(email, pass)}}/> }  />
                        <Drawer.Screen name="Register" options={ {headerShown:false }}
                    component={() => <Register error={this.state.error} register={(email, pass, name)=>this.register(email, pass, name)} />} />
                </Drawer.Navigator>
                }
        </NavigationContainer>

        )
    }
}

export default Menu;