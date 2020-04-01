import React, { Component } from 'react';
import {
  View,
  FlatList,
  Alert,
} from 'react-native';
import InputField from './templates/InputField';
import LoadingButton from './templates/LoadingButton';
import CustomText from './templates/CustomText';
import Dialog, { SlideAnimation } from 'react-native-popup-dialog';
import {deviceHeight, colors} from '../utils/constants';

export default class Auction extends Component<{}> {

  auction = this.props.navigation.state.params.auction;

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <CustomText>{this.auction.item.name}
          </CustomText><CustomText>{this.auction.item.price}</CustomText>
        </View>
      </View>
    );
  }
}
