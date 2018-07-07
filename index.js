import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';
import StatusBar from './src/components/StatusBar';
import { colors } from './src/components/Colors';


export default Main = () => (
  <PaperProvider>
    <StatusBar
      backgroundColor={colors.black}
      barStyle="light-content"
    />
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent('technica', () => Main);
