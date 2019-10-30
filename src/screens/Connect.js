import React, {Component} from 'react';
import {
    View,
    FlatList, Image,
    TouchableOpacity,
    Linking,
} from 'react-native';
import Dimensions from 'Dimensions';
import Images from '../../assets/imgs/index';

import {
    ViewContainer,
    Heading,
    SubHeading,
    PadContainer,
} from '../components/Base';
import {colors} from "../components/Colors";

export class SocialMedia {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}

// This is the part of the app users goes to for our social media links
export default class Connect extends Component<Props> {
    constructor(props) {
        super(props);
    }

    renderHeading() {
        return (
            <React.Fragment>
                <Heading>
                    Connect with Us
                </Heading>
                <SubHeading>
                    Stay connected with Technica!
                </SubHeading>
            </React.Fragment>
        )
    }

    renderSocialMediaIcons() {
        const ICONS = [
            new SocialMedia('facebook', 'https://www.facebook.com/gotechnica/'),
            new SocialMedia('insta', 'https://www.instagram.com/gotechnica/'),
            new SocialMedia('linkedin', 'https://www.linkedin.com/company/gotechnica/'),
            new SocialMedia('medium', 'https://medium.com/gotechnica'),
            new SocialMedia('twitter', 'https://twitter.com/gotechnica'),
            new SocialMedia('youtube', 'https://www.youtube.com/channel/UC-Wo4UqhGUKQEp4o-51VMIw'),
        ];
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={ICONS}
                    numColumns={3}
                    renderItem={
                        ({item}) =>
                            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                                <Image
                                    style={[
                                        {
                                            width: Dimensions.get('window').width / 3.5,
                                            height: .75 * (Dimensions.get('window').width / 3.5),
                                            marginBottom: 15,
                                        },
                                    ]}
                                    source={Images[item.name]}
                                />
                            </TouchableOpacity>
                    }
                    keyExtractor={item => item.name}
                />
            </View>
        )
    }

    // Completes overall setup of the page
    render() {
        return (
            <ViewContainer>
                <PadContainer>
                    {this.renderHeading()}
                </PadContainer>
                <PadContainer>
                    {this.renderSocialMediaIcons()}
                </PadContainer>
            </ViewContainer>
        )
    }
}
