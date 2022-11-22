import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'; 
import Home from '../screens/Home/Home'
import Posts from '../screens/Posts/Posts'
import Profile from '../screens/Profile/Profile';
import Search from '../screens/Search/Search';

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


       <Tab.Screen name='Profile' component={Profile} options={{
          tabBarIcon: () =>  <FontAwesome name='user' color={'black'} size={32}/>,
          headerShown: false
        }}/>
        <Tab.Screen name='Search' component={Search} options={{
          tabBarIcon: () => <FontAwesome name='search' color={'black'} size={32}/>,
          headerShown: false
        }} />
        

    </Tab.Navigator>
  )
}

export default TabNavigation 