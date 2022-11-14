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
        //esto se rellena cuandp traiga el componente camara, cada vez que necesite usar un metodo de la camara voy a poner this.MetodosDeCamara
    }
    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            //este metodo nos permite acceder a la camara. que apenas cargue le pida permisos al componente de expo.
            // si este permiso es aceptado queremos modificar el estado
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
        fetch(url) //busca la foto de la carpeta temporal en nuestra computadora
            .then(res => res.blob())
            //transforma eso que fue a buscar en el tipo de dato que necesitamos
            //las imagenes son un tipo de dato binario por eso ponemos res.blob
            .then(photoOk => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`);
                ref.put(photoOk)
                    .then(() => {
                        ref.getDownloadURL()
                            .then((url)=>{
                                this.props.onImageUpload(url)
                            })
                    })
                //getdownloadURL es un metodo asincronico
                //put es un metodo asincronico, put guarda la foto en firebase (imagen es lo que recibo del segundo then)
                //ref es un metodo de storage, se va a crear una carpeta photos y ahi va a guardar el archivo
                //esto tiene una ruta con un nombre para poder guardarlo en firebase
                //storage permite guardar archivos en alguna parte de firebase
            })
            .catch(err => console.log(err))
    }

    /*cancelar() {
        this.setState({
            urlTemporal: '',
            showCamera: true
        })
    }*/

    render() {
        return (
            <View style={styles.cameraContainer}>

                {
                    this.state.showCamera  ?
                        <>
                            <Camera
                                style={styles.camara}
                                type={Camera.Constants.Type.back}
                                ref={metodos => this.metodosDeCamera = metodos}
                            // la camara sabe sacar fotos, este componente sabe sacar una foto. (eso es un metodo= take picture)
                            //expo-camera tiene metodos adentro, no uso el take picture, por ende le digo a la camara que acabo de implementa
                            // buscame ese metodo que sepa sacar fotos y usalo
                            // que use su propia forma de sacar las fotos y la saque
                            // no vamos a escribir take picture
                            />
                            <TouchableOpacity style={styles.botonCamara} onPress={() => this.sacarFoto()}>
                                <Text>Tomar foto</Text>
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
                                    <Text>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.boton}>
                                    <Text>Rechazar</Text>
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
        flex: 1
    },
    camara: {
        height: 300,
    },
    fotoLista: {
        height: 300,
    }
})

export default MyCamera