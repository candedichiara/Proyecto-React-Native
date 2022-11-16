import { Text, TextInput, View, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {db} from '../../firebase/config'
import Post from '../../components/Post/Post'

class OtroPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            email: '',
            userName: '',
            miniBio: '',
            foto: '',
            posts: [],
            loading: true
    
        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot (docs=> {
            let user=[];
            docs.forEach(doc => {
                user.push({
                    id:doc.id,
                    data:doc.data()
                })
                this.setState ({
                    user: user[0].owner,
                    userName: user[0].data.userName,
                    bio: user[0].data.miniBio,
                    loading: false
                }, () => console.log(this.state))
            })
        })

        db.collection('posts').where ('owner', '==', this.props.route.params.email).orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posts=[]
            docs.forEach (doc => {
                posts.push ({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            this.setState({
                posts: posts,
                loading:false
            }, () => console.log(this.state))
        })
    }

    render () {
        return (
            <View style={StyleSheet.container}>
                <Image
                    style={StyleSheet.foto}
                    source={this.state.user[0].data.photo}
                />
                 <Text style={styles.text}>{this.state.owner}</Text>
                <Text style={styles.text} >{this.state.userName}</Text>
                <Text style={styles.text} >{this.state.bio}</Text>

                
                <Text>{this.state.userName}</Text>
                {
                    this.state.loading ? <Text></Text> : 
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <Post posts={item}/>}
                    />

                    
                }
            </View>
        )
    }
}

export default OtroPerfil;