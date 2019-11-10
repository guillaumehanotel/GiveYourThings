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
import {fetchAdsByUserId, fetchAllAds} from '../utils/requests';
import {SearchBar} from 'react-native-elements';


export default class AdsList extends Component {

  static navigationOptions = {
    title: 'Dons',
  };

  constructor(props) {
    super(props);
    this.state = {
      adsList: [],
      refreshing: true,
      dataSearching: [],
      search: '',
    };
    this.navigateToAd = (adId) => {
      this.props.navigation.navigate('Ad', {adId: adId});
    };
  }

  async componentDidMount() {
    const adsOwnerId = this.props.navigation.getParam('adsOwnerId');
    let ads = [];
    if (adsOwnerId !== null) {
      ads = await fetchAdsByUserId(3);
    } else {
      ads = await fetchAllAds();
    }

    this.setState({
      adsList: ads,
      refreshing: false,
    });
  }

  SearchFilterFunction(text) {
    const newData = this.state.adsList.filter(item => {
      let itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      itemData = itemData.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const textData = (text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSearching: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View style={{
        height: 0.3,
        width: '100%',
        backgroundColor: '#080808',
      }}/>);
  };

  renderSearchResults(item, adID) {
    return (
      <View style={{borderTopColor: '#000', borderTopWidth: 0.5, borderBottomColor: '#000', borderBottomWidth: 0.5}}>
        <Text style={{padding: 10, fontSize: 15}} onPress={() => this.navigateToAd(adID)}>
          {item.title}
        </Text>
      </View>
    );
  }

  onScrollHandler = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.addRecords(this.state.page);
    });
  };

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

      const {search} = this.state;

      return (
        <SafeAreaView>

          <SearchBar
            placeholder="Chercher une annonce..."
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.search}
            round
            autoCorrect={false}
            lightTheme={true}
          />

          <View style={{marginTop: 20}}>
            <FlatList style={{
              position: 'absolute',
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
                      data={this.state.adsList}
                      renderItem={({item}) => <AdItem ad={item}/>}
                      keyExtractor={item => item.id}
                      numColumns={2}
                      nestedScrollEnabled={true}
                      scrollEnabled={true}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this.onRefresh}/>
                      }/>
          </View>

          <View style={{backgroundColor: 'white'}}>
            {this.state.search ?
              <FlatList
                data={this.state.dataSearching}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={({item}) => (
                  this.renderSearchResults(item, item.id)
                )}
                enableEmptySections={true}
                style={{bottom: 20}}
                keyExtractor={(item, index) => index.toString()}
              />
              : null}
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
