import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import PreReservationScreen from '../screens/PreReservationScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Stack.Screen name="PreReservation" component={PreReservationScreen} options={{ title: 'Pré-Réservation' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
