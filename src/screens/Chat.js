import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import MessageService from '../utils/MessageService';


class Chat extends Component {

  constructor(props) {
    super(props);
    this.messageService = new MessageService(this.props.user);
    this.state = {
      messages: [],
      username: this.props.navigation.getParam('name'),
    };
  }

  componentDidMount() {
    this.messageService.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      })),
    );
  }

  get user() {
    return {
      name: this.props.navigation.getParam('name'),
      _id: MessageService.shared.uid,
    };
  }

  componentWillUnmount() {
    this.messageService.off();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={MessageService.shared.send}
        user={this.user}
      />
    );
  }

}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Chat);
