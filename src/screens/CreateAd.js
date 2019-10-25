import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, SafeAreaView, TextInput, ScrollView, Picker} from 'react-native';
import {connect} from 'react-redux';
import {postAd, fetchAllCategories} from '../utils/requests';
import MultiSelect from 'react-native-multiple-select';


class CreateAd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      categories: [],
      formAd: {
        title: null,
        description: null,
        type: 'Don',
        condition: null,
        localisation: null,
        user_id: this.props.user.id,
        category_id: null,
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
  }

  createAd = async () => {
    const response = await postAd(this.state.user.id, this.state.formAd);
    if (response.status === 201) {
      console.log('ad created');
    } else {
      if (response.status === 400) {
        const error = await response.json();
        console.log(error)
      } else {
        console.log('fail to create ad');
      }
    }
    // TODO popup
    this.props.navigation.navigate('AdsList')
  };

  onSelectedItemChange = category_id => {
    this.setState({
      formAd: {...this.state.formAd, category_id: category_id[0]},
    });
  };

  render() {
    const categories = this.state.categories;
    if (categories.length === 0) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
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
            placeholder="Êtat"
          />
          <TextInput
            value={this.state.formAd.localisation}
            onChangeText={value => this.setState({formAd: {...this.state.formAd, localisation: value}})}
            placeholder="Localisation géographique"
          />
        </ScrollView>
        <MultiSelect
          hideTags
          selectText={"Catégorie"}
          items={categories}
          uniqueKey="id"
          ref={(component) => {
            this.multiSelect = component
          }}
          onSelectedItemsChange={this.onSelectedItemChange}
          //selectedItems={this.state.formAd.category_id}
          searchInputPlaceholderText="Choisissez une catégorie"
          displayKey="name"
          submitButtonText="Valider"
          single={true}
        />
        <Text>Catégorie choisie : {this.state.formAd.category_id}</Text>
        <Button title={'Déposer l\'annonce'} onPress={this.createAd}/>
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
});


const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(CreateAd);
