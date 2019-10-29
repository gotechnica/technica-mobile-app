import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Challenge from './HomeScreens/Challenge';

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Challenge: {
      screen: Challenge,
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'card', // 'card' or 'modal'
  },
);

export default HomeNavigator;