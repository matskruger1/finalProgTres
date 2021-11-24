import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {db, storage} from '../firebase/config';

import { FontAwesome } from '@expo/vector-icons';


class MyCamera extends Component {
    constructor(props){
        super(props);
        this.state = {
            permission: false,
            photo: '',
        }
        this.camera //para hacer referencia a esta camara y poder usar los metodos internos

    }


    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
          .then(()=> {
              this.setState({
                  permission: true,
              })
          })
          .catch(error => console.log(error))
    }

    takePicture(){
        //Metodo para sacar una foto
        this.camera.takePictureAsync()
            .then( photo => {
                this.setState({
                    photo:photo.uri,//La ruta interna temporal hacia la carpeta temporal en donde se encuentra la imagen
                    
                })
            })
            .catch(error => console.log(error))
    }

    clear(){
        //Setear el estado photo a vacio
        this.setState({
            photo:""
        })

    }


    savePhoto(){
        fetch(this.state.photo)
           .then(res => res.blob())
           .then( image => {
               //Guardar imagen en el storage
               //Darle un nombre a la img
               const ref = storage.ref(`photos/${Date.now()}.jpg`)
               ref.put(image)
                  .then(()=>{
                      ref.getDownloadURL()
                        .then(url => {
                            //pasar por props la url publica al formulario que carga el nuevo posteo
                            this.props.onImageUpload(url);
                            //Actualizo el estado para que se renderice de nuevo la camara
                            this.setState({
                                photo:''
                            })
                        })
                        .catch(error=>console.log(error))
                  })
                  .catch(error=>console.log(error))
               //Subirla al storage

               //Tomar la url publica y pasarla al form de carga de posteos
           })
           .catch(error=>console.log(error))

    }





    render(){
        return(
            <React.Fragment>
                {
                    this.state.permission ? 
                     this.state.photo ?
                     <React.Fragment>
                         <Image 
                            style= {styles.preview}
                            source={{uri:this.state.photo}}
                         />
                         <View style={styles.actionArea}>                          
                         <TouchableOpacity style={styles.acceptButton} onPress={()=>this.savePhoto()}>
                             <Text>Accept</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.dismissButton} onPress={()=> this.clear()}>
                             <Text>Dismiss</Text>
                         </TouchableOpacity>
                         </View>

                     </React.Fragment> 
                     :
                    <React.Fragment>
                      <Camera 
                         style={styles.cameraBody}
                         type={Camera.Constants.Type.back}
                         ref={reference => this.camera=reference}
                      /> 
                      <TouchableOpacity 
                        style={styles.button} 
                        onPress={()=>this.takePicture()}>
                          <FontAwesome name="camera" size={24} color="white" />
                      </TouchableOpacity>
                    </React.Fragment>
                    :
                    <Text>Aun no has aceptado los permisos</Text>
                }
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    cameraBody:{
        flex:7,
    },
    button:{
        paddingVertical: 10,
        flex:1,
        alignSelf: 'center',
        width: 70,
        height: 50,
        borderRadius: '50%',
        backgroundColor: '#3e92e0',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 5,
    },
    preview:{
        flex:7
    },
    actionArea:{
        flex: 2
    },
    acceptButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '40%',
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'green',
        marginTop: 10,
    },
    acceptButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '40%',
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
        marginTop: 10,
    },
})


export default MyCamera
