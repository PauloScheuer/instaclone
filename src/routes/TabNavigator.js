import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import Feed from '../screens/Feed';
import AddPhoto from '../screens/AddPhoto';
import ProfileOrLogin from './StackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Feed" >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={
          {
            tabBarIcon: ({ color }) => {
              return <Icon name="home" size={30} color={color} />
            }
          }
        }
      />
      <Tab.Screen
        name="Add"
        component={AddPhoto}
        options={
          {
            tabBarIcon: ({ color }) => {
              return <Icon name="camera" size={30} color={color} />
            }
          }
        }
      />
      <Tab.Screen
        name="Profile"
        component={ProfileOrLogin}
        options={
          {
            tabBarIcon: ({ color }) => {
              return <Icon name="user" size={30} color={color} />
            }
          }
        }
      />
    </Tab.Navigator >
  );
}
export default TabNavigator;