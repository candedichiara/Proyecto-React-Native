import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase'


class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.route.params.id,
      arrComments: [],
      data: {},
      comentario: ''
    }
  }

  componentDidMount() {
    db
      .collection('posts')
      .doc(this.state.id)
      .onSnapshot(doc => {
        this.setState({
          data: doc.data(),
          arrComments: doc.data().comentarios
        })
      })
  }

  sendComment(comentario) {
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

      .catch(err => console.log(err))

    this.setState({
      comentario: ''

    })

  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Comentarios del posteo</Text>
        {
          this.state.arrComments.length > 0 ?
            <FlatList
              data={this.state.arrComments.sort((actual, vecino)=> actual.createdAt - vecino.createdAt).reverse()}
              keyExtractor={item => item.createdAt.toString()}
              renderItem={({ item }) => <Text style={styles.textComm}>{item.owner} comento: {item.comment}</Text>}
              
            />
            :
            <Text style={styles.texto2}>No hay comentarios, se el primero en comentar</Text>
        }
        <View>
          <TextInput
            placeholder='Escribi tu comentario...'
            style={styles.input}
            keyboardType='default'
            onChangeText={text => this.setState({ comentario: text })}
            value={this.state.comentario}
          />

          {
            this.state.comentario.length > 0 ?
              <TouchableOpacity onPress={() => this.sendComment(this.state.comentario)}>
                <Text style={styles.texto2}>Comentar</Text>
              </TouchableOpacity>
              :
              ""
          }

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 32,
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    marginTop: 20
  },
  container: {
    backgroundColor: '#1f2124',
    flex: 1

  },
  texto: {
    color: 'white',
    fontSize: 22,
  },
  texto2: {
    color: 'white'
  },
  textComm:{
    color:'white',
  }
})


export default Comments