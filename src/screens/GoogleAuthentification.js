import * as GoogleSignIn from 'expo-google-sign-in';
import React, {Component} from 'react';
import {View} from 'react-native';
import GoogleSignInButton from '../components/GoogleSignInButton';
import {connect} from 'react-redux';
import {fetchGoogleUser} from '../store/auth/actions';

class GoogleAuthentification extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      await GoogleSignIn.initAsync();
      this.props.dispatch(fetchGoogleUser());
    } catch ({message}) {
      alert('GoogleSignIn.initAsync(): ' + message);
    }
  }

  signIn = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const {type, user} = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this.props.dispatch(fetchGoogleUser());
      }
      this.props.navigation.navigate('AdsList');
    } catch ({message}) {
      alert('login: Error:' + message);
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <GoogleSignInButton onPress={this.signIn}/>
      </View>
    );
  }
}

export default connect(null, null)(GoogleAuthentification);
