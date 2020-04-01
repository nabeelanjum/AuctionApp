import React, { Component } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import functions from '../utils/functions';
import {colors, deviceHeight} from '../utils/constants';
import CustomText from './templates/CustomText';
import LoadingButton from './templates/LoadingButton';

export default class Home extends Component<{}> {

  navigate = this.props.navigation.navigate;

  state = {
    auctions: [],
  }

  getAuctions = async () => {
    const auctions = await functions.getAuctions();
    this.setState({auctions});
  }

  renderAuction(auction) {
    return (
      <View style={styles.auctionView}>
        <CustomText style={[styles.text, {fontSize: deviceHeight/35}]}>{auction.item.name}</CustomText>
        <CustomText style={styles.text}>Winner:  {auction.wonBid.participant}</CustomText>
        <CustomText style={styles.text}>Staring Price:  ${auction.item.price}</CustomText>
        <CustomText style={styles.text}>Bid Price:  ${auction.wonBid.amount}</CustomText>
        <CustomText style={styles.text}>Profit:  ${auction.wonBid.profit}</CustomText>
      </View>
    );
  }

  renderListEmptyComponent() {
    return (
      <View style={{marginTop: 150}}>
        <CustomText style={{fontSize: 18}}>No Completed Auctions Yet</CustomText>
      </View>
    );
  }

  render() {
    const {auctions} = this.state;
    console.log(auctions);
    return (
      <View style={styles.mainContainer}>
        <NavigationEvents onWillFocus={this.getAuctions} />
        <FlatList
          contentContainerStyle={{ padding: 10 }}
          // ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: colors.LIGHT_GREY}} />}
          ListEmptyComponent={() => this.renderListEmptyComponent()}
          data={auctions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderAuction(item)}
        />
        <LoadingButton style={{marginVertical: deviceHeight/28, width: '85%'}} title='New Auction' onPress={() => this.navigate('AddItem')} />
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  auctionView: {
    backgroundColor: colors.LIGHT_CYAN,
    borderRadius: 10,
    padding: 15,
    marginVertical: 6,
  },
  text: {
    marginTop: 3,
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'white',
    fontWeight: '500'
  }
};
