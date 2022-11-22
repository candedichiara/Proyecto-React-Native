import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login/Login'
import Register from '../screens/Register/Register'
import TabNavigation from './TabNavigation'
import Comments from '../screens/Comments/Comments'
import OtroPerfil from '../screens/OtroPerfil/OtroPerfil'
import EditProfile from '../screens/editProfile/editProfile'



const Stack = createNativeStackNavigator()

class MainNavigation extends Component {

    render() {

        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='Login'
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name='Register'
                        component={Register}
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name='TabNavigation'
                        component={TabNavigation}
                        options={{
                            headerShown: false
                        }}

                    />

                    <Stack.Screen
                        name='Comments'
                        component={Comments}
                        options={{
                            
                        }}
                    />

                    <Stack.Screen
                        name='OtroPerfil'
                        component={OtroPerfil}
                        options={{
                        }}
                    />

                    <Stack.Screen
                        name='EditProfile'
                        component={EditProfile}
                        options={{
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


export default MainNavigation