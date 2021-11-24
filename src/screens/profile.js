import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {auth, db} from '../firebase/config';

import Post from '../components/Post';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      postsUser: [],
    }
  }

  componentDidMount(){
    console.log(auth.currentUser.email);
    db.collection('Posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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

  render(){
    return(
        <React.Fragment>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Nombre: {auth.currentUser.displayName}</Text>
          <Text style={styles.infoText}>Email: {auth.currentUser.email}</Text>
          <Text style={styles.infoText}>Last sign in: {auth.currentUser.metadata.lastSignInTime}</Text>
        </View>

        { this.state.postsUser.length !== 0
        ?
        <FlatList 
        style={styles.posts}
        data={this.state.postsUser}
        keyExtractor={post => post.id}
        renderItem={({ item }) => <Post post={item} />}/>
        :
                    
        <Text>This user has no posts.</Text>
        }
        
        <TouchableOpacity style={styles.boton}  onPress={()=>this.props.logout()}>
          <Text style={styles.texto}>Logout</Text>
       
        </TouchableOpacity>

        
        </React.Fragment>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
  },
  infoContainer: {
    width: '90%',
    margin: 'auto',
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontFamily: `'Raleway', sans-serif`,
    textAlign: 'center',
    marginTop: 20,
  },
  boton: {
    backgroundColor: '#d11919',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: '40%',
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#d11919',
    alignSelf: 'center',
  },
  texto: {
    color: 'white',
  },
  infoText: {
    marginVertical: 5,
  },
  posts: {
    marginVertical: 10,
    padding: 20,
  }
})

export default Profile;