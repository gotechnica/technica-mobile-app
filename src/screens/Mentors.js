import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
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
import QuestionCard from '../components/QuestionCard'
import { H1, H2, H3, H4, H6, P } from '../components/Text';
import { Dropdown } from 'react-native-material-dropdown';
import * as ScreenLogic from '../actions/ScreenLogic';
import CheckBox from 'react-native-checkbox';
// import { CheckBox } from 'react-native-elements';

// This is the part of the app users go to for asking questions to mentors
export default class Mentors extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState, question: '', location: "", newQuestionScreen: false, listData: [], topics: [{
        name: 'Mobile Development',
        checked: false,
      }, {
        name: 'AI/VR',
        checked: false,
      }, {
        name: 'Machine Learning',
        checked: false,
      }, {
        name: 'Object Oriented Programming Languages',
        checked: false,
      }, {
        name: 'Scripting Languages',
        checked: false,
      }, {
        name: 'Web Development',
        checked: false,
      }, {
        name: 'Databases',
        checked: false,
      }, {
        name: 'Backend Engineering',
        checked: false,
      }, {
        name: 'Frontend UX/UI Design',
        checked: false,
      }, {
        name: 'AWS',
        checked: false,
      }, {
        name: 'Hardware',
        checked: false,
      }, {
        name: 'Linux',
        checked: false,
      }, {
        name: 'Data Science',
        checked: false,
      }, {
        name: 'Product Design',
        checked: false,
      }]
    };
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

  changeCheck(i) {
    let topics = this.state.topics.slice(0);
    topics[i].checked = !topics[i].checked;
    return topics;
  }

  renderCheckbox(i) {
    return (
      <CheckBox
        label={this.state.topics[i].name}
        labelStyle={}
        checked={this.state.topics[i].checked}
        onChange={(checked) => this.setState({topics: this.changeCheck(i)})}
      />);
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
        onBackButtonPress={() => ScreenLogic.toggleModal.call(this)}
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
                marginBottom: 20,
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
          <View marginTop = {10}>
            <H3 style={{ color: 'white', marginBottom: 10 }}>Which tag best applies?</H3>
            <ScrollView style={{maxHeight: 105}}>
              {this.renderCheckbox(0)}
              {this.renderCheckbox(1)}
              {this.renderCheckbox(2)}
              {this.renderCheckbox(3)}
              {this.renderCheckbox(4)}
              {this.renderCheckbox(5)}
              {this.renderCheckbox(6)}
              {this.renderCheckbox(7)}
              {this.renderCheckbox(8)}
              {this.renderCheckbox(9)}
              {this.renderCheckbox(10)}
              {this.renderCheckbox(11)}
              {this.renderCheckbox(12)}
              {this.renderCheckbox(13)}
            </ScrollView>
          </View>
        </View>
        <View marginTop = {10}>
        <TouchableOpacity onPress={() => ScreenLogic.sendQuestion.call(this)}>
          <Button
            text="Submit Question"
          />
        </TouchableOpacity>
        </View>
        <View marginTop = {10}>
          <TouchableOpacity onPress={() => ScreenLogic.cancelQuestion.call(this)}>
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
    { ScreenLogic.createNotificationListener.call(this) }

      return (
      <ViewContainer>
      <PadContainer>
        {this.renderHeading()}
        {this.renderNewQuestionModal()}
      </PadContainer>
      <TouchableOpacity
        onPress={() => { ScreenLogic.toggleModal.call(this) }}
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
