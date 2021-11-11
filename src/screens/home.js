import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Home extends Component {
    constructor() {
        super()
        this.state = {
        
        }
    }

    render() {
        return (
            <View style={styles.background}>
               <Text style={styles.title}> Home </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 30,
        fontFamily: `'Raleway', sans-serif`,
        textAlign: 'center',
        marginTop: 20,
    },
    background: {
        padding: 20,
    },
})

export default Home;