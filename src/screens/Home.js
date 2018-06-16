import React, { Component } from 'react';
import {
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { H1, H2, H3, H4, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
} from '../components/Base';
import ReduxDemo from '../components/ReduxDemo' //Import the component file

export default class Home extends Component<Props> {
  render() {
    return (
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
        source={require('../../assets/imgs/bg.png')}
      >
        <ViewContainer>
          <PadContainer>
            <Heading>
              Technica 2018
            </Heading>
            <SubHeading>
              12 events saved
            </SubHeading>
          </PadContainer>


          <ReduxDemo/>

          <PaperSheet>
            <H4>
              10:00am - 11:00am
            </H4>
            <H3>
              Intro to ReactJS
            </H3>
            <P>
              Room 33043
            </P>
          </PaperSheet>
          <PaperSheet heading="9:00am">
            <H4>
              10:00am - 11:00am
            </H4>
            <H3>
              Intro to ReactJS
            </H3>
            <P>
              Room 33043
            </P>
          </PaperSheet>
          <PaperSheet heading="9:00am">
            <H4>
              10:00am - 11:00am
            </H4>
            <H3>
              Intro to ReactJS
            </H3>
            <P>
              Room 33043
            </P>
          </PaperSheet>
          <PaperSheet heading="9:00am">
            <H4>
              10:00am - 11:00am
            </H4>
            <H3>
              Intro to ReactJS
            </H3>
            <P>
              Room 33043
            </P>
          </PaperSheet>
          {/* <H2 style={styles.welcome}>
            16h 34m 43s left
          </H2>
          <H3 style={styles.welcome}>
            Intro to ReactJS
          </H3>
          <H4 style={styles.welcome}>
            10:00am - 11:00am
          </H4>
          <P style={styles.welcome}>
            Room 3304
          </P> */}
        </ViewContainer>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
});
