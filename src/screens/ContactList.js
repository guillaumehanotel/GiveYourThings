import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,

} from 'react-native';
import {connect} from 'react-redux';

class ContactList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: this.props.user,
    };
  }

  onChangeText = name => this.setState({ name });

  onPress = () => {
    this.props.navigation.navigate('Chat', { name: this.state.name });
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          onChangeText={this.onChangeText}
          style={styles.nameInput}
          placeHolder="John Cena"
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const offset = 24;
const styles = StyleSheet.create({
  nameInput: { // 3. <- Add a style for the input
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  title: { // 4.
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  buttonText: { // 5.
    marginLeft: offset,
    fontSize: offset,
  },
});

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};


export default connect(mapStateToProps, null)(ContactList);
