import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';

const theme = {
  ...DefaultTheme,
  roundness: 4,
};

// TODO render redux outside of paper provider
export default Main = () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent('technica', () => Main);
