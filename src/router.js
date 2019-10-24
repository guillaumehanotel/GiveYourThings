import AdsList from './screens/AdsList';
import Ad from './screens/Ad';
import Map from './screens/Map';
import CreateAd from './screens/CreateAd';
import Chat from './screens/Chat';
import Profile from './screens/Profile';
import Loading from './screens/Loading';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import GoogleAuthentification from './screens/GoogleAuthentification';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchGoogleUser} from './store/auth/actions';

const adsStack = createStackNavigator({
    AdsList,
    Ad,
  },
  {
    headerMode: 'none',
  },
);

adsStack.navigationOptions = {
  title: 'Objets',
  tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={32} color={tintColor}/>,
};

Map.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={32} color={tintColor}/>,
};

CreateAd.navigationOptions = {
  title: 'Créer',
  tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={32} color={tintColor}/>,
};

Chat.navigationOptions = {
  title: 'Message',
  tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={32} color={tintColor}/>,
};

Profile.navigationOptions = {
  title: 'Profil',
  tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={32} color={tintColor}/>,
};

const bottomTabNavigator = createBottomTabNavigator({
  adsStack,
  Map,
  CreateAd,
  Chat,
  Profile,
});

const switchNavigator = createSwitchNavigator({
  Loading,
  GoogleAuthentification,
  AdsList: bottomTabNavigator
});

export const RootContainer = createAppContainer(switchNavigator);
