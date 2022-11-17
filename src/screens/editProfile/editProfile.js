import React, { Component } from 'react';
import { db } from '../../firebase/config'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class editProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            userName: '',
            miniBio: '',
        }
    }


    editarPerfil() {
        db.collection('users')
            .doc(this.state.id)
            .update({
                email: this.state.email,
                userName: this.state.userName,
                miniBio: this.state.miniBio,
            })
            .then(() => {
                this.props.navigation.navigate('Profile');
            })

    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Edita tus datos</Text>
                <View style={styles.box}>
                    <TextInput
                        placeholder='email'
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder='username'
                        keyboardType='default'
                        onChangeText={text => this.setState({ userName: text })}
                        value={this.state.userName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='miniBio'
                        keyboardType='default'
                        onChangeText={text => this.setState({ miniBio: text })}
                        value={this.state.miniBio}
                        style={styles.input}
                    />

                    <TouchableOpacity onPress={() => this.editarPerfil()}>
                        <Text style={styles.button}>Editar</Text>
                    </TouchableOpacity>


                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%'
    },
    box: {
        backgroundColor: '#c7f7f7',
        width: '80%',
        borderRadius: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '8%'
    },
    input: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%',
        height: '5%',
        padding: '5%',
        margin: '8%'
    },
    alert: {
        color: 'white'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: '5%'
    }
})

export default editProfile;