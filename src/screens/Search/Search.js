import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db} from '../../firebase/config';


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            result: [],
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
                    users: user
                })
                console.log(this.state)
            }
        )

    }


    searchUser(text) {
        console.log(this.state.users);
        console.log(this.state.result);

      let arrayFiltrado = this.state.users.filter(user => {
        if ( user.data.userName.toLowerCase().includes(text.toLowerCase)){
            return user
        }
       
}
      )
        this.setState({
            result: arrayFiltrado,
            search: true
          
        })
    }

    render() {

        return (
            <View>

                <TextInput
                    style={styles.boton}
                    keyboardType='default'
                    onChangeText={text => this.searchUser(text)}
                    value={this.state.search}
                />

                {
                    this.state.result.length == 0 && this.state.search == true ?
                        <Text>Usuario inexistente</Text> :
                        <View>
                             <FlatList
                            data={this.state.result}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                                <>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OtroPerfil', {email: item.data.owner})}>
                                        <Text>{item.data.userName}</Text>
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
    boton: {
        backgroundColor: 'white',
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        borderWidth: 1,
        borderRadius: 4,
        color: 'black',
        alignContent: 'center'
    }
})


export default Search;

