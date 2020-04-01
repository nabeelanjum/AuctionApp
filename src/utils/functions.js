import {
  // Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default {

  async getAuctions() {
    let auctions = await AsyncStorage.getItem('auctions');
    console.log(auctions);
    if (auctions === null) {
      return [];
    } else {
      auctions = JSON.parse(auctions);
      return auctions;
    }
  },



  async saveAuction(auction) {
    let auctions = await this.getAuctions();
    auctions.push(auction);
    auctions = JSON.stringify(auctions);
    console.log(auctions);
    await AsyncStorage.setItem('auctions', auctions);
  }

};
