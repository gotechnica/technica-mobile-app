'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import {
  PaperSheet
} from './Base';
import { H1, H2, H3, H4, P } from './Text';


import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions'; //Import your actions

class RedexDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getData(); //call our action
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            return (
                <View style={{flex:1, }}>
                    <FlatList
                        ref='listRef'
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}/>
                </View>
            );
        }
    }

    renderItem({item, index}) {
        return (
            <PaperSheet style={styles.row}>
                <H3 style={styles.title}>
                    {item.title}
                </H3>
                <P style={styles.description}>
                    {item.description}
                </P>
            </PaperSheet>
        )
    }
};



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/index.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(RedexDemo);

const styles = StyleSheet.create({
    activityIndicatorContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingBottom: 20,
    },

    row:{
    },

    title:{
    },

    description:{
    }
});
