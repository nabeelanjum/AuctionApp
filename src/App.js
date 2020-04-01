import React, { Component } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import AppContainer from './utils/router';

export default class App extends Component<{}> {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <AppContainer />
      </View>
    );
  }
}
