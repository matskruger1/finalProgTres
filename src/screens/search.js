import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList } from 'react-native'

import { db } from '../firebase/config';
import Post from '../components/Post';

class Search extends Component {
    constructor(){
        super()
        this.state = {
            searchText: '',
            postsUser: [],
        }
    }

    onSubmit(){
        db.collection('Posts').where('owner', '==', this.state.searchText).onSnapshot(
            docs => {
                let posteo = [];
                docs.forEach(doc => {
                    posteo.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                this.setState({
                    postsUser: posteo,
                })
        }) 
    }

    render() {
        console.log(this.state.postsUser)
        return (
            <React.Fragment>
                <Text style={styles.title}>Search Users</Text>
                <View style={styles.formContainer}>
                
                    <TextInput
                        style={styles.input}
                        placeholder='search...'
                        keyboardType='default'
                        onChangeText={text => this.setState({ searchText: text })}
                    />
                    <TouchableOpacity style={styles.boton} onPress={()=>this.onSubmit()} >
                        <Text style={styles.texto}>search</Text>
                    </TouchableOpacity>
                </View>  
               <React.Fragment>
                    { this.state.postsUser.length !== 0
                    ?
                    <FlatList 
                      data={this.state.postsUser}
                      keyExtractor={post => post.id}
                      renderItem={({ item }) => <Post post={item} />}/>
                    :
                    
                    <Text>No hay nada para mostrarte pa </Text>
                    }
                </React.Fragment>
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

export default Search