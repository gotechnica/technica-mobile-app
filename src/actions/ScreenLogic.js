import {Alert, AppState, AsyncStorage} from "react-native";
import Toast from "react-native-simple-toast";
import moment from "moment";
import firebase from "react-native-firebase";

// Pulls current mentor questions in the database
export function grabQuestionsFromDB(email) {
  fetch(`${serverURL}/getquestions/${email}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(response => response.json()).then(async (responseJson) => {
    console.log("questions found");
    console.log(responseJson);
    this.setState({listData: responseJson});
  }).catch(err => {
    console.log("ERROR GRABBING QUESTIONS");
    console.log(err)
  })

}

// Initially loads mentor question data from server
export async function componentDidMount() {
  AppState.addEventListener('change', this._handleAppStateChange);
  const user_data = await AsyncStorage.getItem("USER_DATA_STORE");
  const user_data_json = JSON.parse(user_data);
  this.grabQuestionsFromDB(user_data_json.user_data.email)
}

// Removes event listener from initial data load
export function componentWillUnmount() {
  AppState.removeEventListener('change', this._handleAppStateChange);
}

// Grabs updated/new mentor questions when change is detected in database
export async function _handleAppStateChange(nextAppState) {
  if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    console.log('App has come to the foreground!')
    const user_data = await AsyncStorage.getItem("USER_DATA_STORE");
    const user_data_json = JSON.parse(user_data)
    this.grabQuestionsFromDB(user_data_json.user_data.email)
  }
  this.setState({appState: nextAppState});
}

// Empty text box for mentor question
export function clearInputs() {
  this.setState({question: '', location: ''});
}

// Resets mentor question screen
export function cancelQuestion() {
  this.setState({question: '', newQuestionScreen: !this.state.newQuestionScreen});
}

// Toggles state of question screen
export function toggleModal() {
  this.setState({newQuestionScreen: !this.state.newQuestionScreen});
}

// Shows toast for after question is sent
export function showToast() {
  // Show toast after 600ms
  // This 600ms delay ensures the toast loads after the modal animation close
  // happens. There is a weird iOS issue where toast will vanish the moment
  // modal closes. This is the best workaround I could make for now.
  setTimeout(() => {
    Toast.show('Question sent! Our next available mentor will come assist you.', Toast.LONG);
  }, 400)
}

// Creates question object and sends it to mentors
export async function sendQuestion() {
  if (this.state.question === '' || this.state.location === '') {
    Alert.alert(
      "Try Again",
      "Your question or location was empty.",
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false}
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
      email: user_data_json.user_data.email,
    };
    if (fcmToken != null) {
      questionObject.fcmToken = fcmToken
    }

    var questionString = JSON.stringify(questionObject);
    fetch(`${serverURL}/question`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: questionString,
    }).catch(error => {
      console.log(error)
    });
    clearInputs();
    showToast();
    toggleModal();
    // make new question show up immediately at top of list
    this.setState({listData: [questionObject].concat(this.state.listData)})
  }
}

// Creates notification listeners for when database is updated and grabs new questions when notification is detected
export async function createNotificationListener() {
  // updates when app is in foreground
  this.notificationListener = firebase
    .notifications()
    .onNotification(notification => {
      this.grabQuestionsFromDB(notification.data.email)
    });

  // updates when app is in the background
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    this.grabQuestionsFromDB(notificationOpen.notification.data.email)
  });
}

// Updates status of claimed questions
export async function updateQuestionStatus(notification) {
  console.log('notification received', notification.body);
  console.log(notification.data);

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
  });
  // store update in local storage
  await AsyncStorage.setItem("questions", JSON.stringify(qList))
  this.setState({listData: qList})
}

