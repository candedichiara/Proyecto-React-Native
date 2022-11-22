import { Text, TextInput, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Post from '../../components/Post/Post'

class OtroPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idUser: [],
            email: '',
            userName: '',
            miniBio: '',
            photo: '',
            cantPost:'',
            posts: [],
            error: ''
            

        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(docs => {
            let user = [];
            docs.forEach(doc => {
                user.push({
                    id:doc.id,
                    data: doc.data()
                })
                
                this.setState({
                    idUser: user,
                    userName: user[0].data.userName,
                    miniBio: user[0].data.miniBio,
                    email: user[0].data.owner,
                    photo: user[0].data.photo
                }, () => console.log(this.state))
            })
        })

        db.collection('posts').where('owner', '==', this.props.route.params.email).orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            this.setState({
                posts: posts
            }, () => console.log(this.state))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                 {
                    this.state.idUser.length == 0 ?
                    <Text> </Text> :
                        <View style={styles.containerProfile}>
                            <View>
                                <Text style={styles.text}> {this.state.userName} </Text>
                            </View>

                            <View>
                                <Text style={styles.text}> mail: {this.state.email} </Text>
                            </View>
                           
                          { <Image
                                style={styles.foto}
                                source={this.state.photo}
                                resizeMode='cover'
                          /> } 
                            <View style={styles.containerInfo}>
                               
                                <Text style={styles.text}> {this.state.miniBio} </Text>
                            </View>

                           
                            


                        </View> 
                }  

                <Text style={styles.text2}> Lista de sus {this.state.posts.length} posteos  </Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data}/>}
                />

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
        fontSize: 24,
        textAlign: 'center',     
        

    },

    text2: {
        backgroundColor: '#c7f7f7',
        color: '#1f2124',
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '6%',
        marginBottom: '2%'
    },

    foto: {
        height: 120,
        width: 120,
        border: '2px solid #ddd',
        borderRadius: '50%',
        padding: 5,
        alignItems: 'center',
        margin:'3%'
    }


})


export default OtroPerfil;