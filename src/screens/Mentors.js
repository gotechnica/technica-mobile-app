import React, { Component } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
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

const serverURL = "https://technicamentorshipservertest.herokuapp.com"

export default class Mentors extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { question: '', location: "", newQuestionScreen:false, listData: [] };
    this.sendQuestion = this.sendQuestion.bind(this);
    this.showToast = this.showToast.bind(this);
  }

  grabQuestionsFromDB(email) {
    fetch(`${serverURL}/getquestions/${email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(async (responseJson) => {
      console.log("questions found")
      console.log(responseJson)
      this.setState({listData: responseJson });
  }).catch(err => {
    console.log("ERROR GRABBING QUESTIONS")
    console.log(err)
  })

  }
  // initially loads question data from server
  async componentDidMount() {
    const user_data = await AsyncStorage.getItem("USER_DATA_STORE");
    const user_data_json = JSON.parse(user_data)
    this.grabQuestionsFromDB(user_data_json.user_data.email)
  }

  clearInputs() {
    this.setState({ question: '', location: ''});
  }
  cancelQuestion() {
    this.setState({ question: '', newQuestionScreen: !this.state.newQuestionScreen });
  }
  toggleModal() {
    this.setState({ newQuestionScreen: !this.state.newQuestionScreen });
  }

  showToast() {
    // Show toast after 600ms
    // This 600ms delay ensures the toast loads after the modal animation close
    // happens. There is a weird iOS issue where toast will vanish the moment
    // modal closes. This is the best workaround I could make for now.
    setTimeout(() => {
      Toast.show('Question sent! Our next available mentor will come assist you.', Toast.LONG);
    }, 400)
  }

  async sendQuestion() {
    if (this.state.question === '' || this.state.location === '') {
      Alert.alert(
        "Try Again",
        "Your question or location was empty.",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    } else {
      const fcmToken = await AsyncStorage.getItem("FCMToken");
      const user_data = await AsyncStorage.getItem("USER_DATA_STORE");
      const user_data_json = JSON.parse(user_data);
      const name = user_data_json.user_data.first_name + " " + user_data_json.user_data.last_name
      var questionObject = {
        question: this.state.question,
        location: this.state.location,
        status: "Awaiting available mentors",
        key: moment().format(),
        name: name,
        email: user_data_json.email,
      }
      if (fcmToken != null) {
        questionObject.fcmToken = fcmToken
      }

      var questionString = JSON.stringify(questionObject)
      fetch(`${serverURL}/question`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: questionString,
      }).catch(error => {
        console.log(error)
      })
      this.clearInputs()
      this.showToast();
      this.toggleModal()
      // make new question show up immediately at top of list
      this.setState({listData: [questionObject].concat(this.state.listData)})
    }
  }
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
        <TouchableOpacity onPress={() => this.sendQuestion()}>
          <Button
            text="Submit Question"
          />
        </TouchableOpacity>
        </View>
        <View marginTop = {10}>
          <TouchableOpacity onPress={() => this.cancelQuestion()}>
            <Button
              text="Cancel"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  async createNotificationListener() {
    // updates when app is in foreground
    this.notificationListener = firebase
    .notifications()
    .onNotification(notification => {this.grabQuestionsFromDB(notification.data.email)});

    // updates when app is in the background
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      this.grabQuestionsFromDB(notificationOpen.notification.data.email)
    });
  }

  async updateQuestionStatus(notification) {
    console.log('notification received', notification.body);
    console.log(notification.data)

    const key = notification.data.key;
    const mentorName = notification.data.mentor_name;

    const questions = await AsyncStorage.getItem("questions");
    const qList = JSON.parse(questions);

    // update status of question
    qList.forEach((element, index) => {
      if (element.key == key) {
        console.log("found!");
        element.status = `${mentorName} has claimed your question!`;
        qList[index] = element;
      }
    })
    // store update in local storage
    await AsyncStorage.setItem("questions", JSON.stringify(qList))
    this.setState({listData: qList})
  }



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
