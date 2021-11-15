import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'

import { db } from '../firebase/config';

class Search extends Component {
    constructor(){
        super()
        this.state = {
            searchText: '',
            postsUser: {},
        }
    }

    onSubmit(){
        db.collection('Posts').where('owner', '==', this.state.searchText)
        .then((docs) => {
            let postsUser = [];

            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            
            this.setState({
                postsUser: postsUser,
            })
        })
        .catch(e => console.log(e))
    }

    render() {
        return (
            <View>
                <Text style={styles.title}>Search Users</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='search...'
                        keyboardType='default'
                        onChangeText={text => this.setState({ searchText: text })}
                    />
                    <TouchableOpacity style={styles.boton} onPress={() => this.props.register(this.state.email, this.state.password, this.state.displayName)} >
                        <Text style={styles.texto}>search</Text>
                    </TouchableOpacity>
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

export default Search