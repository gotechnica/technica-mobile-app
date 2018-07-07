import React, { Component } from 'react';
import {
  Platform,
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


export default class Mentors extends Component<Props> {
  render() {
    return (
      <ViewContainer>
        <PadContainer>
          <Heading>
            Schedule
          </Heading>
          <SubHeading>
            12 events saved
          </SubHeading>
        </PadContainer>

      </ViewContainer>
    );
  }
}
