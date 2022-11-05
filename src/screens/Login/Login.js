import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'


class Login extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            loggedIn: false
        }
    }

    login(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View>
        <Text style={ styles.text}>Iniciar sesion</Text>
        <View>
            <TextInput
             style={ styles.input}
             keyboardType='email-address'
             onChangeText={ text => this.setState( {email:text} )}
             placeholder='Email'
             value={this.state.email}
            />
            <TextInput
             style={ styles.input}
             onChangeText={ text => this.setState( {password:text} )}
             placeholder='Password'
             secureTextEntry={true}
             value={this.state.password}
            />
            <View>
                <TouchableOpacity onPress={()=> this.login(this.state.email, this.state.password)} style={ styles.boton}>
                    <Text>Ingresar</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>¿No tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                    <Text>Registrate</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:2,
        borderColor: 'black',
        marginBottom: 4,
        marginLeft:5,    
    },

    text: {
        marginBottom: 4,
        marginLeft:5
    },

    boton:{
        backgroundColor:'lightgrey',
        marginLeft:5
    }
})

export default Login

