import React, { Component } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  AppState
} from 'react-native';
import {
  ViewContainer,
  Heading,
  modalStyle,
  SubHeading,
  Button,
  PadContainer,
} from '../components/Base';
import Modal from "react-native-modal";
import { colors } from '../components/Colors';
import firebase from 'react-native-firebase';
import QuestionCard from '../components/QuestionCard'
import { AsyncStorage } from "react-native"
import { H1, H2, H3, H4, H6, P } from '../components/Text';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

import * as ScreenLogic from '../actions/ScreenLogic'

const serverURL = "https://technicamentorshipservertest.herokuapp.com"

// This is the part of the app users go to for asking questions to mentors
export default class Mentors extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { appState: AppState.currentState, question: '', location: "", newQuestionScreen:false, listData: [] };
    this.sendQuestion = ScreenLogic.sendQuestion.bind(this);
    this.showToast = ScreenLogic.showToast.bind(this);
    this._handleAppStateChange = ScreenLogic._handleAppStateChange.bind(this);
  }

  // Sets up heading of the page
  renderHeading() {
    return (
      <React.Fragment>
        <Heading>
          Mentors
        </Heading>
        <SubHeading>
          Ask our mentors for help
        </SubHeading>
      </React.Fragment>
      )
  }

  // Sets up the question-asking area (widgets, animation, style, etc.)
  renderNewQuestionModal() {
    const { question, location, newQuestionScreen  } = this.state;
    return (
      <Modal
        isVisible={newQuestionScreen}
        backdropColor={colors.black}
        backdropOpacity={1}
        animationInTiming={250}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        animationOutTiming={300}
        backdropTransitionInTiming={250}
        backdropTransitionOutTiming={300}
        avoidKeyboard={true}
        onBackButtonPress={() => this.toggleModal()}
        style={modalStyle}
      >
        <View style={{ padding: 20 }}>
          <H3 style={{ color: 'white', marginBottom: 10 }}>How can we help you?</H3>
          <TextInput
            style={{
              borderColor: colors.white,
              borderBottomWidth: 1,
              padding: 0,
              fontFamily: "Poppins-Regular",
              paddingBottom: 2,
              marginBottom: 20,
              fontSize: 14,
              color: colors.white,
            }}
            onChangeText={(text) => this.setState({question: text})}
            value={question}
            underlineColorAndroid='transparent'
            placeholder="How do I make X using Y?"
            placeholderTextColor="#666666"
          />
          <View marginTop = {10}>
            <H3 style={{ color: 'white', marginBottom: 10 }}>Where can we find you?</H3>
            <TextInput
              style={{
                borderColor: colors.white,
                borderBottomWidth: 1,
                fontFamily: "Poppins-Regular",
                padding: 0,
                paddingBottom: 2,
                fontSize: 14,
                color: colors.white,
              }}
              onChangeText={(text) => this.setState({location: text})}
              value={location}
              underlineColorAndroid='transparent'
              placeholder="Table B5"
              placeholderTextColor="#666666"
            />
          </View>
        </View>
        <View marginTop = {10}>
        <TouchableOpacity onPress={() => ScreenLogic.sendQuestion()}>
          <Button
            text="Submit Question"
          />
        </TouchableOpacity>
        </View>
        <View marginTop = {10}>
          <TouchableOpacity onPress={() => ScreenLogic.cancelQuestion()}>
            <Button
              text="Cancel"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  // Completes overall setup of the page along with saving the question
  render() {
    { this.createNotificationListener() }

      return (
      <ViewContainer>
      <PadContainer>
        {this.renderHeading()}
        {this.renderNewQuestionModal()}
      </PadContainer>
      <TouchableOpacity
        onPress={() => { this.toggleModal() }}
        style={{ marginBottom: 40 }}
      >
        <Button text="Ask a Question" />
      </TouchableOpacity>
      <PadContainer>
        {
          (this.state.listData) && (this.state.listData.length > 0) && <H2 style={{ marginBottom: 20 }}>Your Questions</H2>
        }
        <FlatList
            data = {this.state.listData}
            renderItem={({item}) =>
              <QuestionCard
                question={item.question}
                status={item.status}
                location={item.location}
                time={item.key}
              />
            }
          />
      </PadContainer>
    </ViewContainer>
    )
    }
  }
