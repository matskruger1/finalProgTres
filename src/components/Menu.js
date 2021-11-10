import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createBottomTabNavigator();

import Home from '../screens/home'
import Register from '../screens/register'
import Login from '../screens/login'

import { auth } from '../firebase/config';
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn:false,
            user:''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            this.setState({
                loggedIn:true,
                user: user,
            })
        })
    }

    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( response => {
                this.setState({
                    loggedIn: true,
                    user:response.user,
                })
            })
            .catch(e => console.log(e))
    }

   
    register(email, pass){
        console.log ("registrando")
        auth.createUserWithEmailAndPassword(email, pass)
            .then( ()=>{
                console.log('Registrado');
            })
            .catch( error => {
                console.log(error);
            })
    }

    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Login" component={()=> <Login  login={(email, pass) => {
                        this.login(email, pass)}}/> }  />
                    <Drawer.Screen name="Register" component={() => <Register register={(email, pass)=>this.register(email, pass)} />} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

export default Menu;