import React, {Component} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  PermissionsAndroid,
  Picker,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchAddressByCoordinate, fetchAllCategories, postAd} from '../utils/requests';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-picker/src';

class CreateAd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      user: this.props.user,
      itemName: null,
      categories: [],
      formAd: {
        title: null,
        description: null,
        type: 'Don',
        condition: null,
        localisation: null,
        category_id: null,
        latitude: null,
        longitude: null,
      },
    };
  }

  async componentDidMount() {
    const categories = await fetchAllCategories();
    this.setState({
      categories: categories.map((category) => {
        return {
          id: category.id,
          name: category.label,
        };
      }),
    });
    this.getCurrentPosition();
  }

  askLocationPermission = async () => {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'GiveYourThings Location Permission',
        'message': 'GiveYourThings App needs access to your location ',
      },
    );
  };

  getCurrentPosition = async () => {
    try {
      const granted = await this.askLocationPermission();

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        Geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.getAddress(latitude, longitude);
          },
          (error) => {
            console.log(error.code, error.message);
          }, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      } else {
        console.log('Location Permission Not Granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  getAddress = async (latitude, longitude) => {
    try {
      const localisation = await fetchAddressByCoordinate(latitude, longitude);
      this.setState({
        formAd: {
          localisation: localisation,
          longitude: longitude,
          latitude: latitude,
        }
      });
    } catch (error) {
      console.warn(error);
    }
  };

  createAd = async () => {
    const response = await postAd(this.state.user.id, this.state.photo, {...this.state.formAd, type: 'Don'});
    if (response.status === 201) {
      console.log('ad created');
    } else {
      if (response.status === 400) {
        const error = await response.json();
        console.log(error);
      } else {
        console.log('fail to create ad');
      }
    }
    this.props.navigation.navigate('AdsList');
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({
          photo: response,
        });
      }
    });
  };

  handleChooseCameraPhoto = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      this.setState({
        photo: response,
      });
    });
  };

  render() {
    const {photo} = this.state;
    const categories = this.state.categories;
    const localisation = this.state.formAd.localisation;

    if (categories.length === 0 || localisation === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <TextInput
            value={this.state.formAd.title}
            onChangeText={value => this.setState({formAd: {...this.state.formAd, title: value}})}
            placeholder="Nom du produit"
          />

          <TextInput
            editable
            maxLength={40}
            value={this.state.formAd.description}
            multiline
            numberOfLines={4}
            onChangeText={value => this.setState({formAd: {...this.state.formAd, description: value}})}
            placeholder="Description"
          />

          <TextInput
            value={this.state.formAd.condition}
            onChangeText={value => this.setState({formAd: {...this.state.formAd, condition: value}})}
            placeholder="État"
          />

          <TextInput
            value={this.state.formAd.localisation}
            onChangeText={value => this.setState({formAd: {...this.state.formAd, localisation: value}})}
            onChange={this.getAddress}
            placeholder="Localisation géographique"
          />

          <Picker
            selectedValue={this.state.categories}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({
                itemName: itemValue,
                formAd: {...this.state.formAd, category_id: itemIndex},
              })
            }>
            <Picker.Item label={this.state.itemName} value={this.state.itemIndex}/>
            {this.state.categories.map(category => <Picker.Item key={category.id}
                                                                label={category.name}
                                                                value={category.name}/>)}
          </Picker>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {photo ? (<Image source={{uri: photo.uri}}
                             style={{width: 200, height: 200}}/>)
              : <Text>Merci de choisir une image</Text>
            }
          </View>

          <View style={{padding: 10}}>
            <Button title="Ouvrir la Galerie" onPress={this.handleChoosePhoto}/>
            <Button title="Prendre une photo" onPress={this.handleChooseCameraPhoto}/>
            <Button title={'Déposer l\'annonce'} onPress={this.createAd}/>
          </View>
        </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  info_button: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
  },
  blank: {
    flex: 1,
  },
  informations: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    color: 'blue',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});


const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(CreateAd);

