import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, FlatList, TextInput } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.background}>
                <Text>Login</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default Login;