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
import functions from '../utils/functions';
import RNPickerSelect from 'react-native-picker-select';

export default class Auction extends Component<{}> {

  auction = this.props.navigation.state.params.auction;
  navigate = this.props.navigation.navigate;

  state = {
    participants: [],
    selectedParticipant: null,
    bidAmount: '',
    bids: [],
    modalVisible: false,
    wonBid: {
      participant: '',
      amount: '',
      profit: '',
    },
  }

  componentDidMount() {
    const parts = [];
    this.auction.participants.forEach((banda) => {
      const obj = {
        label: banda,
        value: banda,
      };
      parts.push(obj);
    });
    this.setState({ participants: parts });
  }

  updateParticipant = (value) => {
    this.setState({ selectedParticipant: value });
  }

  addBid = () => {
    const {selectedParticipant, bidAmount, bids} = this.state;
    if (selectedParticipant === null || bidAmount === '') { Alert.alert('Please add a participant and amount'); return; }
    if (bidAmount < this.auction.item.price) { Alert.alert('Bidding amount cannot be less than starting price'); return; }
    const bid = {
      participant: selectedParticipant,
      amount: bidAmount
    };
    bids.push(bid);
    this._amountField.blur();
    this.setState({ bids, selectedParticipant: null, bidAmount: '' });
  }

  endBid = () => {
    const {bids} = this.state;
    let wonBid = bids[0];
    bids.forEach((bid) => {
      if (bid.amount > wonBid.amount) {
        wonBid = bid;
      }
    });
    wonBid.profit = wonBid.amount - this.auction.item.price;
    this.setState({ wonBid, modalVisible: true });
  }

  saveAuction = async () => {
    const {wonBid} = this.state;
    this.auction.wonBid = wonBid;
    this.setState({ modalVisible: false });
    await functions.saveAuction(this.auction);
    this.navigate('Home');
  }

  renderBid(bid) {
    const profit = bid.amount - this.auction.item.price;
    return (
      <View style={styles.bidView}>
        <CustomText style={{fontSize: 16, fontWeight: '500', alignSelf: 'flex-start'}}>Bidder: {bid.participant}</CustomText>
        <View>
          <CustomText style={{alignSelf: 'flex-start'}}>Bid Amount: ${bid.amount}</CustomText>
          <CustomText style={{alignSelf: 'flex-start'}}>Profit: ${profit}</CustomText>
        </View>
      </View>
    );
  }

  renderBidEndingButtons() {
    const {bids} = this.state;
    if (bids.length === 0) {
      return <View />;
    }
    return (
        <LoadingButton style={styles.endBidBtn} title='End Bidding' onPress={this.endBid} />
    );
  }

  render() {
    const {participants, selectedParticipant, bidAmount, bids, wonBid} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.auctionAndBidContainer}>
          <View style={styles.auctionDetailsView}>
            <CustomText style={{fontSize: 18, fontWeight: 'bold'}}>MAKE A BID</CustomText>
            <CustomText style={{fontWeight: 'normal', fontSize: 16, alignSelf: 'flex-start', marginTop: 15}}>Item: {this.auction.item.name}</CustomText>
            <CustomText style={{fontWeight: 'normal', fontSize: 16, alignSelf: 'flex-start', marginTop: 5}}>Starting Price: ${this.auction.item.price}</CustomText>
          </View>
          <View style={styles.newBidView}>
            <View style={{width: '50%'}}>
            <RNPickerSelect
              ref={(c) => this._picker = c}
              items={participants}
              onValueChange={(v) => this.updateParticipant(v)}
              value={selectedParticipant}>
              <InputField style={{ height: 40 }} placeholder={'Select Participant'} value={selectedParticipant} />
            </RNPickerSelect>
            </View>
            <InputField ref={(c) => this._amountField = c} style={{width: '33%', height: 40}} value={bidAmount} onChangeText={(t) => this.setState({bidAmount: t})} keyboardType={'numeric'} placeholder='Amount' />
            <LoadingButton onPress={this.addBid} style={styles.addBidBtn} title='+' />
          </View>
        </View>
        <FlatList
          data={bids}
          contentContainerStyle={{padding: 18}}
          ListHeaderComponent={bids.length > 0 && <CustomText style={{alignSelf: 'flex-start', fontSize: 26, fontWeight: '500'}}>Bids</CustomText>}
          ListFooterComponent={() => this.renderBidEndingButtons()}
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: colors.LIGHT_GREY}} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderBid(item)}
        />
        <Dialog
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
          animationDuration={400}
          visible={this.state.modalVisible}
          onTouchOutside={() => this.setState({ modalVisible: false })}
          onHardwareBackPress={() => this.setState({ modalVisible: false })}
          dialogStyle={styles.modalContainer}>
            <View style={styles.modalBody}>
              <CustomText style={{alignSelf: 'flex-start', textAlign: 'left', fontSize: 28, fontWeight: '500'}}>{wonBid.participant}</CustomText>
              <CustomText style={{alignSelf: 'flex-start', textAlign: 'left', fontSize: 28, fontWeight: '500'}}>${wonBid.amount}</CustomText>
              <LoadingButton onPress={this.saveAuction} style={{marginTop: 20, marginBottom: 30}} title='Save Auction' />
            </View>
        </Dialog>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  auctionAndBidContainer: {
    backgroundColor: 'rgb(240, 240, 240)',
    marginHorizontal: 10,
    padding: 15,
    // borderWidth: 1,
    borderColor: colors.BLUE,
    borderRadius: 10,
  },
  auctionDetailsView: {

  },
  newBidView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  addBidBtn: {
    width: 40,
    height: 40,
    shadowOpacity: 0,
    elevation: 0,
    borderRadius: 100
  },
  bidView: {
    // marginVertical: 10,
    // backgroundColor: 'rgb(230, 230, 230)',
    paddingVertical: 10,
    // paddingLeft: 15,
    // borderRadius: 8,
  },
  endBidBtn: {
    marginTop: 15,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
};
