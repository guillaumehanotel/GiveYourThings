import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {fetchOnlineAds} from '../utils/requests';


export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ads: null,
    };
  }

  async componentDidMount() {
    let ads = await fetchOnlineAds();
    ads = ads.filter(ad => {
      if (ad.latitude !== null && ad.longitude !== null) {
        return ad;
      }
    });
    this.setState({
      ads: ads,
    });
  }

  render() {

    const ads = this.state.ads;

    if (ads === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    let mapStyle = [{'elementType': 'geometry', 'stylers': [{'color': '#242f3e'}]}, {
      'elementType': 'labels.text.fill',
      'stylers': [{'color': '#746855'}],
    }, {
      'elementType': 'labels.text.stroke',
      'stylers': [{'color': '#242f3e'}],
    }, {
      'featureType': 'administrative.locality',
      'elementType': 'labels.text.fill',
      'stylers': [{'color': '#d59563'}],
    }, {
      'featureType': 'poi',
      'elementType': 'labels.text.fill',
      'stylers': [{'color': '#d59563'}],
    }, {
      'featureType': 'poi.park',
      'elementType': 'geometry',
      'stylers': [{'color': '#263c3f'}],
    }, {
      'featureType': 'poi.park',
      'elementType': 'labels.text.fill',
      'stylers': [{'color': '#6b9a76'}],
    }, {'featureType': 'road', 'elementType': 'geometry', 'stylers': [{'color': '#38414e'}]}, {
      'featureType': 'road',
      'elementType': 'geometry.stroke',
      'stylers': [{'color': '#212a37'}],
    }, {
      'featureType': 'road',
      'elementType': 'labels.text.fill',
      'stylers': [{'color': '#9ca5b3'}],
    }, {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [{'color': '#746855'}],
    }, {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [{'color': '#1f2835'}],
    }, {
      'featureType': 'road.highway',
      'elementType': 'labels.text.fill',
      'stylers': [{'color': '#f3d19c'}],
    }, {
      'featureType': 'transit',
      'elementType': 'geometry',
      'stylers': [{'color': '#2f3948'}],
    }, {
      'featureType': 'transit.station',
      'elementType': 'labels.text.fill',
      'stylers': [{'color': '#d59563'}],
    }, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#17263c'}]}, {
      'featureType': 'water',
      'elementType': 'labels.text.fill',
      'stylers': [{'color': '#515c6d'}],
    }, {'featureType': 'water', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#17263c'}]}];

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 44.837789,
            longitude: -0.57918,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
        >

          {ads.map(ad => (
            <Marker
              key={ad.id}
              coordinate={{
                latitude: parseFloat(ad.latitude),
                longitude: parseFloat(ad.longitude),
              }}
              title={ad.title}
              description={ad.description}
            />
          ))}

        </MapView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
