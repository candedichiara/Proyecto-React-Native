import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {db, auth} from '../../firebase/config'

class Posts extends Component {
  constructor(){
    super()
    this.state={
      descripcion: ''
    }
  }

  subirPost(text){
    db.collection('posts').add({
        owner:auth.currentUser.email,
        createdAt: Date.now(),
        description: text,
        likes:[],
        comentarios:[]
    })
    .then(()=> this.setState({descripcion:''}))
    .catch(err=>console.log(err))

}

render() {
    return (
    <View>
        <TextInput
        placeholder=' Escribi tu descripcion'
        onChangeText={text => this.setState({descripcion: text})}
        value={this.state.descripcion}
        keyboardType='default'
        style={styles.input}
        />
        <TouchableOpacity onPress={()=> this.subirPost(this.state.descripcion)}>
            <Text>Enviar</Text>
        </TouchableOpacity>
    </View>
    )
}
}

const styles = StyleSheet.create({
input:{

    marginTop:10,
    height:45,
    borderWidth:1
}
})

export default Posts