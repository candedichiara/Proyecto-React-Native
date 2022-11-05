import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login/Login'
import TabNavigation from './TabNavigation'

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
                        name='TabNavigation'
                        component={TabNavigation}
                        options={{
                            headerShown: false
                        }}
                        
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


export default MainNavigation