import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {auth} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
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
                <View>
                    <Text>Registrate</Text>
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

                    <View>
                        <TouchableOpacity onPress={() => this.register(this.state.email, this.state.password)}>
                            <Text>Registra tu usuario</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text>Ya estas registrado?</Text>
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
    input: {
        borderWidth:2
    }
})

export default Register



