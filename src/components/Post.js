import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList, Image } from 'react-native';

import { auth, db } from '../firebase/config'
import firebase from 'firebase'

import { FontAwesome } from '@expo/vector-icons';

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

    borrarPosteo(){
        db.collection('Posts').doc(this.props.post.id).delete()
            .then()
            .catch(e => console.log(e))
    }
    

    render() {
       
        return (

            <View style={styles.postContainer}>

                {auth.currentUser.email==this.props.post.data.owner ?
                <TouchableOpacity onPress={() => this.borrarPosteo()}>
                                <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity>
                </TouchableOpacity>
                }
                <View style={styles.postData}>
                    <Text style={styles.userName}>{this.props.post.data.owner}</Text>
                    <Text style={styles.infoText}>Created at {this.props.post.data.createdAt}</Text>
                </View>

                  <Image 
                  source = {this.props.post.data.photo}
                  resizeMode= 'contain'
                  style={styles.image}
                />

                <View style={styles.botonContainer}>
                    {
                        this.state.liked ?
                            <TouchableOpacity style={styles.boton} onPress={() => this.disLike()}>
                                <FontAwesome name="heart" size={24} color="red" />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.boton} onPress={() => this.like()}>
                                <FontAwesome name="heart-o" size={24} color="black" />
                            </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.boton} onPress={() => this.showModal()}>
                            <FontAwesome name="comment-o" size={24} color="black" />
                        </TouchableOpacity>
                    
                </View>

                <Text>{this.props.post.data.textoPost}</Text>

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
                                 this.props.post.data.comments.length > 0  ?
                                 <FlatList  
                                data={this.props.post.data.comments}
                                keyExtractor={post => post.createdAt.toString()}
                                renderItem= {({item})=> <Text>{item.author} : {item.commentText}</Text>}

                                />  :

                                <Text style={styles.noComments}>Aun no hay comentarios</Text>

                             }
                            

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
                                <TouchableOpacity style={styles.botonComment} onPress={() => this.publicarComentario()}>
                                    <Text>Comentar</Text>
                                </TouchableOpacity>

                        </Modal>
                        :
                        null
                }
                <Text>Likes: {this.state.likes} </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    boton: {
        paddingVertical: 6,
        width: '15%',
        textAlign: 'center',
        alignSelf:'center'
    },
    botonComment: {
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
        alignSelf: 'center'
    },
    botonContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'flex-start'
    },
    postContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginBottom: 20,
        padding: 10,
        maxWidth: 340,
        margin: 'auto',
        width: '100%'
    },
    modalContainer: {
        width:"90%",
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
        height: 30,
        paddingHorizontal: 10,
        paddingTop: 5,
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
    image: {
            height: 200
        },
    noComments: {
          alignSelf:'center',
     },
     postData: {
        borderBottomWidth: 2,
        borderColor: 'black',
        padding: 5,
        marginBottom:10,
        marginRight: -10,
        marginLeft: -10,
        marginTop: -10,
     },
     userName: {
         fontWeight: 'bold'
     }
    
})

export default Post;
