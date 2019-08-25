import {
  Alert,
  AsyncStorage,
} from 'react-native';
const USER_DATA_STORE = 'USER_DATA_STORE';

export default logout(navigation) => {
  Alert.alert(
    "Log Out",
    "Are you sure you want to log out?",
    [
      {text: 'OK', onPress: () => {
        AsyncStorage.removeItem(USER_DATA_STORE).then(() => {
          const navigate = navigation;
          navigate('Login');
        });
      }},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    ],
    { cancelable: true }
  );
}
