import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {formatAdDate} from '../utils/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';

class AdItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ad: this.props.ad,
    };
    this.navigateToAd = (adId) => {
      this.props.navigation.navigate('Ad', {adId: adId});
    };
  }

  render() {
    const ad = this.state.ad;
    const adDate = formatAdDate(ad);
    const is_reserved = ad.booker_id != null;

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => this.navigateToAd(ad.id)}>
          <Image style={styles.img}
                 source={{uri: 'http://vps687959.ovh.net/images/plante.jpg'}}/>
        </TouchableOpacity>
        <View style={styles.item_footer}>
          {is_reserved && <View style={styles.reserved_banner}><Text
            style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>RÉSERVÉ</Text></View>}

          <Text numberOfLines={1} style={{width: 175, fontWeight: 'bold', textAlign: 'center', marginTop: 25}}>
            {ad.title}
          </Text>

          <View style={{flex: 1, flexWrap: 'wrap', alignItems: 'center', flexDirection:'row', justifyContent: 'center', marginTop: 5}}>
            <Icon style={{marginRight: 10, bottom: 5}} name="clock-o" size={16} type='font-awesome' color={'#EF565A'}/>
            <Text>{adDate}</Text>
          </View>

        </View>
      </View>
    );

  }
}

export default withNavigation(AdItem);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 10,
    height: 230,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 0.41,
    elevation: 5,
  },
  img: {
    marginLeft: 5,
    marginTop: 5,
    height: 150,
    width: 150,

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  item_footer: {
    bottom: 10
  },
  reserved_banner: {
    marginLeft: 5,
    backgroundColor: '#EF565A',
    width: 150,
    position: 'absolute'
  },
});
