import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import {db, auth} from '../../firebase/config';
import firebase from 'firebase';

class Search extends Component {
    constructor(props) {
        super (props)
        this.state= {
            users: [],
            usersFiltrados: [],
            search: false
        }
    }

    searchUserPost() {
        db.collection('users').where('owner', '===', this.state.input).onSnapshot(
            docs => {
                let usersFiltrados = [];
                docs.forEach (doc => {
                    usersFiltrados.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    users: usersFiltrados,
                })
            }
        )
    }

    render() {
        return(
            <View>
                <TextInput onChangeText={ text => this.setState({ input: text }) }/>
                    <Text onPress={() => this.searchUserPost()}>Buscar</Text>
                    <FlatList 
                    data={this.state.users}
                    keyExtractor={ item => item.id.toString()}
                    renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} id={item.id}/>}
                />
            </View>
        )
    }
}


export default Search;