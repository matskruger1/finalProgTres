import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';


class Home extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
    }
  }

}

export default Home;