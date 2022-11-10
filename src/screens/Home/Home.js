import { Text, View, FlatList } from 'react-native'
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
        db.collection('posts').onSnapshot(docs => {
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
        <View>
            <Text>Home</Text>
            <FlatList
                data={this.state.posteos}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post id={item.id} data={item.data} />}
            />
        </View>
        )
    }
}

export default Home