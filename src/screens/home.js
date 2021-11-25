import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../firebase/config';

import Post from '../components/Post'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            loading: true,
        }
    }

    componentDidMount(){
        db.collection('Posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                this.setState({
                    posts: posteos,
                    loading: false,
                })
            }

        )
    }

    render() {
        return (
           
               
               
                 <React.Fragment>
                     
               <Text style={styles.title}> Home </Text>
              
              {
                  this.state.loading ?
                  <ActivityIndicator style={styles.loader} size='large' color='#3e92e0'/>
                  :
                  <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem={({ item }) => <Post post={item} />}
                   />
              }
                   
                   </React.Fragment>
                
            
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
    loader: {
        marginTop: 30,
    }
})

export default Home;