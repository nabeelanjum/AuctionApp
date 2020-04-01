import React, { Component } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CustomText from './CustomText';
import {deviceHeight, colors} from '../../utils/constants';

export default class LoadingButton extends Component {

  state = {
      isLoading: false,
  };

  showLoading(isLoading) {
    this.setState({ isLoading });
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={!this.state.isLoading ? this.props.onPress : null} style={[styles.button, this.props.style]} >
        {
          this.state.isLoading
          ? <ActivityIndicator size="small" color={this.props.loadingColor || '#F26322'} />
          : <CustomText style={[styles.title, this.props.titleStyle]} >{this.props.title}</CustomText>
        }
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    height: deviceHeight/12,
    maxHeight: 55,
    width: '100%',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    backgroundColor:  colors.BLUE,
    borderRadius: 50,
    elevation: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
  }
};
