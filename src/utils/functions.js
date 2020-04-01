import {
  // Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default {

  async getAuctions() {
    const auctions = await AsyncStorage.getItem('auctions');
    console.log(auctions);
    if (auctions === null) {
      return [];
    } else {
      return auctions;
    }
  },



  async saveAuction() {
    //
  }

};
