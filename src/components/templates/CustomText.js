import React, { Component } from 'react';
import {
  Text,
  Platform,
} from 'react-native';
import {deviceHeight} from '../../utils/constants';

export default class CustomText extends Component<{}> {

  render() {
    return(
      <Text
        {...this.props}
        allowFontScaling={false}
        style={[styles.text, this.props.style]}
      />
    );
  }
}

const styles = {
  text: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: '300',
    fontSize: deviceHeight/45,
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
  },
};
