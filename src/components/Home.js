import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import functions from '../utils/functions';

export default class Home extends Component<{}> {

  navigate = this.props.navigation.navigate;

  state = {
    auctions: [],
  }

  getAuctions = async () => {
    const auctions = await functions.getAuctions();
    console.log(auctions);
  }

  renderAuction(auction) {
    return (
      <TouchableOpacity>
        <Text>{auction.item.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {auctions} = this.state;
    return (
      <View style={styles.mainContainer}>
        <NavigationEvents onWillFocus={this.getAuctions} />
        <FlatList
          data={auctions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderAuction(item)}
        />
        <TouchableOpacity onPress={() => this.navigate('AddItem')}>
          <Text>New Auction</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
  }
};
