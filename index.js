import * as React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';
import StatusBar from './src/components/StatusBar';
import { colors } from './src/components/Colors';
import EventManager from './src/events/EventsManager';

export default (Main = () => {
  eventManager = new EventManager();
  return (
    <PaperProvider>
      {Platform.OS === "ios" ? null : (
        <StatusBar
          backgroundColor={colors.borderColor.light}
          barStyle="light-content"
        />
      )}
      <App eventManager={eventManager} />
    </PaperProvider>
  );
});

AppRegistry.registerComponent('technica', () => Main);
