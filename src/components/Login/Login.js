import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'


class Login extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            logueado: false
        }
    }

    login(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then( resp => this.setState( {logueado: true} ))
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <View>
            <TextInput
             style={ styles.input}
             onChangeText={ text => this.setState( {email:text} )}
             placeholder='Email'
             value={this.state.email}
            />
            <TextInput
             style={ styles.input}
             onChangeText={ text => this.setState( {password:text} )}
             placeholder='Password'
             value={this.state.password}
            />
            <View>
                <TouchableOpacity onPress={()=> this.login(this.state.email, this.state.password)}>
                    <Text>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: 'red'
    }
})

export default Login

