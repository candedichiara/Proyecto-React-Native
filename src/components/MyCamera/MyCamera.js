import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../../firebase/config'


class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCamera: false,
            urlTemporal: '',
        }
        this.metodosDeCamera = null
    
    }
    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => this.setState(
                {
                   showCamera: true
                }
            ))
            .catch(err => console.log(err))
    }

    sacarFoto() {
        this.metodosDeCamera.takePictureAsync()
           .then(photo => this.setState({
                urlTemporal: photo.uri,
                showCamera: false
           }))
            .catch(err => console.log(err))
    }

    guardarFoto(url) {
        fetch(url) 
            .then(res => res.blob())
            .then(photoOk => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`);
                ref.put(photoOk)
                    .then(() => {
                        ref.getDownloadURL()
                            .then((url)=>{
                                this.props.onImageUpload(url)
                            })
                    })
            })
            .catch(err => console.log(err))
    }

    cancelar() {
        this.setState({
            urlTemporal: '',
            showCamera: true
        })
    }

    render() {
        return (
            <View style={styles.cameraContainer}>

                {
                    this.state.showCamera  ?
                        <>
                            <Camera
                                style={styles.cameraContainer}
                                type={Camera.Constants.Type.back}
                                ref={metodos => this.metodosDeCamera = metodos}
                            
                            />
                            <TouchableOpacity style={styles.boton} onPress={() => this.sacarFoto()}>
                                <Text style={styles.sacar}>Tomar foto</Text>
                            </TouchableOpacity>
                        </>
                        : this.state.showCamera === false && this.state.urlTemporal !== '' ?
                            <>
                                <Image
                                    style={styles.fotoLista}
                                    source={{ uri: this.state.urlTemporal }}
                                    resizeMode='cover'
                                />
                                <TouchableOpacity style={styles.boton} onPress={() => this.guardarFoto(this.state.urlTemporal)}>
                                    <Text style={styles.text}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.boton} onPress={() => this.cancelar(this.state.urlTemporal)}>
                                    <Text style={styles.text}>Rechazar</Text>
                                </TouchableOpacity>
                                
                                
                            </> :
                            <Text>No tienes permiso para usar la Camara</Text>
           
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
    cameraContainer: {
        height:'50vh',
        width:'100vw',
        position:'absolute'
    },
    fotoLista: {
        height: '45vh',
    },
    text: {
        height: '5vh',
        padding: 5,
        marginTop: 20,
        backgroundColor: '#c7f7f7',
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif;',
        fontSize:20,
        fontWeight: 'bold',
        color:'black'
    },
    boton: {
        height: '5vh',
        padding: 5,
        marginTop: 10,
    },
    sacar: {
        backgroundColor: '#c7f7f7',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif;',
        fontSize:20,
        fontWeight: 'bold',
        color: 'white'
    }
    
})

export default MyCamera