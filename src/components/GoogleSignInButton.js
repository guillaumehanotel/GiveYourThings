import {PureComponent} from 'react';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const googleIconPath = '../assets/google_icon.png';

export default class GoogleSignInButton extends PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.touchable} {...this.props}>
        <View style={styles.content}>
          <Image source={require(googleIconPath)} style={styles.icon}/>
          <Text style={styles.text}>Se connecter avec Google</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
    shadowOffset: {width: 0, height: 2},
    overflow: 'visible',
    shadowColor: 'black',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {width: 24, aspectRatio: 1},
  text: {color: 'gray', marginLeft: 12, fontSize: 16, fontWeight: '600'},
});
