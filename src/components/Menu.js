import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createBottomTabNavigator();

import Home from '../screens/home'
import Register from '../screens/register'
import Login from '../screens/login'
import Profile from '../screens/profile';


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
            .catch(e => console.log(e))
    }

   
    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( (response)=>{
                this.setState({email: response.user.email})
                console.log('Registrado');
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
                <Drawer.Navigator>
                  <Drawer.Screen name= "Home" options={ {headerShown:false }} component={()=> <Home/>}/>
                  <Drawer.Screen name= "Profile" options={ {headerShown:false }} component={()=> <Profile email={this.state.email} logout={()=>this.logout()}/>}/>
                </Drawer.Navigator>
                  :
                  <Drawer.Navigator>
                  <Drawer.Screen name="Login" options={ {headerShown:false }} component={()=> <Login  login={(email, pass) => {
                        this.login(email, pass)}}/> }  />
                          <Drawer.Screen name="Register" options={ {headerShown:false }}
                    component={() => <Register error={this.state.error} register={(email, pass)=>this.register(email, pass)} />} />
                  </Drawer.Navigator>
                  }

            
                  
               
            </NavigationContainer>
        )
    }
}

export default Menu;