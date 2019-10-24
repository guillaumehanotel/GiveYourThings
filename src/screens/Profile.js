import React, {Component} from 'react';
import {View, Button, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../store/auth/actions';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  signOut = () => {
    this.props.logout();
    this.props.navigation.navigate('GoogleAuthentification');
  };

  render() {
    const user = this.props.user;

    return (
      <View>
        <Text>Profil</Text>
        <Text>Username : {user.username}</Text>
        <Text>Firstname : {user.firstname}</Text>
        <Text>Lastname : {user.lastname}</Text>
        <Text>Email : {user.email}</Text>
        <Image style={{width: 200, height: 200}} source={{uri: user.photoUrl}}/>
        <Button onPress={this.signOut} title="Logout"/>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
