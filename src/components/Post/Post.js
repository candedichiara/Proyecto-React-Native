import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, Button } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            likeado: false,
            cantidadLikes: this.props.data.likes.length,
            //cantidadComenatarios: this.props.data.comment.length,

        }
    }

    componentDidMount() {
        let like = this.props.data.likes.includes(auth.currentUser.email)
        if (like) {
            this.setState({
                likeado: true
            })
        }
    }

    likear() {
        db
            .collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(resp => {
                this.setState({
                    likeado: true,
                    cantidadLikes: this.state.cantidadLikes + 1
                })
            })
            .catch(err => console.log(err))
    }

    deslikear() {
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(resp => {
                this.setState({
                    likeado: false,
                    cantidadLikes: this.state.cantidadLikes - 1
                })
            })
            .catch(err => console.log(err))
    }

    deletePost() {
        db.collection('posts')
            .doc(this.props.id)
            .delete()
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.foto}
                    source={{ uri: this.props.data.foto }}
                    resizeMode='cover'
                />
                <Text> {this.props.data.owner} </Text>
                <View>
                    <Text style={styles.texto}>Descripcion:</Text>
                    <Text>{this.props.data.description}</Text>
                </View>

                <View>

                    <Text>{this.state.cantidadLikes}</Text>
                    {
                        this.state.likeado ?
                            <TouchableOpacity onPress={() => this.deslikear()}>
                                <FontAwesome name='heart' color='red' size={32} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.likear()}>
                                <FontAwesome name='heart-o' color='red' size={32} />
                            </TouchableOpacity>
                    }

                </View>



                <View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { id: this.props.id })}>
                        <Text>Agregar comentario</Text>
                    </TouchableOpacity>

                </View>
                {
                    this.props.data.owner == auth.currentUser.email ?
                        
                        <TouchableOpacity style={styles.boton} onPress={() => this.deletePost()} >
                            <Text>Borrar </Text>
                        </TouchableOpacity> :
                        <Text></Text>
                }

            </View>





        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 3.5,
        borderRadius: 10,
        marginBottom: 4,
        marginTop: 6,
        marginLeft: 8,
        marginRight: 8,

    },
    texto: {
        fontWeight: 550,
    },
    foto: {
        height: 400,
        width: 400,
        border: '2px solid #ddd',
        borderRadius: 9,
        padding: 5,
        alignItems: 'center'
    }
})

export default Post