import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';
import StatusBar from './src/components/StatusBar';
import { colors } from './src/components/Colors';

import store from './src/store'; //Import the store
import { Provider } from 'react-redux';

// TODO render redux outside of paper provider
export default Main = () => (
  <Provider store={store}>
    <PaperProvider>
      <StatusBar
        backgroundColor={colors.black}
        barStyle="light-content"
      />
      <App />
    </PaperProvider>
  </Provider>

);

AppRegistry.registerComponent('technica', () => Main);
