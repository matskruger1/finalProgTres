import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error:" "
        }
    }



    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.title}>Instagram</Text>
                <View style={styles.formContainer}>
                    <TextInput style={styles.input}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text })}
                        type='email'
                    />
                    <TextInput style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                    />
                    {
                        this.props.error ?
                            <Text style={styles.alert}>{this.props.error}</Text>
                            :
                            <React.Fragment></React.Fragment>
                    }

                    {
                        this.state.email.includes('@') && this.state.password.length > 5 ?
                            <TouchableOpacity style={styles.boton} onPress={() => this.props.login(this.state.email, this.state.password)} >
                                <Text style={styles.texto}>Log in</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.botonDesactivado} >
                                <Text style={styles.texto}>Log in</Text>
                            </TouchableOpacity>
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        width: '80%',
        margin: 'auto',
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        width: '100%',
        margin: 5,
        backgroundColor: 'white',
    },
    boton: {
        backgroundColor: '#3e92e0',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '40%',
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#3e92e0',
        marginTop: 10,
    },
    botonDesactivado: {
        backgroundColor: '#91c1ee',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '40%',
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#91c1ee',
        marginTop: 10,
    },
    texto: {
        color: 'white',
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontFamily: `'Raleway', sans-serif`,
        textAlign: 'center',
        marginTop: 20,
    },
    alert: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
        marginVertical: 10,
    },
})

export default Login;