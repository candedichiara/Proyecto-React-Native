import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            likeado: false,
           // cantidadLikes: props.data.likes.length,
            //cantidadComenatarios: props.data.comments.length
        
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
                    likeado: true
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
                    likeado: false
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.texto}>Descripcion:</Text>
                    <Text>{this.props.data.description}</Text>
                </View>

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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments')}>
                    <Text>Agregar comentario</Text>
                </TouchableOpacity>
              
                
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
    }
})

export default Post