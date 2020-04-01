import {
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {colors} from './constants';

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
}, {
  defaultNavigationOptions: {
    headerTitleAllowFontScaling: false,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 16,
      color: 'black',
      fontWeight: 'normal',
      // fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : undefined,
    },
    headerBackTitleVisible: false,
    headerStyle: {
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
  }
});

const AppContainer = createAppContainer(AppRoot);

export default AppContainer;
