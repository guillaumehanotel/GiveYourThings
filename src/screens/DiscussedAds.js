import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button, SafeAreaView, ScrollView, ActivityIndicator, Image, Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../store/auth/actions';
import {fetchAdsByUserIdAndState} from '../utils/requests';
import Globals from '../Globals';


class DiscussedAds extends Component {

  static navigationOptions = {
    title: 'Messages',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      onlineDiscussedAds: null,
      reservedDiscussedAds: null,
      finalizedDiscussedAds: null,
    };
  }

  async componentDidMount() {
    const onlineDiscussedAds = await fetchAdsByUserIdAndState(this.state.user.id, Globals.ADS_STATE.ONLINE);
    const reservedDiscussedAds = await fetchAdsByUserIdAndState(this.state.user.id, Globals.ADS_STATE.RESERVED);
    const finalizedDiscussedAds = await fetchAdsByUserIdAndState(this.state.user.id, Globals.ADS_STATE.FINALIZED);
    this.setState({
      onlineDiscussedAds: onlineDiscussedAds,
      reservedDiscussedAds: reservedDiscussedAds,
      finalizedDiscussedAds: finalizedDiscussedAds,
    });
  }

  render() {

    const onlineDiscussedAds = this.state.onlineDiscussedAds;
    const reservedDiscussedAds = this.state.reservedDiscussedAds;
    const finalizedDiscussedAds = this.state.finalizedDiscussedAds;

    if (onlineDiscussedAds === null || reservedDiscussedAds === null || finalizedDiscussedAds === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">

          <View style={styles.discussedAdsBoxTitle}>
            <Text style={styles.discussedAdsTextTitle}>DONS EN LIGNE ({onlineDiscussedAds.length})</Text>
          </View>

          {onlineDiscussedAds.map(ad => (
            <TouchableOpacity key={ad.id} onPress={() => this.props.navigation.navigate('AdDiscussion', {adId: ad.id, title: ad.title})}>
              <View style={styles.discussedAds}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 50, marginLeft: 15}}
                  source={{uri: 'https://img0.leboncoin.fr/ad-image/12455473de9f952252e8cb02d3bd4debd09d7d42.jpg'}}
                />
                <Text style={styles.discussedAdsText}>{ad.title}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.discussedAdsBoxTitle}>
            <Text style={styles.discussedAdsTextTitle}>DONS RÉSERVÉS ({reservedDiscussedAds.length})</Text>
          </View>
          {reservedDiscussedAds.map(ad => (
            <TouchableOpacity key={ad.id} onPress={() => this.props.navigation.navigate('AdDiscussion', {adId: ad.id, title: ad.title})}>
              <View style={styles.discussedAds}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 50, marginLeft: 15}}
                  source={{uri: 'https://img0.leboncoin.fr/ad-image/12455473de9f952252e8cb02d3bd4debd09d7d42.jpg'}}
                />
                <Text style={styles.discussedAdsText}>{ad.title}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.discussedAdsBoxTitle}>
            <Text style={styles.discussedAdsTextTitle}>DONS FINALISÉS ({finalizedDiscussedAds.length})</Text>
          </View>
          {finalizedDiscussedAds.map(ad => (
            <TouchableOpacity key={ad.id} onPress={() => this.props.navigation.navigate('AdDiscussion', {adId: ad.id, title: ad.title})}>
              <View style={styles.discussedAds}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 50, marginLeft: 15}}
                  source={{uri: 'https://img0.leboncoin.fr/ad-image/12455473de9f952252e8cb02d3bd4debd09d7d42.jpg'}}
                />
                <Text style={styles.discussedAdsText}>{ad.title}</Text>
              </View>
            </TouchableOpacity>
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

export default connect(mapStateToProps, null)(DiscussedAds);

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
  discussedAdsBoxTitle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E4E4E4',
    height: 50,
  },
  discussedAdsTextTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
  },
});
