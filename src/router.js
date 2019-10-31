import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import GoogleAuthentification from './screens/GoogleAuthentification';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import AdsList from './screens/AdsList';
import Ad from './screens/Ad';
import Map from './screens/Map';
import CreateAd from './screens/CreateAd';
import Chat from './screens/Chat';
import ContactList from './screens/ContactList';
import Profile from './screens/Profile';
import Loading from './screens/Loading';
import MyProfile from './screens/MyProfile';


const adsStack = createStackNavigator({
    AdsList,
    Ad,
    Profile,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AdsList',
    headerLayoutPreset: 'center',
  },
);

adsStack.navigationOptions = {
  title: 'Annonces',
  tabBarIcon: ({tintColor}) => <Icon name="newspaper-o" size={25} type='font-awesome' color={tintColor}/>,
};

const chatStack = createStackNavigator({
  ContactList,
  Chat,
  },
  {
    initialRouteName: 'ContactList'
});

chatStack.navigationOptions = {
  title: 'Messages',
  tabBarIcon: ({tintColor}) => (
    <Icon name="comment-o" size={25} type='font-awesome' color={tintColor}/>
  ),
};

Map.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Icon name="map" size={25} type='font-awesome' color={tintColor}/>,
};

CreateAd.navigationOptions = {
  title: 'Créer',
  tabBarIcon: ({tintColor}) => <Icon name="plus" size={25} type='font-awesome' color={tintColor}/>,
};

MyProfile.navigationOptions = {
  title: 'Profil',
  tabBarIcon: ({tintColor}) => <Icon name="user" size={25} type='font-awesome' color={tintColor}/>,
};

const bottomTabNavigator = createBottomTabNavigator({
  adsStack,
  Map,
  CreateAd,
  chatStack,
  MyProfile,
}, {
  tabBarOptions: {
    showIcon: true,
  },
});

const switchNavigator = createSwitchNavigator({
  Loading,
  GoogleAuthentification,
  AdsList: bottomTabNavigator,
});

export const RootContainer = createAppContainer(switchNavigator);
