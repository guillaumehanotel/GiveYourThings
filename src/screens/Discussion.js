import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';
import {ActivityIndicator, View} from 'react-native';
import {fetchDiscussionRepliesByDiscussionId, postReply} from '../utils/requests';


class Discussion extends Component {

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      discussionId: null,
      user: this.props.user,
      messages: null,
    };
  }

  async componentDidMount() {

    const discussionId = this.props.navigation.getParam('discussionId');
    const requesterId = this.props.navigation.getParam('requesterId');
    const requesterUsername = this.props.navigation.getParam('requesterUsername');
    const requesterAvatar = this.props.navigation.getParam('requesterAvatar');

    const discussionReplies = await fetchDiscussionRepliesByDiscussionId(discussionId);

    let userMapper = new Map();
    userMapper.set(this.state.user.id, {
      _id: this.state.user.id,
      name: this.state.user.username,
      avatar: this.state.user.photoUrl,
    });
    userMapper.set(requesterId, {
      _id: requesterId,
      name: requesterUsername,
      avatar: requesterAvatar,
    });

    let messages = discussionReplies.map(reply => {
      return {
        _id: reply.id,
        text: reply.message,
        createdAt: reply.created_at,
        user: userMapper.get(reply.user_id),
      };
    });

    this.setState({
      discussionId: discussionId,
      messages: messages,
    });
  }

  onSend = async (messages = []) => {
    const message = messages[0].text;
    const response = await postReply(this.state.discussionId, this.state.user.id, {message: message});
    if (response.status === 201) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages[0]),
      }));
    } else {
      console.error("Fail to send message")
    }
  };

  render() {

    const messages = this.state.messages;

    if (messages === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Discussion);
