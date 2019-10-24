import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class CreateAd extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

/*  async createAd() {
    const rawResponse = await fetch('http://vps687959.ovh.net/api/ads', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          title: 'Bonnet de la mort',
          description: 'Parce que',
          type: 'Vetements',
          condition: 'Excellent état',
          localisation: null,
          category_id: 1,
          user_id: 2,
        },
      ),
    });
    const content = await rawResponse.json();

    console.log(content);
  }*/

  render() {
    return (
      <View>
        <Text>Create Ad</Text>
      </View>
    );
  }


}
