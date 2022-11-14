import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db} from '../../firebase/config'
import Post from '../../components/Post/Post'

class Home extends Component {
    constructor(){
        super()
        this.state={
            posteos:[]
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt','desc').onSnapshot(docs => {
            let posts= []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data:doc.data()
                })
            })

            this.setState({
                posteos: posts
            })
        })
    }
  
    render() {
        return (
        <View style={styles.container}>
            <Text></Text>
            <FlatList
                data={this.state.posteos}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post id={item.id} data={item.data} navigation={this.props.navigation} />}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    }
})

export default Home