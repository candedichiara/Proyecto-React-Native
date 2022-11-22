import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import MyCamera from '../../components/MyCamera/MyCamera'

class Posts extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      owner: '',
      createdAt: '',
      showCamera: true,
      photo: '',
    }
  }

  subirPost(text) {
    db.collection('posts').add({
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      description: text,
      likes: [],
      comentarios: [],
      foto: this.state.photo
    })
      .then(() => this.props.navigation.navigate('Home'))
      .catch(err => console.log(err))

  }

  onImageUpload(url) {
    this.setState({
        photo: url,
        showCamera: false,
    })
}

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.showCamera ?
            <MyCamera  onImageUpload={(url)=> this.onImageUpload(url)}
            />
            :
            <>
            <Text style={styles.text}>Subir posteo</Text>
              <TextInput
                placeholder=' Escribi tu descripcion'
                onChangeText={text => this.setState({ description: text })}
                value={this.state.description}
                keyboardType='default'
                style={styles.input}
              />
              <TouchableOpacity onPress={() => this.subirPost(this.state.description)}>
                <Text style={styles.text}>Publicar</Text>
              </TouchableOpacity>
            </>


        }


      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1 ,
    backgroundColor: '#1f2124'
  },

  input: {

    marginTop: 10,
    height: 45,
    borderWidth: 1,
    color:'white'
  },
  text: {
    color:'white'
  }
})

export default Posts