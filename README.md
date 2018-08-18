# Technica 2018 Mobile App

This is the the mobile app for Technica's 2018 hackathon.

# Quick Start

1. `npm install`

2. `react-native link`

3. `react-native run-ios` or `react-native run-android`

# Setting up notifications on iOS

1. `sudo gem install cocoapods`

2. `cd ios && pod install && cd ..`

# Setting up AWS mobile hub #

Because we are using AWS mobile hub in our project you will need to pull the required configuration files to connect to the AWS instance. Once this is set up you will only need to run `aws mobile pull` when adding new AWS capabilities to the app

0. Request cli credential access from somebody (either Tal or someone on mobile backend)

1. Configure aws cli if you haven't already https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html, make sure your credentials are saved in `~/.aws/credentials`

2. Configure awsmobile cli https://docs.aws.amazon.com/aws-mobile/latest/developerguide/aws-mobile-cli-reference.html. 

3. After you run `awsmobile configure`, it will use your cli credentials to find the technica mobile app project

4. Run `awsmobile pull` from now on to update the `aws-exports.json` this file is read by `App.js` to configure aws capabilities.

# Testing notifications (android and iOS) #

1. Log in to the firebase console [here](https://console.firebase.google.com/project/technica-mobile-app/notification)

2. Click 'Cloud Messaging' on the right side if it's not already on that page

3. Click new message

4. For target select 'Single device', paste the fcm token spit out by the debugger when the app opens

5. Enter in a message text

6. Click Advanced and enter a title

7. Click send message

8. Try sending a message while the app is open and once again while app is closed. Both should display the same (you can just duplicate the first message and send it again).

# Built With

- React-Native

- Redux 
