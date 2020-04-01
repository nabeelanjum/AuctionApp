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

export default class AddItem extends Component<{}> {

  navigate = this.props.navigation.navigate;

  state = {
    participants: [],
    name: '',
    modalVisible: false,
  }

  addParticipant = () => {
    const {name, participants} = this.state;
    if (name === '') { Alert.alert('Please add a name first'); return; }
    participants.push(name);
    this.setState({ participants, name: '', modalVisible: false });
  }

  renderListEmptyComponent() {
    return (
      <View style={styles.listEmptyContainer}>
        <CustomText style={{fontSize: 18}}>Please Add Participants</CustomText>
      </View>
    );
  }

  moveNext = () => {
    const {participants} = this.state;
    if (participants.length === 0) { Alert.alert('Please add at least one participant'); return; }
    const auction = {
      item: this.props.navigation.state.params.item,
      participants
    };
    this.navigate('Auction', {auction});
  }

  renderName(name) {
    return (
      <View style={{paddingVertical: 20}}>
        <CustomText style={{alignSelf: 'flex-start'}}>{name}</CustomText>
      </View>
    );
  }

  render() {
    const {participants} = this.state;
    const enabled  = participants.length > 0 ? true : false;
    return (
      <View style={styles.mainContainer}>
        <FlatList
          contentContainerStyle={{paddingLeft: 20}}
          data={participants}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => this.renderListEmptyComponent()}
          ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: colors.LIGHT_GREY}} />}
          renderItem={({item}) => this.renderName(item)}
        />
        <View style={{flexDirection: 'row', marginVertical: 20, justifyContent: 'space-around', marginLeft: 10}}>
          <LoadingButton style={{width: '70%'}} onPress={() => this.setState({modalVisible: true})} title='Add New' />
          <LoadingButton style={[{width: deviceHeight/12, maxWidth: 55, borderRadius: 100}, !enabled && {backgroundColor: colors.GREY, shadowOpacity: 0}]} onPress={this.moveNext} title='→' />
        </View>
        <Dialog
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
          animationDuration={400}
          visible={this.state.modalVisible}
          onTouchOutside={() => this.setState({ modalVisible: false })}
          onHardwareBackPress={() => this.setState({ modalVisible: false })}
          height={deviceHeight/1.5}
          dialogStyle={styles.modalContainer}>
            <View style={styles.modalBody}>
              <InputField onSubmitEditing={this.addParticipant} autoFocus={true} onChangeText={(t) => this.setState({name: t})} autoCapitalize={'words'} returnKeyType='done' placeholder='Name' />
              <LoadingButton onPress={this.addParticipant} style={{marginTop: 25}} title='Add' />
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
    // paddingHorizontal: 25,
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
  listEmptyContainer: {
    marginTop: 100,
  }
};
