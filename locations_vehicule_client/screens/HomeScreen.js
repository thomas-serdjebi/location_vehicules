import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez nos véhicules pour vos déplacements !</Text>
      <Button
        title="Faire une pré-réservation"
        onPress={() => navigation.navigate('PreReservation')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
});
