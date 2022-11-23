import React, { Component } from 'react';
import { db, auth } from '../../firebase/config'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';

class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            password: '',
            newPassword: '',
            userName: '',
            miniBio: '',
            error: '',
            message:''
        }
    }

    reauthenticate = (password) => {
        const user = auth.currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
        return user.reauthenticateWithCredential(cred);
    }

    changePassword = () => {
        this.reauthenticate(this.state.password)
            .then(() => {
                auth.currentUser.updatePassword(this.state.newPassword)
                    .then(() => {
                        this.setState({ message: "Password changed" })
                    })
                    .catch((e) => { console.log(e); });
            })
            .catch((e) => { console.log(e) });
    }


    editarPerfil() {

        db.collection('users')
            .doc(this.props.route.params.id)
            .update({
                userName: this.state.userName,
                miniBio: this.state.miniBio,
            })
            .then(() => {
                this.props.navigation.navigate('Profile');
            })

        auth.currentUser.updatePassword(
            this.state.password
        ).then(() => { })
            .catch(error => console.log(error))

    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Edita tus datos</Text>
                <View style={styles.box}>
                    <Text style={styles.alert}>{this.state.error}</Text>

                    <TextInput
                        placeholder="Password Actual"
                        secureTextEntry={true}
                        onChangeText={text => { this.setState({ password: text }) }}
                        value={this.state.password}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="New password"
                        secureTextEntry={true}
                        onChangeText={text => { this.setState({ newPassword: text }) }}
                        value={this.state.newPassword}
                        style={styles.input}
                    />

                    <TouchableOpacity onPress={() => this.changePassword()}>
                        <Text style={styles.button}>Change password</Text>
                        <Text>{this.state.message}</Text>
                    </TouchableOpacity>

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
        backgroundColor: '#1f2124',
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
        color: 'black'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: '5%'
    }
})

export default EditProfile;