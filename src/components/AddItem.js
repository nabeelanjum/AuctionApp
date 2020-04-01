import React, { Component } from 'react';
import {
  View,
  Alert,
} from 'react-native';
import InputField from './templates/InputField';
import LoadingButton from './templates/LoadingButton';
import {deviceHeight} from '../utils/constants';

export default class AddItem extends Component<{}> {

  navigate = this.props.navigation.navigate;

  state = {
    itemName: '',
    itemPrice: '',
  }

  addItem = () => {
    const {itemName, itemPrice} = this.state;
    if (itemName === '' || itemPrice === '') { Alert.alert('All fields are required'); return; }
    const item = {
      name: itemName,
      price: itemPrice,
    };
    // this.setState({itemName: '', itemPrice: ''});
    this.navigate('AddParticipants', {item});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'space-around', paddingHorizontal: 20, paddingBottom: deviceHeight/3}}>
        <InputField onChangeText={(t) => this.setState({itemName: t})} autoCapitalize={'words'} onSubmitEditing={() => this._price.focus()} placeholder='Item Name' />
        <InputField ref={(c) => this._price = c} onChangeText={(t) => this.setState({itemPrice: t})} keyboardType={'numeric'} returnKeyType='done' placeholder='Item Price' />
        <LoadingButton onPress={this.addItem} title='Add' />
      </View>
    );
  }
}
