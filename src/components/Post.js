import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList } from 'react-native';

import { auth, db } from '../firebase/config'
import firebase from 'firebase'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            liked: false,
            showModal: false,
            comment: '',
            errorComentario: '',
        }
    }

    componentDidMount() {
        if (this.props.post.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                liked: true,
            })
        };
        this.setState({
            likes: this.props.post.data.likes.length,
        });
    }

    like() {
        db.collection('Posts').doc(this.props.post.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    likes: this.props.post.data.likes.length,
                    liked: true,
                })
            })
            .catch(e => console.log(e))
    }

    disLike() {
        db.collection('Posts').doc(this.props.post.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    likes: this.props.post.data.likes.length,
                    liked: false,
                })
            })
            .catch(e => console.log(e))
    }

    showModal() {
        this.setState({
            showModal: true,
        })
    }
    closeModal() {
        this.setState({
            showModal: false,
        })
    }

    publicarComentario() {
        if(this.state.comment.length > 0){
            let oneComment = {
                author: auth.currentUser.email,
                createdAt: Date.now(),
                commentText: this.state.comment,
            }
            db.collection('Posts').doc(this.props.post.id).update({
                comments: firebase.firestore.FieldValue.arrayUnion(oneComment),
            })
                .then(() => {
                    this.setState({
                        comment: '',
                        errorComentario: '',
                    })
                })
                .catch(e => console.log(e))
        } else {
            this.setState({
                errorComentario: 'Comment something'
            })
        }

    }

    render() {
        return (
            <View style={styles.postContainer}>
                <Text>{this.props.post.data.owner}: {this.props.post.data.textoPost}</Text>
                <View style={styles.botonContainer}>
                    {
                        this.state.liked ?
                            <TouchableOpacity style={styles.boton} onPress={() => this.disLike()}>
                                <Text>Quitar like</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.boton} onPress={() => this.like()}>
                                <Text>Me gusta</Text>
                            </TouchableOpacity>
                    }
                </View>
                <Text>Likes: {this.state.likes} </Text>

                {
                    this.state.showModal ?
                        <Modal style={styles.modalContainer}
                            animationType='fade'
                            transparent={false}
                            visible={this.state.showModal}
                        >
                            <TouchableOpacity onPress={() => this.closeModal()}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>

                            {
                                this.props.post.data.comments ?
                                    <FlatList
                                        data={this.props.post.data.comments}
                                        keyExtractor={post => post.createdAt.toString()}
                                        renderItem={({ item }) => <Text>{item.author}: {item.commentText}</Text>}
                                    /> :
                                    <Text>No comments</Text>
                            }


                            <View style={styles.formContainer}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='default'
                                    placeholder='Escribi tu comentario'
                                    multiline
                                    value={this.state.comment}
                                    onChangeText={(text) => {
                                        this.setState({
                                            comment: text,
                                        })
                                    }}
                                />
                                <Text>{this.state.errorComentario}</Text>
                                <TouchableOpacity style={styles.boton} onPress={() => this.publicarComentario()}>
                                    <Text>Comentar</Text>
                                </TouchableOpacity>
                            </View>

                        </Modal>
                        :
                        <TouchableOpacity onPress={() => this.showModal()}>
                            <Text>Ver comentarios</Text>
                        </TouchableOpacity>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    botonContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },
    postContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        width: '100%',
        marginBottom: 20,
        padding: 10,
    },
    modalContainer: {
        width: '90%',
        borderRadius: 4,
        padding: 10,
        alignSelf: 'center',
        marginVertical: 10,
        boxShadow: 'rgb(204 204 204) 0px 0px 9px 2px'
    },
    closeButton: {
        backgroundColor: 'red',
        color: '#fff',
        padding: 5,
        borderRadius: 5,
        margin: 5,
        alignSelf: 'flex-end',
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
    formContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        width: '80%',
        margin: 'auto',
    },
})

export default Post;