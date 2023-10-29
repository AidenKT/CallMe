import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  Vibration,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

export function AppleFakeCall({ route, navigation }) {
  
  const backgroundImage = require('../assets/ios17Background.png');

  const [sound, setSound] = React.useState();

  const continueVibrate = React.useRef(true);
  
  const callReceived = React.useRef(false);

  const { callerID } = route.params;

  console.log(callerID)

  async function vibrate() {
    if (continueVibrate.current == true) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Heavy);
      setTimeout(() => {
        if (continueVibrate.current == true)
          Vibration.vibrate(3000);
      }, 1000);

    setTimeout(() => {
      if (continueVibrate.current == true) {
        vibrate();
      }
    }, 1500);
  }
}

  async function playRingtone() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/fakeCallRingtone.mp3'),
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      })
    );
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    if(!callReceived.current){
      callReceived.current = true;
      setTimeout(() => {
        vibrate()
      }, 500);

      playRingtone();

      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }
  });

  const handleDeclinePress = () => {
    continueVibrate.current = false;
    sound.unloadAsync();
    navigation.navigate('Confirmation', {
      passedType: 'fakeCallDecline',
    });
  };

  const handleAcceptPress = () => {
    continueVibrate.current = false;
    sound.unloadAsync();
    navigation.navigate('AppleOnCall', {
    });
  };

  return (
    <View style={styles.callContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        blurRadius={50}
        style={styles.backgroundImage}>
        <View style={{ backgroundColor: 'rgba(0,0,0, 0.35)' }}>
          <StatusBar barStyle="light-content"/>
          <StatusBar style="light"/>
          <View style={styles.iOSCallID}>
            <Text style={styles.iOSName}>{callerID}</Text>
            <Text style={styles.iOSSubText}>mobile</Text>
          </View>
          <View style={styles.iOSSmallerOptions}>
            <Ionicons name="ios-alarm" size={22} color="white" />
            <Ionicons
              name="ios-chatbubble"
              style={{ marginLeft: '50.75%' }}
              size={22}
              color="white"
            />
          </View>
          <View style={styles.iOSSmallerOptionsText}>
            <Text style={{ color: 'white', fontSize: 12, margin: 0 }}>
              Remind Me
            </Text>

            <Text
              style={{
                marginLeft: '41%',
                color: 'white',
                fontSize: 12,
                margin: 0,
              }}>
              Message
            </Text>
          </View>
          <View style={styles.iOSOptions}>
            <TouchableOpacity
              style={styles.iOSDecline}
              accessibilityLabel="Decline the fake phone call."
              onPress={handleDeclinePress}>
              <Ionicons
                name="ios-call"
                style={{ transform: [{ rotate: '135deg' }] }}
                size={34}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iOSAccept}
              onPress={handleAcceptPress}
              accessibilityLabel="Accept the fake phone call.">
              <Ionicons name="ios-call" size={34} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.iOSOptionsText}>
            <Text style={{ color: 'white', fontSize: 12, margin: 0 }}>
              Decline
            </Text>

            <Text style={styles.iOSAcceptText}>Accept</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

global.__reanimatedWorkletInit = () => {};

const styles = StyleSheet.create({
  callContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
  },
  backgroundImage: {
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  iOSName: {
    margin: 0,
    fontSize: 35,
    fontWeight: 'thin',
    textAlign: 'center',
    color: 'white',
  },
  iOSSubText: {
    margin: 0,
    fontSize: 20,
    fontWeight: 'thin',
    textAlign: 'center',
    color: 'white',
    opacity: 0.5,
  },
  iOSDecline: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: '#F54236',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iOSAccept: {
    marginLeft: '35%',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: '#2AC953',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iOSAcceptText: {
    marginLeft: '45%',
    color: 'white',
    fontSize: 12,
  },
  iOSSmallerOptionsText: {
    marginTop: 6,
    marginBottom: '16%',
    fontSize: 8,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9,
  },
  iOSSmallerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOptionsText: {
    marginTop: 10,
    fontSize: 8,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9,
    paddingBottom: '30%',
  },
  iOSCallID: {
    fontSize: 20,
    marginBottom: '95%',
    paddingTop: '29%',
    textAlignVertical: 'top',
    fontWeight: 'thin',
    textAlign: 'center',
    color: 'white',
  }
});

export default AppleFakeCall;