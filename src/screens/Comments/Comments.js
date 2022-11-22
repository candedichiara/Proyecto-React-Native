import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'


class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
          id: this.props.route.params.id,
          arrComments: [],
          data: {},
          comentario: ''
        }
    }

    componentDidMount(){
      db
      .collection('posts')
      .doc(this.state.id)
      .onSnapshot(doc=> {
        this.setState({
          data: doc.data(),
          arrComments: doc.data().comentarios
        })
      })
    }
//firebase.firestore.FieldValue.arrayRemove() metodos que nos permiten actualizar arrays de firebase
//firebase.firestore.FieldValue.arrayRemove()

    sendComment(comentario){
      db
      .collection('posts')
      .doc(this.state.id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          comment: comentario
        
        })
      })
    }

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Comentarios del posteo</Text>
        {
          this.state.comentario == undefined?
          <Text></Text>:
          this.state.comentario.length == 0 ?
          <Text style={styles.texto2}>No hay comentarios, se el primero en comentar</Text>:
        
        <FlatList
        data={this.state.arrComments}
        keyExtractor={item=> item.createdAt.toString()}
        renderItem={({item})=> <Text style={styles.textComm}>{item.owner} comento:{item.comment}</Text>}  //falta poner usuario, fecha, etc
        />}
        <View>
          <TextInput
          placeholder='Escribi tu comentario...'
          style={styles.input}
          keyboardType='default'
          onChangeText={text=> this.setState({comentario:text})}
          value={this.state.comentario}
          />
          <TouchableOpacity onPress={()=> this.sendComment(this.state.comentario)}>
            <Text  style={styles.texto}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input:{
    height: 32,
    borderWidth: 1,
    color:'white',
    borderColor:'white'
  },
  container: {
    backgroundColor: '#1f2124',
    flex:1
    
  },
  texto:{
    color:'white'
  }, 
  texto2: {
    color:'white'
  }
})


export default  Comments