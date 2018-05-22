import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';


// TODO render redux outside of paper provider
export default Main = () => (
  <PaperProvider>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent('technica', () => Main);
