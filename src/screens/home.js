import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';

import Post from '../components/Post'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
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
                })
            }

        )
    }

    render() {
        return (
           
               
               
                 <React.Fragment>
                     
               <Text style={styles.title}> Home </Text>
              
                   <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem={({ item }) => <Post post={item} />}
                   />
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
})

export default Home;