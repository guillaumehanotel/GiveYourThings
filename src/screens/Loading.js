import React, {Component} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in';
import {connect} from 'react-redux';
import {fetchGoogleUser} from '../store/auth/actions';

/**
 * 1er Composant chargé de l'application, celui-ci sert à tester si l'utilisateur est connecté ou non
 * Si il n'est pas connecté, il est redirigé vers l'authentification Google
 * Si il est connecté, on teste si le user est dans le store,
 * si ce n'est pas le cas, on le charge
 */
class Loading extends Component {

  constructor(props) {
    super(props);
    GoogleSignIn.isConnectedAsync().then((isConnected) => {
      if (isConnected) {
        if(this.props.user === null) {
          this.props.dispatch(fetchGoogleUser())
        } else {
          props.navigation.navigate('AdsList');
        }
      } else {
        props.navigation.navigate('GoogleAuthentification');
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <View><Text>Error! {error.message}</Text></View>;
    }

    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    error: state.auth.error
  }
};

export default connect(mapStateToProps, null)(Loading)
