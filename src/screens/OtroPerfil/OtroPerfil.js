import { Text, TextInput, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db } from '../../firebase/config'
import Post from '../../components/Post/Post'

class OtroPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            email: '',
            userName: '',
            miniBio: '',
            photo: '',
            posts: [],
            loading: true,
            nelson: []

        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(docs => {
            let user = [];
            docs.forEach(doc => {
                user.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    user: user[0].owner,
                    userName: user[0].data.userName,
                    bio: user[0].data.miniBio,
                    photo: user[0].data.photo,
                    nelson: user,
                    loading: false
                }, () => console.log(this.state))
            })
        })

        db.collection('posts').where('owner', '==', this.props.route.params.email).orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            this.setState({
                posts: posts,
                loading: false
            }, () => console.log(this.state))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {

                    this.state.nelson.length == 0 ?
                        <Text> </Text> :

                       <Image
                            style={styles.foto}
                            source={{uri: this.state.nelson[0].photo}}
                        />
                }

                <Text style={styles.text}>{this.state.owner}</Text>
                <Text style={styles.text} >{this.state.userName}</Text>
                <Text style={styles.text} >{this.state.bio}</Text>


                <Text>{this.state.userName}</Text>
                {/*
                    this.state.loading ? <Text></Text> :
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => <Post posts={item} />}
                        />


            */}
                <Text>Hola</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({



    scroll: {
        flex: 2
    },
    container: {
        backgroundColor: '#1f2124',
        flex: 2,
        alignItems: 'left',
        marginLeft: 5



    },
    containerProfile: {
        flexDirection: 'column'
    },
    containerInfo: {
        display: 'flex',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'Oswald, sans-serif',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'right',     
        

    },

    text2: {
        backgroundColor: '#c7f7f7',
        color: 'white',
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '6%',
        marginBottom: '2%'
    },

    foto: {
        height: 200,
        width: 200,
        border: '2px solid #ddd',
        borderRadius: '50%',
        padding: 5,
        alignItems: 'center',
        margin:'3%'
    },
    boton: {
        backgroundColor: 'white',
        color: 'white',
        border: 'none',
        padding: 5,
        alignItems: 'center' 
    },


})


export default OtroPerfil;