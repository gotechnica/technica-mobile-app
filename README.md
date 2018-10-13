# Technica 2018 Mobile App

This is the the mobile app for Technica's 2018 hackathon.

# Quick Start

1. `npm install`

2. `react-native link`

3. `react-native run-ios` or `react-native run-android`

# Setting up notifications on iOS

1. `sudo gem install cocoapods`
  * Make sure you have version `pod --version` outputs 1.5.3 (not 1.4.0)

2. `cd ios && pod install && cd ..`

# Setting up AWS mobile hub #

Because we are using AWS mobile hub in our project you will need to pull the required configuration files to connect to the AWS instance. Once this is set up you will only need to run `aws mobile pull` when adding new AWS capabilities to the app

0. Request cli credential access from somebody (either Tal or someone on mobile backend)

1. Configure aws cli if you haven't already https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html, make sure your credentials are saved in `~/.aws/credentials`

2. Configure awsmobile cli https://docs.aws.amazon.com/aws-mobile/latest/developerguide/aws-mobile-cli-reference.html.

3. After you run `awsmobile configure`, it will use your cli credentials to find the technica mobile app project

4. You will need to run `awsmobile init 6308bcc8-4bd7-4214-b5c1-1b1055829818` to connect to the backend

5. Run `awsmobile pull` from now on to update the `aws-exports.json` this file is read by `App.js` to configure aws capabilities.

# Testing notifications (android and iOS) #

1. Log in to the firebase console [here](https://console.firebase.google.com/project/technica-mobile-app/notification)

2. Click 'Cloud Messaging' on the right side if it's not already on that page

3. Click new message

4. For target select 'Single device', paste the fcm token spit out by the debugger when the app opens

5. Enter in a message text

6. Click Advanced and enter a title

7. Click send message

8. Try sending a message while the app is open and once again while app is closed. Both should display the same (you can just duplicate the first message and send it again).

# Building the app on Android

0. In the project root run the command `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`

1. Open up android studio

2. Click Build -> Generate Signed APK

3. Click next, then select the keystore path (ask somebody for the `technica-release-key.keystore` file)

4. For key alias enter `technicasigningkey`

5. For the key and store password enter the key password (ask the same person for the password)

6. Select destination folder as `.../technica-mobile-app/android/app/build/outputs/apk`

7. Select build type `release`

8. Select v1 and v2 ignature versions

9. Select build, the apk will end up in the `outputs/apk/release`

10. In the `android/app/build.gradle`, bump up the version code by 1 and version name by minor / major release order.

11. Commit this update and upload APK to google play store under releases

# Building the app on iOS

1. Under `ios/technica/Info.plist`, comment out the following lines:

```
<key>localhost</key>
<dict>
  <key>NSExceptionAllowsInsecureHTTPLoads</key>
  <true/>
</dict>
```

2. Download the release provisioning profile from the apple dev account, double click to load into xcode, it should be called `Technica Distribution Provisioning Profile`

3. Under general tab, in the technica target, make sure it is selected under release signing section.

4. Select generic iOS device under build tager, and Press Command-B to build the app, hope it works

5. If that succeeds, click Product -> Archive

6. Once the archive is created, click Window -> Organizer, you should see the archive you just created.

7. Select the archive and click validate app, leave everything checked, and select the Technica Distribution provisioning profile

8. If this succeeds, click distribute app to upload it to app store connect.

9. `git checkout ios/technica/Info.plist` in order to add the localhost exception back (do this before step 10 since it will modify `Info.plist`, if you don't do this building on emulator won't work for debug version)

10. Increment the version and build number under the general tab, then commit the version change (can combine android version bump into one commit).


# Built With

- React-Native

- "Flux"
