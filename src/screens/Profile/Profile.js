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
            foto: '',
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
                }, () => console.log(this.state.user))
            }
        )
    }

    signOut() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    deleteAccount () {
        db.collection('users').doc (this.state.user.id).delete()
        .then(() => {
            console.log('entre')
            auth.currentUser.delete()
        })
        .then(() => {
            this.props.navigation.navigate('Register')
        })
        .catch((err) => 'el error es' + err)
    }

    render() {
        console.log(this.state.user)
        return (

            <View style={styles.container}>
                 {
                    this.state.user.length == 0 ?
                    <Text> </Text> :
                        <View style={styles.containerProfile}>
                            <View>
                                <Text style={styles.text}> {this.state.user.data.userName} </Text>
                            </View>
                          { <Image
                                style={styles.foto}
                                source={this.state.user.data.photo}
                                resizeMode='cover'
                          /> } x
                            <View style={styles.containerInfo}>
                               
                                <Text style={styles.text}> {this.state.user.data.bio} </Text>
                            </View>
                            


                        </View> 
                }  

                <Text style={styles.text2}> Lista de sus {this.state.posts.length} posteos  </Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data}/>}
                />
               
                <TouchableOpacity style={styles.boton} onPress={()=> this.signOut()} >
                <Text>Log out</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('EditProfile', {id:this.state.user.id})}>   
                    <Text>Editar perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.boton} onPress={()=> this.deleteAccount()} >
                <Text>Delete account</Text>
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


export default Profile