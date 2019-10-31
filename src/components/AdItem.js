import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {formatAdDate} from '../utils/helpers';

class AdItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ad: this.props.ad,
    };
    this.navigateToAd = (adId) => {
      this.props.navigation.navigate('Ad', { adId: adId });
    }
  }

  render() {
    const ad = this.state.ad;
    const adDate = formatAdDate(ad);

    return (
      <View style={{marginLeft: 45}}>
        <TouchableOpacity onPress={ () => this.navigateToAd(ad.id) }>
          <Image style={{width: 120, height: 120}}
                 source={{uri: 'https://aliceasmartialarts.com/wp-content/uploads/2017/04/default-image.jpg'}}/>
        </TouchableOpacity>
        <Text numberOfLines={1} style={{width: 120}}>
          {ad.title}
        </Text>
        <Text>{adDate}</Text>
      </View>
    );

  }
}

export default withNavigation(AdItem);
