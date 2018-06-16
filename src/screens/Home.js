import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { H1, H2, H3, H4, H6, P } from '../components/Text';
import {
  ViewContainer,
  Heading,
  SubHeading,
  PaperSheet,
  PadContainer,
  GradientBackground,
  HorizontalLine,
  Spacing,
} from '../components/Base';

export default class Home extends Component<Props> {
  render() {
    return (
      <GradientBackground>
        <ViewContainer>
          <PadContainer>
            <Heading>
              Technica 2018
            </Heading>
            <SubHeading>
              16h 34m 53s left to hack
            </SubHeading>
          </PadContainer>


          <PadContainer>
            <H2 style={styles.heading}>Recent Updates</H2>
          </PadContainer>
          <PaperSheet>
            <H4>11:00am</H4>
            <H6>Lunch has been postponed until tomorrow.</H6>
            <Spacing/>
            <HorizontalLine/>
            <Spacing/>
            <H4>11:00am</H4>
            <H6>Lunch has been postponed until tomorrow.</H6>
            <Spacing/>
            <HorizontalLine/>
            <Spacing/>
            <H4>11:00am</H4>
            <H6>Lunch has been postponed until tomorrow.</H6>
          </PaperSheet>

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
      </GradientBackground>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 20,
  },
  spacing: {
  },
});
