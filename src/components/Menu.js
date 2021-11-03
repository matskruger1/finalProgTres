import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createBottomTabNavigator();

import Home from '../screens/home'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <NavigationContainer>
                <Drawer.Screen name="Home" component={()=> <Home /> } />
            </NavigationContainer>
        )
    }
}

export default Menu;