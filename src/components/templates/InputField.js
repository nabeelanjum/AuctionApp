import React, { Component } from 'react';
import {
  TextInput,
  Platform,
} from 'react-native';
import {deviceHeight, colors} from '../../utils/constants';

export default class InputField extends Component<{}> {

  focus() {
    this._field.focus();
  }

  blur() {
    this._field.blur();
  }

  render() {
    return(
      <TextInput
        {...this.props}
        ref={(c) => this._field = c}
        autoCorrect={false}
        placeholderTextColor={colors.GREY}
        autoCapitalize={this.props.autoCapitalize || 'none'}
        returnKeyType={this.props.returnKeyType || 'next'}
        style={[styles.textInput, this.props.style]}
      />
    );
  }
}

const styles = {
  textInput: {
    height: deviceHeight/12,
    maxHeight: 55,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'grey',
    color: 'black',
    // shadowOpacity: .25,
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    padding: 10,
    fontSize: deviceHeight/48,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : undefined,
  },
};
