import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native"
import React, { Component } from "react"
import { db, auth } from '../../firebase/config'
import Post from "../../components/Post/Post"

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            email: '',
            userName: '',
            miniBio: '',
            photo: '',
            cantPost: '',
            posts: []
        }
    }

    componentDidMount() {

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                })


            }
        )
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => { //todos los datos de la colección
                let user = {}
                docs.forEach(doc => { //por cada documento, quiero un doc y la función que ejecutaré por cada doc
                    user = {
                        id: doc.id,
                        data: doc.data()
                    }

                })
                console.log(user);
                this.setState({
                    user: user
                })
            }
        )
    }

    signOut() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (

            <View style={styles.container}>
                {
                    this.state.user.length == 0 ?
                    <Text> </Text> :
                        <View>
                           { <Image
                                style={styles.foto}
                                source={this.state.user.data.photo}
                                resizeMode='cover'
                            /> }
                            <Text style={styles.text}> {this.state.user.data.userName} </Text>
                            <Text style={styles.text}> {this.state.user.data.bio} </Text>


                        </View> 
                }

                {/* <Text style={styles.text2}> Lista de sus {this.state.posts.length} posteos  </Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Post postData={item} navigation={this.props.navigation} />}
            />*/}
               
                <TouchableOpacity style={styles.text} onPress={()=> this.signOut()} >
                <Text>Log out</Text>
                </TouchableOpacity>  

                

            </View>
        )
    }
}

const styles = StyleSheet.create({



    scroll: {
        flex: 2
    },
    container: {
        backgroundColor: 'rgb(232,229,229)',
        flex: 1,



    },

    text: {
        fontFamily: 'Oswald, sans-serif',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',

    },

    text2: {
        backgroundColor: '#c7f7f7',
        color: 'white',
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    foto: {
        height: 400,
        width: 400,
        border: '2px solid #ddd',
        borderRadius: 9,
        padding: 5,
        alignItems: 'center'
    },


})

export default Profile