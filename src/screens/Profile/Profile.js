import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native"
import React, { Component } from "react"
import { db, auth } from '../../firebase/config'
import Post from "../../components/Post/Post"

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            email: '',
            miniBio: '',
            foto: '',
            cantPost: '',
            posts: []
        }
    }

    componentDidMount() {
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = []
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })


            }
        )
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let user = []
                docs.forEach(doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        user: user
                    })
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
            <View>
                <Text>Profile</Text>
                {
                    this.state.user.length == 0 ?
                        <Text></Text> :
                        <View>
                            <Text style={styles.text}> {this.state.user[0].data.userName} </Text>
                            <Text style={styles.text}> {this.state.user[0].data.owner} </Text>
                            <Text style={styles.text}> {this.state.user[0].data.bio} </Text>
                            <Image
                                style={styles.foto}
                                source={this.state.user[0].data.foto}
                                resizeMode='cover'
                            />
                        </View>
                }

                <Text style={styles.text2}> Lista de sus {this.state.posts.length} posteos  </Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Post postData={item} navigation={this.props.navigation} />}
                />
                <TouchableOpacity onPress={() => this.signOut()}>
                    <Text>Log out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create ({



    scroll:{
        flex: 2
    },

    text:{
        fontFamily: 'Oswald, sans-serif',
        color:'white',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign:'center',
        backgroundColor:'#926F5B',
    },
    
    text2:{
       backgroundColor:'#D3B9AA',
       color: 'white',
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',  
        },

    foto:{
        height:400,
        width:400,
        border: '2px solid #ddd',
        borderRadius:9 ,
        padding: 5,
        alignItems:'center'    
        },

})

export default Profile