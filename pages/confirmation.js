import * as React from 'react';
import { useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Animated
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as WebBrowser from 'expo-web-browser';


// You can import from local files
import SirenLogo from '../components/logo.js';
import LanguageSelect from '../components/language.js';

export function Confirmation({ props, route, navigation }) {
  const { passedType } = route.params;

  let completedAction;
  let titleAction;
  //let warning

  if (passedType == 'fakeCallComplete') {
    titleAction = 'Ended the mock phone call';
    completedAction =
      "Explore recommended safety measures.";
    prompt = 'Back to Home Screen';
    //warning = "It is illegal to make illegitimate calls to authorities.";
  }
  if (passedType == 'fakeCallDecline') {
    titleAction = 'Fake call declined';
    completedAction =
      "You declined our phony phone call.";
    prompt = 'Back to Home Screen';
    //warning = "It is illegal to make illegitimate calls to authorities.";
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <StatusBar style="light" />
      <View style={styles.iconConfirm}>
        <MaterialIcons name="check-circle" size={128} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>{titleAction}</Text>
      <Text style={styles.subtitle}>{completedAction}</Text>

      <TouchableOpacity
        style={styles.backHomeButtonBackground}
        onPress={() => navigation.popToTop()}
        labelStyle={{ color: 'black', fontWeight: '500' }}
        color="#3E68FF"
        activeOpacity={0.7}
        uppercase={false}
        mode="contained"
        accessibilityLabel="Back to Home Screen.">
        <Text style={styles.button}>Back to Home Screen</Text>
      </TouchableOpacity>
        <Text style={styles.aboutText}>
          <Text>
            Created by Aiden Tabrizi{"\n"}
          </Text>
          <Text
            onPress={() => {
              Alert.alert(`About`, `Created by Aiden Tabrizi\n \nI created CallMe to help anyone who needs a reason to leave a dangerous situation. Most fake calling apps don't look convincing and never scare attackers away. By making an harasser truly believe that a victim has somewhere to be, or someone on their way - they will be less likely to pursue that victim. This precious time can be the difference between danger and escape. If this app is helpful to you, all I ask is that you share it with your friends.`);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
            }}
            style={styles.underlineText}>
            About
          </Text>
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#272727',
    padding: 8,
  },
  title: {
    margin: 0,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  subtitle: {
    margin: 12,
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  aboutText: {
    marginTop: 160,
    fontSize: 17,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  notifyImmediately: {
    margin: 12,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'underline',
  },
  instructions: {
    marginTop: 95,
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  confirmTerms: {
    marginTop: 85,
    fontSize: 16,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  button: {
    margin: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  iconConfirm: {
    flex: 0.5,
    marginBottom: 50,
    frontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: '#FFFFFF',
  },
  cancelButtonBackground: {
    flex: 0.4,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 90,
  },
  backHomeButtonBackground: {
    flex: 0.225,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 185,
    marginBottom: 0,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

export default Confirmation