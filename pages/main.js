import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Animated,
  ImageBackground
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as WebBrowser from 'expo-web-browser';
import { AsyncStorage } from 'react-native'; // Import AsyncStorage

export function MainScreen({ navigation }) {
  const [time, setTime] = React.useState(-1);
  const countdown = React.useRef(time);
  const timerIdRef = React.useRef(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isCancelButtonVisible, setCancelButtonVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const backgroundImage = require('../assets/Background.png');

  const [callerName, setCallerName] = useState("Aiden"); // Use state for callerName

  const handleButtonPress = () => {
    if (timerIdRef.current) {
      return;
    }

    setTime(5);
    countdown.current = 5;
    setIsButtonPressed(true);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setCancelButtonVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();

    timerIdRef.current = setInterval(() => {
      countdown.current -= 1;
      setTime(countdown.current);
      if (countdown.current === 0) {
        countdown.current = -1;
        setTime(-1);
        setIsButtonPressed(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        // Navigate to the AppleFakeCall screen with the updated callerID
        navigation.navigate('AppleFakeCall', {
          callerID: callerName,
        });

        clearInterval(timerIdRef.current);
        timerIdRef.current = null;

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 20,
          useNativeDriver: false,
        }).start();
        setCancelButtonVisible(false);
        return;
      }
    }, 1000);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  const handleCancelPress = () => {
    setTime(-1);
    setIsButtonPressed(false);
    clearInterval(timerIdRef.current);
    countdown.current = -1;
    timerIdRef.current = null;

    setCancelButtonVisible(false);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1,
        useNativeDriver: false,
      }).start();
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  };

  useEffect(() => {
    // Use useEffect to retrieve callerName from AsyncStorage when the component loads
    const getCallerName = async () => {
      try {
        const savedCallerName = await AsyncStorage.getItem('callerName');
        if (savedCallerName !== null) {
          setCallerName(savedCallerName);
        }
      } catch (error) {
        console.error('Error retrieving callerName:', error);
      }
    };

    getCallerName();
  }, []);

  // Function to update the caller name
  const changeCallerName = async (newCallerName) => {
    try {
      await AsyncStorage.setItem('callerName', newCallerName);
      setCallerName(newCallerName);
      Alert.alert('Success', `Changed caller name to ${newCallerName}.`);
    } catch (error) {
      console.error('Error saving callerName:', error);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <ActionSheetProvider>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" style="light" />
          <TouchableOpacity
            activeOpacity={0.8}
            onLongPress={() => {
              Alert.alert('peekaboo', 'what are u doing', [
                { text: 'Go Back', style: 'cancel' },
              ]);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
            }}
          >
          </TouchableOpacity>

          <Text style={styles.title}>CallMe</Text>
          <Text style={styles.subtitle}>Get a realistic fake phone call in seconds.</Text>

          <View style={styles.mainMenu}>
            <TouchableOpacity
              style={[
                styles.buttonFakeCall,
                { opacity: fadeAnim },
                isButtonPressed && { backgroundColor: 'white' },
              ]}
              onPress={handleButtonPress}
              mode="contained"
              accessibilityLabel="Start the five-second countdown to begin a fake call."
            >
              <View style={styles.iconContainer}>
                {countdown.current >= 0 ? (
                  <View style={styles.countdownContainer}>
                    <Animated.Text style={styles.countdownTimer}>{time}</Animated.Text>
                  </View>
                ) : (
                  <MaterialIcons name="phone" size={52} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttonCancel,
                { opacity: isCancelButtonVisible ? 1 : 0 },
              ]}
              onPress={handleCancelPress}
              mode="contained"
              accessibilityLabel="Cancel the countdown"
            >
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </TouchableOpacity>
          <Text style={styles.aboutText}>
            <Text
              onPress={() => {
                Alert.prompt(`Change Caller`, `Change the name of the fictional caller, this will display in the Caller ID area. \n \n Current Caller: ${callerName}`, (newCallerName) => {
                  if (newCallerName) {
                    changeCallerName(newCallerName);
                  }
                });
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
              }}
              style={styles.underlineText}>
              Change Caller{"\n"}
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
        </View>
      </ActionSheetProvider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 0,
  },
  mainMenu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  title: {
    marginTop: '35%',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  subtitle: {
    margin: 6,
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  iconContainer: {
    marginRight: 8,
  },
  icon: {
    flex: 0.15,
    margin: 0,
    frontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: '#FFFFFF',
  },
  aboutText: {
    marginTop: 160,
    fontSize: 17,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
  },
  buttonFakeCall: {
    flexDirection: 'row',
    backgroundColor: '#3E68FF',
    width: 180,
    height: 180,
    borderRadius: 100,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel: {
    flexDirection: 'row',
    backgroundColor: '#525252',
    width: 90,
    height: 40,
    marginTop: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancelText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
  countdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownTimer: {
    fontSize: 64,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginLeft: 4,
  },
  underlineText: {
    lineHeight: 25,
    textDecorationLine: 'underline',
  },
});

export default MainScreen;
