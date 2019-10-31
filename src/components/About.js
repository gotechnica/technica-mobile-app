import React, {Component} from 'react';
import {
    View,
    FlatList, Image, StyleSheet, Linking, Text,
} from 'react-native';
import Images from '../../assets/imgs';
import resolveAssetSource from 'resolveAssetSource';

import {
    ViewContainer,
    SubHeading,
} from './Base';
import {H3, H5} from "./Text";

export class Milestone {
    constructor(date, name, image, payload) {
        this.date = date;
        this.name = name;
        this.image = image;
        this.payload = payload;
    }
}

const DATA = [
        new Milestone(
            'AUGUST 2015',
            'Our Humble Beginnings',
            Images['beginnings'],
            <H5 style={{
                textAlign: 'right', fontFamily: "DINPro-Medium",
                fontSize: 11.5
            }}>
                Technica was founded at the University of Maryland, by students who saw a gap that mainstream hackathons
                weren’t addressing. Our goal has since remained the same: to introduce women and non-binary folks from
                diverse backgrounds to the field of tech.
            </H5>
        ),
        new Milestone(
            'NOVEMBER 2016',
            'A World Record',
            Images['worldrecord'],
            <H5 style={{
                textAlign: 'left', fontFamily: "DINPro-Medium",
                fontSize: 11.5
            }}>
                Technica became the
                <Text style={{color: "pink"}}
                      onPress={() => Linking.openURL('https://eng.umd.edu/news/story/technica-becomes-largest-allwomen-hackathon')}>{" "}largest
                    all-women &
                    non-binary hackathon{" "}</Text>
                with over 850 participants coming from schools
                across the East coast, Midwest, California, Florida, and even Canada!
            </H5>
        ),
        new Milestone(
            'AUGUST 2018',
            'Nonprofit Status',
            Images['nonprofit'],
            <H5 style={{
                textAlign: 'right', fontFamily: "DINPro-Medium",
                fontSize: 11.5
            }}>
                Technica was officially recognized by the US Government as a nonprofit! This grounded our mission: to
                empower diversity in technology. Our work isn’t for profits or show, but to fight for what is just and
                equitable.
            </H5>
        ),
        new Milestone(
            'AUGUST 2019',
            '5th Year Celebration',
            Images['fiveyears'],
            <H5 style={{
                textAlign: 'left', fontFamily: "DINPro-Medium",
                fontSize: 11.5
            }}>
                Technica turns five! We celebrated our anniversary with a
                <Text style={{color: "pink"}}
                      onPress={() => Linking.openURL('https://youtu.be/5m13YSjSgVE')}>{" "}video{" "}</Text>
                honoring
                the past 5 years. We’re proud to
                have hosted over 3,000 women & non-binary people and counting and look forward to the future.
            </H5>
        ),
        new Milestone(
            'SEPTEMBER 2019',
            'Becoming More Sustainable',
            Images['sustainable'],
            <H5 style={{
                textAlign: 'right', fontFamily: "DINPro-Medium",
                fontSize: 11.5
            }}>
                Large events, like hackathons, can be particularly wasteful. To minimize our impact on the global climate
                crisis, we pledged this year to commit to greater sustainability practices at Technica. Our pledge can be
                found
                <Text style={{color: "pink"}}
                      onPress={() => Linking.openURL('https://docs.google.com/presentation/d/153j3iVsLimOyS9ayPpt90978d441nWAR-UpogdP3rxU/edit?usp=sharing')}>{" "}here</Text>
                .
            </H5>),
        new Milestone(
            'NOVEMBER 2019',
            'Join Us!',
            Images['joinus'],
            <H5 style={{
                textAlign: 'left', fontFamily: "DINPro-Medium",
                fontSize: 11.5
            }}>
                We’re back for our fifth iteration! We are so excited to celebrate half a decade of Technica and host the
                future of technology for a weekend immersed in learning, connecting, and personal growth.
            </H5>
        ),
    ]
;
// This is the part of the app users goes to for our milestones
export default class About extends Component<Props> {

    constructor(props) {
        super(props);
    }

    renderIcon(milestone, align) {
        let imageInfo = resolveAssetSource(milestone.image);
        return (
            <View style={{justifyContent: 'center', alignItems: align,}}>
                <Image
                    style={{
                        width: imageInfo.width * .5,
                        height: imageInfo.height * .5,
                        borderRadius: 4,
                        marginRight: 15,
                        marginBottom: 5
                    }}
                    source={milestone.image}
                />
            </View>
        )
    }

    renderPayload(milestone, align) {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <H3 style={{textAlign: align}}>{milestone.date}</H3>
                <H3 style={{textAlign: align, marginBottom: 10}}>{milestone.name}</H3>
                {milestone.payload}
            </View>
        )
    }

    renderMilestone(milestone, index) {
        if (index % 2 == 0) {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50}}>
                    {this.renderIcon(milestone, 'flex-start')}
                    {this.renderPayload(milestone, 'right')}
                </View>
            )
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50}}>
                    {this.renderPayload(milestone, 'left')}
                    {this.renderIcon(milestone, 'flex-end')}
                </View>
            )
        }
    }

    // Completes overall setup of the page
    render() {
        let index = 0;
        return (
            <ViewContainer>
                <ViewContainer style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Images['technica_logo']} style={styles.logo}/>
                </ViewContainer>
                <SubHeading
                    style={{textAlign: 'center', color: 'white', fontSize: 45, marginTop: 10, marginBottom: 0}}>
                    Milestones
                </SubHeading>
                <SubHeading style={{textAlign: 'center', color: 'white', fontSize: 15, marginBottom: 20,}}>
                    We've come a long way
                </SubHeading>
                <ViewContainer>
                    <FlatList
                        data={DATA}
                        renderItem={({item}) => this.renderMilestone(item, index++)}
                        keyExtractor={item => item.name}
                    />
                </ViewContainer>
            </ViewContainer>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 275,
        height: 55,
        marginTop: 0,
        marginBottom: 0
    },
})