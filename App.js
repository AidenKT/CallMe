import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './pages/main.js';
import AppleFakeCall from './pages/appleFake.js';
import AppleOnCall from './pages/appleCall.js';
import Confirmation from './pages/confirmation.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Confirmation" component={Confirmation} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen name="Home" component={MainStack} />
      <Tab.Screen name="Suggestions" component={MainStack} />
      <Tab.Screen name="Settings" component={MainStack} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ animation: 'slide_from_bottom', headerShown: false }}>
        <Stack.Screen name="Home" component={MainStack}/>
        <Stack.Screen name="AppleFakeCall" component={AppleFakeCall} options={{ animation: 'fade', gestureEnabled: false }} />
        <Stack.Screen name="AppleOnCall" component={AppleOnCall} options={{ animation: 'fade', gestureEnabled: false }} />
        <Stack.Screen name="Confirmation" component={Confirmation} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
