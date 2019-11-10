import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button, ActivityIndicator, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchAdById, fetchDiscussionsByUserIdAndAdId, fetchUserById} from '../utils/requests';
import UserDiscussionItem from '../components/UserDiscussionItem';

class AdDiscussion extends Component {

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
      user: this.props.user,
      ad: null,
      discussions: null
    };
  }

  async componentDidMount() {
    const adId = this.props.navigation.getParam('adId');
    const ad = await fetchAdById(adId);
    let discussions = await fetchDiscussionsByUserIdAndAdId(this.state.user.id, adId);
    this.setState({
      ad: ad,
      discussions: discussions
    });
  }

  render() {

    const ad = this.state.ad;
    const discussions = this.state.discussions;

    if (ad === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Image
            style={{width: Dimensions.get('window').width, height: 200}}
            source={{uri: ad.image_url}}
          />

          {discussions.map(discussion => (
            <UserDiscussionItem key={discussion.id} discussion={discussion} adTitle={ad.title}/>
          ))}

        </ScrollView>
      </SafeAreaView>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(AdDiscussion);

