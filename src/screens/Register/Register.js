import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {auth} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            bio: '',
            error:''
        }
    }

    register(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then (resp => this.props.navigation.navigate ('TabNavigation'))
        .catch(err => this.setState({error: err.message}))
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Registrate</Text>
                <View style={styles.container2}>
                    
                    <TextInput
                    style = {styles.input}
                    placeholder='Ingresa tu email'
                    onChangeText={text => this.setState ({email: text})}
                    value={this.state.email}
                    />
                    <TextInput
                    style = {styles.input}
                    placeholder='Ingresa tu contraseña'
                    onChangeText={text => this.setState ({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    />
                    <TextInput
                    style = {styles.input}
                    placeholder='Mini biografía'
                    onChangeText={text => this.setState ({bio: text})}
                    value={this.state.bio}
                    />

                    <View>
                        {
                            this.state.email.length > 0 && this.state.password.length > 0 && this.state.bio.length > 0? 
                            <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password)} style={styles.boton}>
                            <Text>Registra tu usuario</Text>
                            </TouchableOpacity>
                            : 'Complete todos los campos'
                        }
                    </View>

                    <View>
                        <Text>¿Ya estas registrado?</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                            <Text>Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.error !== '' ?
                        <Text>{this.state.error}</Text>:''
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: 'rgb(232,229,229)',
        flex: 1
    },
    container2: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 60,

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
        color:'white'
    },

    ingresar: {

        color: 'white'

    }
})

export default Register



