import React, {Component} from 'react';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect, Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import store from './src/store/store';
import {RootContainer} from './src/router';
import NavigationService from './src/utils/NavigationService';

class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Provider store={store}>
          <RootContainer ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}/>
          <FlashMessage position="top"/>
        </Provider>
      </View>
    );
  }
}

export default App;

