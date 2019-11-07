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
  List,
  ScrollView,
} from 'react-native';
import AdItem from '../components/AdItem';
import {fetchAllAds} from '../utils/requests';
import { SearchBar } from 'react-native-elements';

export default class AdsList extends Component {

  static navigationOptions = {
    title: 'Dons',
  };

  constructor(props) {
    super(props);
    this.state = {
      adsList: [],
      dataSearching: [],
      refreshing: true,
      search: '',
    };
    this.navigateToAd = (adId) => {
      this.props.navigation.navigate('Ad', { adId: adId });
    }
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

  SearchFilterFunction(text) {
    const newData = this.state.adsList.filter( item => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSearching: newData,
      search: text,
    })
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderSearchResults(item, adID) {
    return (
      <Text style={{padding: 10}} onPress={() => this.navigateToAd(adID)}>
        {item.title}
      </Text>
    )
  }

  onScrollHandler = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.addRecords(this.state.page);
    });
  }
  
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
      const { search } = this.state;
      return (
        <SafeAreaView>
          <SearchBar
            placeholder="Chercher une annonce..."
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.search}
            round
            autoCorrect={false}
          />
          <View style={{marginTop: 20}}>
            <FlatList style={{position:"absolute"}}
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
          <View style={{backgroundColor: "white"}}>
            {this.state.search ?
              <FlatList
                data={this.state.dataSearching}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                renderItem={({ item }) => (
                  this.renderSearchResults(item, item.id)
                )}
                enableEmptySections={true}
                style={{ marginTop: 10}}
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
