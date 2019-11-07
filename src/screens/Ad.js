import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableHighlight,
  Button,
  ActivityIndicator,
  StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import GLOBALS from '../Globals';
import {fetchAdById, fetchCategoryById, fetchUserById} from '../utils/requests';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatAdDate} from '../utils/helpers';

class Ad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ad: null,
      user: null,
      category: null,
    };
  }

  async componentDidMount() {
    const adId = this.props.navigation.getParam('adId');
    const ad = await fetchAdById(adId);
    const user = await fetchUserById(ad.user_id);
    const category = await fetchCategoryById(ad.category_id);
    this.setState({
      user: user,
      ad: ad,
      category: category,
    });
  }

  render() {
    const ad = this.state.ad;
    const user = this.state.user;
    const category = this.state.category;

    if (ad === null || user === null || category === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    const adDate = formatAdDate(ad);

    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">

          <Image
            style={{width: Dimensions.get('window').width, height: 250}}
            source={{uri: 'https://img0.leboncoin.fr/ad-image/12455473de9f952252e8cb02d3bd4debd09d7d42.jpg'}}
          />
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity style={styles.contact_btn}
                              onPress={() => this.props.navigation.navigate('ChatPage', {ownerID: ad && ad.user_id})}>
              <Text style={styles.contact_text}>CONTACTER LE DONNEUR</Text>
            </TouchableOpacity>
          </View>

          <View style={{
            flex: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 0,
          }}>
            <Icon style={{marginRight: 10, bottom: 5}} name="home" size={25} type='font-awesome'/>
            <Text style={{fontSize: 16}}>Don</Text>

            <View style={{
              borderLeftWidth: 1,
              borderLeftColor: '#ccc',
              marginLeft: 30,
              marginRight: 30,
            }}><Text></Text></View>

            <Icon style={{marginRight: 10, bottom: 5}} name="clock-o" size={25} type='font-awesome'/>
            <Text style={{fontSize: 16}}>{adDate}</Text>

            <View style={{
              borderLeftWidth: 1,
              borderLeftColor: '#ccc',
              marginLeft: 30,
              marginRight: 30,
            }}><Text></Text></View>

            <Text style={{fontSize: 16}}>{ad.condition}</Text>
          </View>


          <View style={{marginTop: 15, marginLeft: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 26}}>{ad.title}</Text>

            <View style={{flex: 1, flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row', marginTop: 0}}>
              <Icon style={{marginRight: 10, bottom: 5}} name="folder" size={16} type='font-awesome' color={'#EF565A'}/>
              <Text style={{}}>{category.label}</Text>
            </View>

            <Text style={{fontSize: 18, marginTop: 10}}>{ad.description}</Text>
          </View>

          <View style={{
            flex: 1,
            flexWrap: 'wrap',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 20,
            marginRight: 20,
          }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', marginRight: 10}}>{user.username}</Text>
            <Image style={{width: 50, height: 50, borderRadius: 50}} source={{uri: user.photoUrl}}/>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }

}

export default withNavigation(Ad);


const styles = StyleSheet.create({
  contact_btn: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EF565A',
    width: 250,
    height: 50,
    // position: 'absolute',
    bottom: 25,
    borderRadius: 50,
  },
  contact_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 17,
  },
});
