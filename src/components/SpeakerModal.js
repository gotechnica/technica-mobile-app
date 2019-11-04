import React, {Component, Fragment} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    SafeAreaView,
    ImageBackground
} from 'react-native';
import Images from '../../assets/imgs/index';
import {H1, H2, H3, H4, H6, P} from '../components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {ModalContent, ModalHeader, HorizontalLine, Spacing, modalStyle} from './Base';
import {colors} from './Colors';
import moment from 'moment';
import PhotoView from 'react-native-photo-view';
import Accordion from '@ercpereda/react-native-accordion';

const Data = [
    {
        role: "Opening Keynote Speaker",
        sponsor: 'Co-Founder & CEO of WayUp',
        title: 'Liz Wessel',
        prize: '',
        image:
            require('./images/lizwessel.jpg'),
        description: 'Liz Wessel loves helping people get hired. She is the Co-Founder and CEO of WayUp, the go-to platform used by millions of early-career professionals to get hired, and by thousands of employers to scale their early career recruiting without scaling their recruiting teams -- all with an emphasis on diversity and candidate experience. \n \n Founded in July 2014, WayUp is a venture-backed startup based in NYC that has raised over $30M and was named by CNN as one of the 30 most innovative companies changing the world. WayUp has worked with top companies -- including Fortune 500s, startups, and nonprofits -- to help them reach, recruit, and engage with the next generation of talent. Liz has been featured as one of Forbes’ 30 Under 30, named one of the “18 Coolest Women in Silicon Valley” by Business Insider, and one of New York Business Journal’s \“Most Influential Women.\”\n \nLiz has been a featured speaker at TedX, the Forbes 30 Under 30 Summit, Advertising Week, TechCrunch Disrupt, SXSW, NACE, and several other notable events. Before founding WayUp, Liz worked at Google as a Product Marketing Manager in California and India.'
    },
    {
        role: "Closing Keynote Speaker",
        title: 'Karlie Kloss',
        sponsor: 'American supermodel & Founder of Kode with Klossy',
        prize: '',
        image:
            require('./images/karliekloss.jpg'),
        description: 'Outside of modeling, Karlie Kloss’ passion for technology led her to take her first coding class in 2014. Inspired by code’s creativity and endless possibility, Karlie launched Kode With Klossy in 2015 to empower girls to learn to code and become leaders in tech. Now in its fourth year, the organization hosts free two-week summer coding camps where girls aged 13 to 18 explore concepts in front-end and back-end software engineering.\n \nThis summer, Kode With Klossy will be hosting free coding camps for 1,000 girls in 18 cities across the country. Karlie was recognized on the TIME 100 list for her philanthropic work as the founder of Kode With Klossy and was featured on the covers of Fast Company and Forbes for her work to scale the organization.\n \nKarlie shares each of these experiences — hosting, modeling, coding, baking, traveling and more — on her YouTube channel, Klossy'
    },
    {
        role: "Closing Keynote Speaker",
        title: 'Brendan Iribe',
        sponsor: 'Co-Founder of Oculus',
        prize: '',
        image:
            require('./images/brendaniribe.jpeg'),
        description: 'Brendan Iribe loves working with creative engineers making disruptive products, which are innovative, scale to millions of people, and ultimately change the world. He has a passion for building software, smart hardware, and simple intuitive user experiences.\n \nHe co-founded Oculus VR in 2012 and was one of the original makers of the Rift and Quest virtual reality systems. Oculus was then acquired by Facebook'
    }
];


export default class SpeakerModal extends Component {
    render() {
        const props = this.props;
        const dimensions = require('Dimensions').get('window');
        const imageWidth = dimensions.width - 42;
        const imageHeight = Math.round((imageWidth * 38) / 67);
        // const styles = {width: window.width, height: window.height, overflow:'visible'};

        var list = Data.map((data, index) => {
            const header = ({isOpen}) => (
                <View
                    style={[
                        styles.header,
                        index % 2 == 1
                            ? {backgroundColor: '#464343'}
                            : {backgroundColor: '#464343'},
                    ]}>
                    <Image
                        source={data.image}
                        style={styles.image}></Image>
                    <View style={styles.headerText}>
                        <Text
                            style={{
                                color: '#fff',
                                lineHeight: 22,
                                fontFamily: 'Poppins',
                                textAlign: 'center',
                                paddingBottom: 5

                            }}>
                            {data.role}
                        </Text>
                        <Text allowFontScaling
                              style={{
                                  fontFamily: 'DINPro-Bold',
                                  lineHeight: 22,
                                  color: '#fff',
                                  textAlign: 'center',

                              }}>
                            {data.title}
                        </Text>
                        <Text adjustsFontSizeToFit allowFontScaling
                              style={{
                                  fontFamily: 'DINPro-Regular',
                                  lineHeight: 22,
                                  color: '#fff',
                                  textAlign: 'center'

                              }}>
                            {data.sponsor}
                        </Text>

                        <Text allowFontScaling
                              style={{
                                  color: '#fff',
                                  lineHeight: 22,
                                  fontFamily: 'Poppins',
                                  textAlign: 'center',
                                  paddingTop: 10
                              }}>
                            (Touch to read full bio!)

                        </Text>
                    </View>
                </View>
            );

            const content = (
                <View
                    style={
                        styles.content
                    }>

                    <Text style={styles.contentText}>
                        {data.description}
                    </Text>
                </View>
            );

            return (

                <Accordion
                    key={index}
                    header={header}
                    content={content}
                    duration={300}
                    style={{alignSelf: 'center'}}></Accordion>

            );
        });

        return (
            <View>
                <ImageBackground source={require('./images/bgimage.jpg')} style={{
                    width: '100%', height: '100%', backgroundColor: '#000000',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    {list}
                </ImageBackground>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {

        backgroundColor: '#000000',
        alignItems: 'center',
        alignContent: 'center',


    },
    accordian: {
        flex: 1,
    },
    header: {

        height: 350,
        paddingTop: 30,
        paddingRight: 30,
        paddingLeft: 30,
        paddingBottom: 30,
        width: 250,
        alignItems: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        borderRadius: 25,
        marginBottom: 40,


    },
    headerText: {
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        paddingBottom: 50,
        fontSize: 100


    },
    content: {
        alignSelf: 'center',
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        flexDirection: 'column',
        alignContent: 'space-around',
        marginBottom: 50,
        backgroundColor: '#464343'
    },

    contentText: {
        fontFamily: 'DINPro-Regular',
        color: '#fff',
        textAlign: 'center'

        // paddingTop: 15,
        // paddingRight: 15,
        // paddingBottom: 15,
        // paddingLeft: 15,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 200 / 2,
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 20
    }
}); 