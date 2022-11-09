import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'; 
import Posts from '../screens/Posts/Posts'

const Tab = createBottomTabNavigator()

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: () => <FontAwesome name='home' color={'black'} size={32} />,
          headerShown: false
        }}
      />

      <Tab.Screen 
      name='Posts' 
      component={Posts}  
      options={{
          tabBarIcon: () => <Entypo name="images" size={24} color="black" />,
          headerShown: false
        }}/>


      {/*  <Tab.Screen name='Profile' component={Profile} />
         */}

    </Tab.Navigator>
  )
}

export default TabNavigation 