import {Dimensions} from 'react-native';

export const colors = {
  RED: 'rgb(214, 30, 1)',
  GANDAM: 'rgb(197, 179, 140)',
  DARK_BLUE: 'rgb(34, 56, 114)',
  BLUE: 'rgb(20, 130, 171)',
  LIGHT_GREY: 'rgb(200, 200, 200)',
  PURPLE: '#283277',
  WHITE_GREY: 'rgb(247, 247, 247)',
  DIVIDER_GREY: 'rgb(225, 225, 225)',
  WHITE: 'rgb(255, 255, 255)',
  CYAN: 'rgb(76, 189, 191)',
  DARK_GREY: 'rgb(90, 90, 90)',
  GREY: 'rgb(170, 170, 170)',
  ORANGE: '#F26322',
  LIGHT_CYAN: 'cornflowerblue',
  LIGHT_YELLOW: 'rgb(255, 252, 218)',
  YELLOW: 'rgb(254, 196, 0)',
};

export const expressions = {
  email: /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
};

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
