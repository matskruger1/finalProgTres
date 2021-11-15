import React, {Component} from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, ActivityIndicator, FlatList, TextInput } from 'react-native';

import {auth, db} from '../firebase/config'

class PostForm extends Component {
    constructor(){
        super()
        this.state = {
            textoPost: '',
            
        }
    }

    onSubmit() {
        db.collection('Posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoPost: this.state.textoPost,
            likes: [],
            comments: [],
        })
            .then(() => {
                console.log('Posteado OK');
                this.setState({
                    textoPost: '',
                })
                this.props.drawerProps.navigation.navigate('Home')
            })
            .catch(e => { console.log(e); })
    }

    render(){
        return (
            <React.Fragment>
            <Text style={styles.title}>Post</Text>
            <View style={styles.formContainer}>
                
                <TextInput
                    placeholder='Comment...'
                    style={styles.input}
                    onChangeText={(text) => this.setState({ textoPost: text })}
                    keyboardType='default'
                    ultiline
                    value={this.state.textoPost}
                />
                <TouchableOpacity style={styles.boton} onPress={() => this.onSubmit()}>
                    <Text style={styles.texto}>Post</Text>
                </TouchableOpacity>
            </View>
            </React.Fragment>
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
})

export default PostForm