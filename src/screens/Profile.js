import React, {Component} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchUserById} from '../utils/requests';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const userId = this.props.navigation.getParam('userId');
    const user = await fetchUserById(userId);
    this.setState({
      user: user,
    });
  }

  render() {
    const user = this.state.user;

    if (user === null) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.full_screen}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.profil}>
            <Image source={{uri: user.photoUrl}} style={{width: 200, height: 200}}/>
          </View>
          <Text>{user.username}</Text>

          {/*<View style={styles.donations_list}>*/}
          {/*  <FlatList*/}
          {/*    data={this.state.data}*/}
          {/*    renderItem={({item}) => <Donations donation={item} navigateToProfilPage={this.navigateToProfilPage}/>}*/}
          {/*    keyExtractor={donation => donation.id}*/}
          {/*    numColumns={2}*/}
          {/*    nestedScrollEnabled={true}*/}
          {/*    scrollEnabled={true}*/}
          {/*  />*/}
          {/*</View>*/}

        </ScrollView>

      </SafeAreaView>
    );
  }

}

{/*<View>*/
}
{/*  <Text>Profil</Text>*/
}
{/*  <Text>Username : {user.username}</Text>*/
}
{/*  <Text>Firstname : {user.firstname}</Text>*/
}
{/*  <Text>Lastname : {user.lastname}</Text>*/
}
{/*  <Text>Email : {user.email}</Text>*/
}
{/*  <Image style={{width: 200, height: 200}} source={{uri: user.photoUrl}}/>*/
}
{/*  */
}
{/*</View>*/
}


const styles = StyleSheet.create({
  full_screen: {
    flex: 3,
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 2,
  },
  profil: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  profil_picture: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  paragraph: {
    fontSize: 12,
  },
  user_informations: {
    flex: 1,
    color: 'blue',
    marginLeft: 50,
  },
  contact_button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
    padding: 4,
    width: 120,
  },
  contact_button_text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  contact: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: 20,
  },
  presentation: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 30,
  },
  free_donations_group: {
    flex: 3,
    flexDirection: 'row',
    marginLeft: 65,
    marginTop: 30,
    width: 150,
  },
  blank: {
    flex: 1,
  },
  free_donations: {
    marginTop: 15,
    color: 'blue',
    flex: 1,
    textAlign: 'center',
  },
  donations_list: {
    flex: 0.4,
    flexDirection: 'row',
    marginLeft: 45,
  },
  Drop: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  first_annonce: {
    flex: 1,
  },
});


export default connect(null, null)(Profile);
