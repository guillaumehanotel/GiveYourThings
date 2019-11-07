import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {fetchUserById} from '../utils/requests';

class UserDiscussionItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: this.props.discussion,
      requester: null,
      adTitle: this.props.adTitle,
    };
  }

  async componentDidMount() {
    const requester = await fetchUserById(this.state.discussion.requester_id);
    this.setState({
      requester: requester,
    });
  }

  render() {

    const discussion = this.state.discussion;
    const requester = this.state.requester;

    if (requester === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Discussion', {
        discussionId: discussion.id,
        requesterId: requester.id,
        requesterUsername: requester.username,
        requesterAvatar: requester.photoUrl,
        title: this.state.adTitle,
      })}>
        <View style={styles.discussedAds}>
          <Image
            style={{width: 50, height: 50, borderRadius: 50, marginLeft: 15}}
            source={{uri: requester.photoUrl}}
          />
          <Text style={styles.discussedAdsText}>{requester.username}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}


export default withNavigation(UserDiscussionItem);


const styles = StyleSheet.create({
  discussedAds: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: '#aaa',

  },
  discussedAdsText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

