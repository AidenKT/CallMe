import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import StopwatchTimer from 'react-native-animated-stopwatch-timer';


export function AppleOnCall({ props, route, navigation }) {
  const backgroundImage = require('../assets/ios17Background.png');

  const stopwatchRef = React.useRef(null);
  React.useEffect(() => {
    stopwatchRef.current?.play();
  }, []);

  return (
    <View style={styles.callContainer}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        blurRadius="50"
        style={styles.backgroundImage}>
        <View style={{ backgroundColor: 'rgba(0,0,0, 0.35)', flex: '1' }}>
          <StatusBar barStyle="light-content" />
          <StatusBar style="light" />
          <View style={styles.iOSOnCallID}>
            <Text style={styles.iOSName}>Aiden</Text>
            <StopwatchTimer
              ref={stopwatchRef}
              containerStyle={{ justifyContent: 'center' }}
              digitStyle={styles.iOSSubText}
              textCharStyle={styles.iOSSubText}
              animationDuration={0}
              trailingZeros={0}
              leadingZeros={2}
            />
          </View>
          <View style={styles.iOSOnCallOptions}>
            <View style={styles.iOSOnCallOptionsR1}>
              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-mic-off" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>mute</Text>
              </View>

              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-apps" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>keypad</Text>
              </View>

              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-volume-high" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>audio</Text>
              </View>
            </View>

            <View style={styles.iOSOnCallOptionsR2}>
              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-add" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>add call</Text>
              </View>

              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons name="ios-videocam" size={36} color="white" />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>FaceTime</Text>
              </View>

              <View style={styles.iOSOnCallOptionsButton}>
                <TouchableOpacity style={styles.iOSOnCallButton}>
                  <Ionicons
                    name="ios-person-circle-outline"
                    size={36}
                    color="white"
                  />
                </TouchableOpacity>
                <Text style={styles.iOSOnCallOptionText}>contacts</Text>
              </View>
            </View>
          </View>
          <View style={styles.iOSOptions}>
            <TouchableOpacity
              style={styles.iOSDecline}
              accessibilityLabel="Decline the fake phone call."
              onPress={() => {
                navigation.navigate('Confirmation', {
                  passedType: 'fakeCallComplete',
                });
              }}>
              <Ionicons
                name="ios-call"
                style={{ transform: [{ rotate: '135deg' }] }}
                size={36}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

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
  iOSOnCallButton: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.215,
    height: Dimensions.get('window').width * 0.215,
    backgroundColor: 'rgba(230,230,230,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    blurRadius: '5',
  },
  iOSOnCallOptions: {
    marginBottom: '23%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOnCallOptionsR1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOnCallOptionsR2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOnCallOptionsButton: {
    margin: '3%'
  },
  iOSOnCallOptionText: {
    color: 'white',
    opacity: '0.9',
    fontSize: 15,
    marginTop: '5%',
    textAlign: 'center',
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
  iOSOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iOSOnCallID: {
    fontSize: 20,
    marginBottom: '32%',
    paddingTop: '26%',
    textAlignVertical: 'top',
    fontWeight: 'thin',
    textAlign: 'center',
    color: 'white',
  },
});

export default AppleOnCall;