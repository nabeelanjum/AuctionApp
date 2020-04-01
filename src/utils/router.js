import {
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../components/Home';
import AddItem from '../components/AddItem';
import AddParticipants from '../components/AddParticipants';
import Auction from '../components/Auction';

const AppRoot = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Auctions'
    }
  },
  AddItem: {
    screen: AddItem,
    navigationOptions: {
      title: 'Add Item'
    }
  },
  AddParticipants: {
    screen: AddParticipants,
    navigationOptions: {
      title: 'Add Participants'
    }
  },
  Auction,
});

const AppContainer = createAppContainer(AppRoot);

export default AppContainer;
