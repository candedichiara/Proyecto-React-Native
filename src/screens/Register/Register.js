import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import MyCamera from '../../components/MyCamera/MyCamera'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            bio: '',
            error: '',
            photo: '',
            showCamera: false,
        }
    }

    registerUser(email, password, userName, bio, photo) {
        //registrar en firebase y de ahi nos redirecciona al login
        auth.createUserWithEmailAndPassword(email, password)
            .then(resp => {
                db.collection('users').add({
                    owner: email,
                    userName: userName,
                    bio: bio,
                    photo: photo
                })
                    .then(() => {
                        this.setState({
                            email: '',
                            password: '',
                            userName: '',
                            bio: '',
                            error: '',
                            showCamera: false

                        })
                        this.props.navigation.navigate('Login')
                        // preguntar si tengo que poner tabNavigation o login


                    })
                    .catch(err => console.log(err))
            })

    }
    onImageUpload(url) {
        this.setState({
            photo: url,
            showCamera: false,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Registrate</Text>
                <View style={styles.container2}>

                    <TextInput
                        style={styles.input}
                        placeholder='email'
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text, error: '' })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='contraseña'
                        keyboardType='default'
                        onChangeText={text => this.setState({ password: text, error: '' })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='usuario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ userName: text, error: '' })}
                        value={this.state.userName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Mini biografía'
                        keyboardType='default'
                        onChangeText={text => this.setState({ bio: text, error: '' })}
                        value={this.state.bio}
                    />
                    {
                        this.state.showCamera ?
                            <View style={styles.foto}>
                                <MyCamera onImageUpload={url => this.onImageUpload(url)} />
                            </View>
                            :
                            <TouchableOpacity onPress={() => this.setState({ showCamera: true })}>
                                <Text>Foto de perfil</Text>
                            </TouchableOpacity>
                    }



                    <View>
                        {
                            this.state.email.length > 0 && this.state.password.length > 0 && this.state.bio.length > 0 ?
                                <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password)} style={styles.boton}>
                                    <Text style={styles.texto}>Registra tu usuario</Text>
                                </TouchableOpacity>
                                : 'Complete todos los campos'
                        }
                    </View>

                    <View>
                        <Text>¿Ya estas registrado?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.error !== '' ?
                            <Text>{this.state.error}</Text> : ''
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(232,229,229)',
        flex: 1
    },
    container2: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 60,

    },
    foto: {
        width: '100vw',
        height: '100vh'
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 8,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 4,


    },

    text: {
        marginBottom: 4,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 30,
        fontWeight: 800,
        marginTop: 30,
        textAlign: 'center'
    },

    boton: {
        backgroundColor: 'black',
        marginLeft: 5,
        marginBottom: 8,
        borderWidth: 1,
        marginRight: 250,
        borderRadius: 4,
        color: 'white'
    },

    ingresar: {

        color: 'white'

    },
    texto: {
        color: 'white'
    }
})

export default Register



