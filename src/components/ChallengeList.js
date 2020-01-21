import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  AppState,
  StyleSheet,
  Switch,
  ScrollView,
  Linking,
  Dimensions
} from "react-native";

import Accordion from "@ercpereda/react-native-accordion";
import Icon from "react-native-vector-icons/FontAwesome";
import Images from "../../assets/imgs/index";
import firebase from "react-native-firebase";

const Data = [
  {
    sponsor: "Microsoft",
    title: "Dankest Memes",
    prize: "A Google Home Hub",
    image:
      "https://cdn.vox-cdn.com/thumbor/NeSo4JAqv-fFJCIhb5K5eBqvXG4=/7x0:633x417/1200x800/filters:focal(7x0:633x417)/cdn.vox-cdn.com/assets/1311169/mslogo.jpg",
    description: "Whoever comes up with the dankest memes 420 bruhhh!"
  },
  {
    sponsor: "Facebook",
    title: "Sickest Dab",
    prize: "Hang out sesh with Zuckerberg",
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEUYd/L///8fePIAavEAbvEAcPIAcvINdPIAbPGnwfnF1/u5z/oAc/Ld6f2wy/rr8f34+/9TkvSXuvja5/2Qtvh5qPZhmfV1pfbR4fyjw/mewPnv9f6KsfclfvNvn/U0hPNKjvRknPWrxvkugvOArPc/iPS/1fu1zvrk7v0jfPLK2vvR4vwS2AvuAAAKkUlEQVR4nN3d12LjKhAGYBSEIBtZkeMeucaJk/i8//sduTcVYPiFdudqb9b2FxBNA7AAHllvm7xPB/PucjH7fWJPv7PFsjsfTN+TbS/Dfz0Dfnbae+mvFpKrUIgollKyU+T/jiMhQsXlYtV/6aXAX4ESdpLBV5TT4gurOGScQ6OvQdIB/RKEsDMZxkpEdbYbZyRUPJwglK6F6WbEuDDBXTEFZ6ON6xrrVJgl3TCMrXSniMOwmzhtf9wJ0+9uaFl490UZdr/dlaQr4XikQhe8IzJUo7GjX+ZEmE7WnFY5HyPm64mTgnQg/BkIJ7XzPqQQg58WCHtDHgF4h4j4sOdZOF5yRPFdQvIl8YEkCeE+F0aCsDNswHcwDgmDHWthOmrIdzCOrNtVW+G7wrUvRRGp90aF41nYqG8X4czucbQRpvMGK+glJJ/bVFUL4SZutoJeIoo3DQjTFffk2wVfGRejqXDMfBXgISJm+jQaCqc+C/AQfAoUZgvh25eHWBjNkE2EW8gUwjyk2GKEb/5r6Cn4G0I4VL5dV6GGzoXZug2P4CXEWvdh1BR2ZDsewUtIqTnf0BNuVduAOVHptTdawqQ9bcx18MSVcNJOYE6cuBG2qJe4D51eo17Yby8wJ/bpwn6busHHULXEOmGLq+ghaitqjbC1jcwl6pqbamFLu4nbqOk0KoV//gZgTvxjK+y0u5G5hKoawFUIs9aNRctCyopheIVw/bcAc+LaRjhs13SpOkT5fLFU+Pa3PISHUKXdYplw21AzKiMRKiVixp722UOKq30KlXEbwMvmUiXC1yaqaCx4uPycbHqv2XGdN02zn9725aM/GC5izo3SjsSrkXABb2UiFc2Tytf0aWf7MR3+hpp/bLkwEU7BRSgV+9Rdu04nmj9GFC8VFwrH2IdQ8uWLJm8XL7p/bl74RysSpmBf9z8Dn4GQsaLXNkXCFfLlS7gwfbWiL4xWesINsI7KUGdpxVbIeMH7xUdh6jp/6yrEV0mT7kjI4sd6+iic4+oo/zT3mQmjeb0Q2I7yDxugkbCgPX0QzmB9vbJ4CW8slLM64TssjaR04OhUyML7vJs7YQqbURQ1cwghU3eNzZ1whGpmrFOajIXRqErYQTUz4rGNQwkZv121uRV2Qc3M4/MPFMpuuRDWU3BKpq+p8K7HuBEuQUVYMq9BCeWyTIjr7ClAc+FtIV5/OaoIlda7WofCm0K8EvZARVi1mIkR3jz3V8IhqAjD78aF8mr59CL8QT2FTzSgjZDxyxrXRTgADWeEQYaWM2E0eBSmqOU1Tt1rZyNk4jw6PQt11+xM426E0ZjwvFpyFqLmhYLWVdgKL+PEkxA3YCNvCLUSXnr9k3AEWn+SX1SgpTA+TaKOQtjMV9Sn9NxH9noT2YddC3GaCR+FCWrxQlVmEdzH+G34KxS/DcsmMExuhKiJIQv1H8PXqVQOM8lPjfhBmMGWZ361gVPluL9S2ZUwQXX3Ujcf++fX+U849lMHIaySRppz3x4gCflYTffCFLZIKvSWuV8hPyBMz8INTKiZi41J3Qk3ZyGqu8+FWktQb5hm4NDp74WQz9+H1pgNNq1hJyFsHfh6ElMR77CJW+cofMZlXsQ6lRSWQCeej0LUAk0eUgP4CqtC+954JwS+1tZZKf3GViGGTZTVWYWa4l6r71JrGXDIxvSEwIdkN3BjuEW2XegIv3DC3ZIbg36DlnCG+/rdCgMLUmQGlI7wCfj9UZoLe8hkYN/CfNTIgm/kIR6+heF3Luwjc0l9C0U/F66QHb5vYbzKhdCEZ99CuciF0Ixu38J8YMwyaMazdyHPGLSz8C9UPbaFnvjkXRhuGXLc3QKhSBhsCWEf/oXvDDg7Yy0QRlM2QHb4/oXxgM3/8f5wzmCvLPbhX9hlS+Tn+xfmvgX08/0LFwy4hsDaIJyxX+jn+xf+Mvrnx6I8Ig1hVPH/8yD+Ogd/v+jzuSI0hFX//fn544v6A8nG0HYvjGYQG4on+nMYGmXMmAdx7vNLb0vBQmpi74zeH4KFf4hluKCPacBC6uxuSR+XgoXEuU8+LiXPLcBC4iaQfG5Bnh+ChcTeLJ8fkuf4WGFGbGjyOT55nQYr/I+42Cne6WttWCH154mEvl6KFVJPWQm39DVvrJCaxqB69PcWWCE1X4pn9HdPUCE5qU86eH8IFVLH3fv3h9R3wFDhH2IrsX8HTH2PDxVSe+v9e/wXYncBFVLHlOGLg3waqJC6+XqfT0PNiYIKqYPmfU4UNa8NKaR21oe8NmpuIlI4Jj5Bx9xE4uAWKaRuqTvmlxJzhJFC6uT1mCNMzPNGCqnj7mOeN/FzkELicvU5V5+23wIopI67z/staHtmgELqLoLznhnaviegkLynLghc7F0DConj7qu9a6S/FfDtGnHX4NX+Q9oeUlkROruCKj6ABLzeQ4o7xUxPCPryq33AuI1BPjMVbvZyw/bj+xTe7MeHVVOPwtszFWDbSjwKTwdwgc828Si8O9sEtWHdn/D+fBrUGUP+hA9nDIHOifImfDwnCnTWlzdhwVlf2T8mfDyvDbMd2Jew6Mw9zLmJvoSF5yZCdo17EhaffQk5v9STsOT8UsQZtH6EZWfQInp9P8LSc4QBhehFWH4WNKAQvQgrzvN2P030Iaw6k939eUo+hJXn6ju/G8GDsPpuBOczYQ/CmvstXN9R0ryw7o4S1/PExoX198w47jEaF2rcFeT2vqemhTr3Pbm9s6tpodadXU7vXWtYqHfvmtO785oV6t6d5/L+w4bLUPf+Q4ftaaNC/TssHd5D2qTQ5B5Sd3fJNig0u0vW2eppg0JRctwt+E7n5oSmdzq7upe7MaH5vdyO7lZvSmhzt7qb430bElZdKVUhzKj5LI0Jpaw4VLsq4cXB8bvNCFWn4uMrU3roDWojwuobTquTlhIqsQkhr76NqCYta0IkNiDkNfdg1yWevdGIeCGvu/SsNrWuT2pu4EJVexdRffJgn1KKaCGvv2xJIz2SUlHBwtoqqiekNDdYYV0joy0kdBpQYU03YSIM/the5QMUSs3rwDQvsu1YjlFxQimrhmrmwiBbW02mYEKx1r3uTP8y4qFNx4gSKt27wEyEVr0GSKjTS1gIg635zXYQoRQmm1iMrsx+XZg+jAihWLya/GjDS8GnhjUVIOSGF7WbXns+ZkavbZwLI1a4dO9QGKQrk2J0LeQrnUvAaMIg2MT6xehWGMUF7wfrwkIYpHOu26i6FEo+Ny7AwE6YP40zzaQUh8JwZvoEHsJOGATvSquqOhNG6j5PRjdshUE60qmqjoSSj2wq6D6shfl8o1tvdCKUvKs5jygKgjB/HJd1RgdCyZd2D+AxSMJ6I1lI9ZGFQdAb8oo2hyiM+FDrqtaqIAuD4OdTlE46KEIpxOdP/X+vCwfCIMgma16cK2YvjPl6on9reUU4EeYxHqmwoCAthTJUI+Ljdw5XwryDTLrhQ221EUoRdhPr7u8h3AnzyHJkGJOEcZjznNTOUzgV5pFuRoxfitJIKAVno4270juEa+EuOpNhrEQkDYQyEioeTghDl9JACHfRSQZfkVI6dzrHSkVfgwSh2wVKuIu0913/8isI+t891zXzOpDCdsT/XQCprmUCIQsAAAAASUVORK5CYII=",
    description: "Let's see ya'll dab"
  },
  {
    sponsor: "Amazon",
    title: "Best hack to make Jeff Bezos richer",
    prize: "$1000 Amazon Gift Card",
    image:
      "http://g-ec2.images-amazon.com/images/G/01/social/api-share/amazon_logo_500500._V323939215_.png",
    description: "Ya boy not rich enough, make me more money!!"
  },
  {
    sponsor: "Dropbox",
    title: "How long can you sit in a box?",
    prize: "A crisp high five from Noga",
    image:
      "https://www.lifewire.com/thmb/x4IKvuzMA0yHNvkRCUzyhGWbqrU=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/dropbox-5b9121a0c9e77c007b5f5ea6.png",
    description: "Lets see who can sit in a box the longest period of time!!"
  },
  {
    sponsor: "Technica",
    title: "The best hack to make UMD football good",
    prize: "Pride in our school once more",
    image:
      "https://pbs.twimg.com/profile_images/1006417489981419520/0azCeqeg.jpg",
    description: "UMD football sucks, lets see if you can make it better..."
  },
  {
    sponsor: "NSA",
    title: "Shhhh",
    prize: "Security Clearance",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Seal_of_the_U.S._National_Security_Agency.svg/1200px-Seal_of_the_U.S._National_Security_Agency.svg.png",
    description: "Please don't talk to us unless you have security clearance"
  },
  {
    sponsor: "UMIACS",
    title: "The best use of Iribe space",
    prize: "A closet in Iribe",
    image: "https://avatars3.githubusercontent.com/u/13200674?s=280&v=4",
    description:
      "Create a hack in which you take away as much space from students as possible"
  }
];

