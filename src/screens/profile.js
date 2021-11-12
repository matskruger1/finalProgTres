import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {auth} from '../firebase/config';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      
    }
  }

  render(){
    console.log(auth.currentUser);
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Nombre: </Text>
          <Text style={styles.infoText}>Email: {auth.currentUser.email}</Text>
          <Text style={styles.infoText}>Last sign in: {auth.currentUser.metadata.lastSignInTime}</Text>
        </View>
        
        <TouchableOpacity style={styles.boton}  onPress={()=>this.props.logout()}>
          <Text style={styles.texto}>Logout</Text>
       
        </TouchableOpacity>
        
      </View>
      
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
    marginVertical: 30,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    height: '95%',
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
    marginTop: 10,
    alignSelf: 'center',
  },
  texto: {
    color: 'white',
  },
  infoText: {
    marginVertical: 5,
  },
})

export default Profile;