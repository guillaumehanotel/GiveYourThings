import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native';
import {
  fetchAdById,
  fetchCategoryById,
  fetchUserById,
  postDiscussion,
} from '../utils/requests';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formatAdDate} from '../utils/helpers';
import {connect} from 'react-redux';

class Ad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      ad: null,
      giver: null,
      category: null,
    };
  }

  async componentDidMount() {
    const adId = this.props.navigation.getParam('adId');
    const ad = await fetchAdById(adId);
    const giver = await fetchUserById(ad.user_id);
    const category = await fetchCategoryById(ad.category_id);
    this.setState({
      giver: giver,
      ad: ad,
      category: category,
    });
  }

  openDiscussion = async () => {
    const user = this.state.user;

    const response = await postDiscussion(user.id, this.state.ad.id);
    let error = await response.text();
    console.log(error)
    console.log(response.status)
    if (response.status === 201 || response.status === 200) {

      console.log(response.headers)
      const discussionId = response.headers.map.location.split('/').pop();

      this.props.navigation.navigate('Discussion', {
        discussionId: discussionId,
        requesterId: user.id,
        requesterUsername: user.username,
        requesterAvatar: user.photoUrl,
        title: this.state.ad.title,
      });
    }
  };

  render() {
    const ad = this.state.ad;
    const giver = this.state.giver;
    const category = this.state.category;

    if (ad === null || giver === null || category === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    const adDate = formatAdDate(ad);

    const isMyAd = ad.user_id === this.state.user.id;
    const isReserved = ad.booker_id !== null;

    return (

      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">

          <Image
            style={{width: Dimensions.get('window').width, height: 250}}
            source={{uri: 'https://img0.leboncoin.fr/ad-image/12455473de9f952252e8cb02d3bd4debd09d7d42.jpg'}}
          />
          <View style={{flex: 1, alignItems: 'center'}}>
            {isMyAd ?
              <TouchableOpacity style={styles.contact_btn}
                                onPress={() => this.props.navigation.navigate('AdDiscussion', {
                                  adId: ad.id,
                                  title: ad.title,
                                })}>
                <Text style={styles.contact_text}>VOIR MESSAGES</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.contact_btn} onPress={this.openDiscussion}>
                <Text style={styles.contact_text}>CONTACTER LE DONNEUR</Text>
              </TouchableOpacity>
            }
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
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 26}}>{ad.title}</Text>
              {isReserved &&
                <Text style={{marginLeft: 150, fontSize: 17, color: '#EF565A'}}>Réservé</Text>
              }
            </View>

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
            <Text style={{fontSize: 17, fontWeight: 'bold', marginRight: 10}}>{giver.username}</Text>
            <Image style={{width: 50, height: 50, borderRadius: 50}} source={{uri: giver.photoUrl}}/>
          </View>

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

export default connect(mapStateToProps, null)(Ad);


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
