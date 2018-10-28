import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { H4, H6 } from "./Text"
import Swipeout from 'react-native-swipeout';
import {colors} from "./Colors"
import FAIcon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  question: {
    // backgroundColor: colors.darkGrey,
    padding: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
    // marginBottom: 10
  },
  questionContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderGrey,
  },
  deleteButton: {
    backgroundColor: colors.pink,
    margin: 'auto',
  }
});

export default class QuestionCard extends Component {

  renderStatus() {
    const { status } = this.props;
    if (status == "Responded!") {
      return <H6 style={{color: colors.cyan}}>{status}</H6>
    } else {
      return <AnimatedEllipsis status={status}/>
    }
  }
  render() {
    const { question } = this.props;
    var swipeoutBtns = [
      {
        text: 'Remove',
        backgroundColor: colors.black,
        color: colors.white,
        underlayColor: colors.black,
        component: (
          <View
              style={{
                flex: 1,
                backgroundColor: colors.pink,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
          >
            <FAIcon
              name="trash"
              size={24}
              color="white"
            />
          </View>
        )
      }
    ];



    return (
      <View style={styles.questionContainer}>
        <Swipeout
          right={swipeoutBtns}
          backgroundColor={colors.black}
        >
          <View style = {styles.question}>
            <H4 style={{color: 'white'}}>{question}</H4>
            {this.renderStatus()}
          </View>
        </Swipeout>
      </View>

    );
  }
}

class AnimatedEllipsis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txt: '...'
    }
  }

  componentDidMount() {
    setInterval(() => {
      const newTxt = this.state.txt === '. . .' ? '' : (this.state.txt === '') ? '.' : (this.state.txt === '.') ? '. .' : (this.state.txt === '. .') ? '. . .' : '';
      this.setState({ txt: newTxt});
    }, 600);
  }

  render() {
    return <H6 style={{ color: colors.lavender }}>{`${this.props.status}${this.state.txt}`}</H6>;
  }
}
