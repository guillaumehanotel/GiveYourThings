import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import {connect} from 'react-redux';

class Discussion extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

  }

  render() {
    return (
      <View></View>
    );
  }

}

export default connect(null, null)(Discussion)