export default class ChallengeList extends Component {
  getChallenges() {
    var challengesList = [];
    firebase
      .database()
      .ref("/Challenges")
      .on("value", async snapshot => {
        snapshot.forEach(challenge => {
          challengesList.push(challenge.val());
        });
      });

    return challengesList;
  }

  render() {
    var list = getChallenges().map((data, index) => {
      const header = ({ isOpen }) => (
        <View
          style={[
            styles.header,
            index % 2 == 1
              ? { backgroundColor: "#464343" }
              : { backgroundColor: "#2d2d2d" }
          ]}
        >
          <Image
            source={{
              uri: data.image
            }}
            style={styles.image}
          ></Image>
          <View style={styles.headerText}>
            <Text style={styles.headerMain}>{data.title}</Text>
            <Text style={styles.headerSponsor}>{data.sponsor}</Text>
            <Text style={styles.headerPrize}>
              <Icon name="trophy" style={{ paddingRight: 5 }}></Icon>
              {"  " + data.prize}
            </Text>
          </View>
          {isOpen ? (
            <Icon name="arrow-up" style={styles.arrowIcon}></Icon>
          ) : (
            <Icon name="arrow-down" style={styles.arrowIcon}></Icon>
          )}
        </View>
      );

      const content = (
        <View
          style={[
            index % 2 == 1
              ? { backgroundColor: "#464343" }
              : { backgroundColor: "#2D2D2D" }
          ]}
        >
          {data.description == null ? (
            <View style={{ paddingBottom: 30 }}></View>
          ) : (
            <Text style={styles.contentDescription}>
              <Text style={{ fontWeight: "bold" }}>Description: </Text>
              {data.description}
            </Text>
          )}

          <Text
            onPress={() => Linking.openURL("https://technica2019.devpost.com/")}
            style={styles.devpost}
          >
            To Devpost{" "}
            <Icon style={{ fontSize: 20 }} name="external-link"></Icon>
          </Text>
        </View>
      );

      return (
        <Accordion
          key={index}
          header={header}
          content={content}
          duration={300}
          style={styles.accordion}
        ></Accordion>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView>{list}</ScrollView>
      </View>
    );
  }
}

toDevpost = () => {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  accordion: {},
  header: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 30,
    flexDirection: "row",
    alignContent: "center"
  },
  headerText: {
    color: "#fff",
    alignContent: "center",
    justifyContent: "center",
    lineHeight: 22,
    paddingTop: 0,
    paddingLeft: 40
  },
  headerMain: {
    color: "#fff",
    lineHeight: 22,
    fontFamily: "DINPro-Bold",
    width: Math.round(Dimensions.get("window").width) - 120
  },
  headerSponsor: {
    color: "#fff",
    lineHeight: 22,
    fontFamily: "DINPro-Regular",
    width: Math.round(Dimensions.get("window").width) - 120
  },
  headerPrize: {
    color: "#fff",
    lineHeight: 22,
    fontFamily: "DINPro-Light",
    width: Math.round(Dimensions.get("window").width) - 120,
    paddingBottom: 10
  },
  content: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15
  },

  contentText: {
    fontFamily: "DINPro-Regular",
    color: "#fff",
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15
  },

  contentDescription: {
    fontFamily: "DINPro-Regular",
    color: "#fff",
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 50,
    paddingLeft: 15
  },
  image: {
    top: 5,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignContent: "center"
  },
  devpost: {
    fontFamily: "DINPro-Regular",

    position: "absolute",
    right: 16,
    bottom: 16,
    color: "#fff"
  },
  arrowIcon: {
    position: "absolute",
    right: 8,
    bottom: 8,
    color: "#fff"
  }
});
