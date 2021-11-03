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
               <Text style={styles.text}> Home </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    background: {
        padding: 20,
    },
})

export default Home;