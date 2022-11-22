import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from '../../firebase/config';


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            result: [],
            backup: [],
            input: '',
            search: false

        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let user = [];
                docs.forEach(doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    users: user,
                    backup: user
                })
                console.log(this.state)
            }
        )

    }


    searchUser(text) {
        console.log(this.state.users);
        console.log(this.state.result);

        let arrayFiltrado = this.state.users.filter(user => {
            if (user.data.userName.toLowerCase().includes(text.toLowerCase())) {
                return user
            }

        }
        )
        this.setState({
            result: arrayFiltrado,
            search: true,
            input: text

        }, () => console.log(this.state.result))
    }

    render() {

        return (
            <View style={styles.containerPrincipal}>
                <Text style={styles.title}>Buscar usuario</Text>

                <TextInput
                    style={styles.boton}
                    keyboardType='default'
                    placeholder='Buscar'
                    onChangeText={text => this.searchUser(text)}
                    value={this.state.input}
                />

                {
                    this.state.result.length == 0 && this.state.search == true ?
                        <Text style={styles.message}>Usuario inexistente</Text> :
                        <View style={styles.container}>
                            <FlatList
                                data={this.state.result}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) =>
                                    <>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OtroPerfil', { email: item.data.owner })}>
                                            <Text style={styles.users}>{item.data.userName}</Text>
                                        </TouchableOpacity>
                                    </>

                                }
                            />

                        </View>


                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containerPrincipal: {
        backgroundColor: '#1f2124',
        flex: 1
    },
    container: {
        marginTop: 0
    },
    title: {
        fontFamily: 'Oswald, sans-serif',
        color: '#1f2124',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        backgroundColor: '#c7f7f7',
        marginBottom: 70,
        marginTop:10
    },
    boton: {
        backgroundColor: 'white',
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        borderWidth: 1,
        borderRadius: 4,
        color: 'black',
        alignContent: 'center'
    },
    message: {
        color: 'white',
        marginTop: 0,
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 20,
        marginLeft: '0',
        fontWeight: 'bold'
    },
    users: {
        color: 'white',
        marginTop: 0,
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 24,
        marginLeft: '0',
        fontWeight: 'bold',
        flexDirecion: 'wrap',
        textAlign: 'center',
        textDecorationLine: 'underline',
    }
})


export default Search;

