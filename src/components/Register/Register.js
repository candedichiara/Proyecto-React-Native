import {Text, View, TextInput, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import {auth} from '../../firebase/config'

export default class Register extends Component {
    constructor(){
        super()
        this.state = {
            mail:'',
            password:''
        }
    }
    registerUser (email, password){
        auth.createUserWithEmailAndPassword (email, password)
        .then (resp => console.log(resp))
        .catch (err => console.log(err))
    }

    render() {
        return( 
            <View>
                <Text>Registrate</Text>

                <View>
                    <TextInput
                    style = {StyleSheet.input}
                    onChangeText = {(text) => this.setState ({mail: text})}
                    value={this.state.mail}
                    keyboardType='email-address'
                    placeholder='Ingresa tu email'
                    />
                    <TextInput
                    style = {StyleSheet.input}
                    onChangeText = {(text) => this.setState ({password: text})}
                    value = {this.state.password}
                    keyboardType='default'
                    secureTextEntry={true}
                    placeholder='Ingresa tu contraseña'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    input: {
        borderWidth: 2
    }
})