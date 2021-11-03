import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createBottomTabNavigator();

import Home from '../screens/home'
import Register from '../screens/register'
import Login from '../screens/login'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Login" component={()=> <Login /> } />
                    <Drawer.Screen name="Register" component={() => <Register />} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

export default Menu;