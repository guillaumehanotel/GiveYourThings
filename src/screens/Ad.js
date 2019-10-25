import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image, TouchableHighlight, Button, ActivityIndicator} from 'react-native';
import {withNavigation} from 'react-navigation';
import GLOBALS from '../Globals';
import {fetchAdById, fetchUserById} from '../utils/requests'

class Ad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ad: null,
      user: null
    };
  }

  async componentDidMount() {
    const adId = this.props.navigation.getParam('adId');
    const ad = await fetchAdById(adId);
    const user = await fetchUserById(ad.user_id);
    this.setState({
      user: user,
      ad: ad
    })
  }

  render() {
    const ad = this.state.ad;
    const user = this.state.user;

    if(ad === null || user === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">

          <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
            <Text style={{flex: 1}}/>
            <Image
              style={{flex: 1, width: 200, height: 200}}
              source={{uri: 'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg'}}
            />
            <Text style={{flex: 1}}/>
          </View>

          <Text style={{textAlign: 'center', color: 'blue', fontWeight: 'bold', fontSize: 23, marginTop: 10}}>
            {ad.title}
          </Text>

          {/*<Text style={{textAlign: 'center', color: 'blue', marginTop: 10}}>*/}
          {/*  {ad.localisation}*/}
          {/*</Text>*/}

          <Text style={{textAlign: 'center', color: 'blue', marginTop: 10}}>
            {ad.description}
          </Text>

          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Profile', {userId: ad.user_id})}>
              <Image style={{width: 200, height: 200}}
                     source={{uri: user.photoUrl }}/>
            </TouchableHighlight>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <Text style={{flex: 1}}/>
            <Button
              style={{flex: 1}}
              title={'Contacter le vendeur'}
              onPress={() => this.props.navigation.navigate('ChatPage', {ownerID: ad && ad.user_id})}
            />
            <Text style={{flex: 1}}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

}


export default withNavigation(Ad)
