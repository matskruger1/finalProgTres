import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
           email: '',
           user: '',
           password: '',
        }
    }

    render() {
        return (
            <View style={styles.background}>
                <View style={styles.formContainer}>
                    <TextInput style={styles.input}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TextInput style={styles.input}
                        placeholder='Username'
                        keyboardType='default'
                        onChangeText={text => this.setState({ user: text })}
                    />
                    <TextInput style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                    />

                    <TouchableOpacity style={styles.boton}  onPress={()=>this.props.register(this.state.email, this.state.password)} >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingVertical: 20
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        width: '100%',
        margin: 10,
    },
    boton: {
        backgroundColor: '#28a745',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '30%',
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginTop: 10,
    },
})

export default Register;