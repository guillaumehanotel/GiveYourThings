import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AdItem from '../components/AdItem';
import {fetchAllAds} from '../utils/requests';

export default class AdsList extends Component {

  static navigationOptions = {
    title: 'Dons',
  };

  constructor(props) {
    super(props);
    this.state = {
      adsList: [],
      refreshing: true,
    };
  }

  async componentDidMount() {
    const ads = await fetchAllAds();
    this.setState({
      adsList: ads,
      refreshing: false,
    });
  }

  onRefresh = async () => {
    const ads = await fetchAllAds();
    this.setState({
      adsList: ads,
      refreshing: false,
    });
  };

  render() {
    if (this.state.refreshing) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }
    if (this.state.adsList.length === 0) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <Text>Aucune annonce disponible</Text>
        </View>
      );
    } else {
      return (
        <SafeAreaView>
          <View style={{marginTop: 20, height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
            <FlatList
              data={this.state.adsList}
              renderItem={({item}) => <AdItem ad={item}/>}
              keyExtractor={item => item.id}
              numColumns={2}
              nestedScrollEnabled={true}
              scrollEnabled={true}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            />
          </View>
        </SafeAreaView>
      );
    }
  }

}

const styles = StyleSheet.create({

  scrollView: {
    backgroundColor: 'white',
  },
});
