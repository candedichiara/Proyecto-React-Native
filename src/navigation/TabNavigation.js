import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import {FontAwesome} from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name={'Home'} 
        component={Home}
        options={{
            tabBarIcon: () => <FontAwesome name='home' color={'pink'} size={32} />,
            headerShown:false
        }}
        />
        <Tab.Screen name='Profile' component={Profile} />
        <Tab.Screen name='Posts' component={Posts} />
    </Tab.Navigator>
  )
}

export default TabNavigation 