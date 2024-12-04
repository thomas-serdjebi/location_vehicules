import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function PreReservationScreen() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    agence_depart_id: '',
    agence_retour_id: '',
    vehicule_id: '',
    date_debut: '',
    nombre_jours: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://votre-backend-url.com/api/pre-reservations', form);
      Alert.alert('Succès', 'Votre pré-réservation a été effectuée avec succès.');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la pré-réservation.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulaire de Pré-Réservation</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={form.nom}
        onChangeText={(text) => handleChange('nom', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={form.prenom}
        onChangeText={(text) => handleChange('prenom', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date de naissance (YYYY-MM-DD)"
        value={form.date_naissance}
        onChangeText={(text) => handleChange('date_naissance', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Agence de départ"
        value={form.agence_depart_id}
        onChangeText={(text) => handleChange('agence_depart_id', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Agence de retour"
        value={form.agence_retour_id}
        onChangeText={(text) => handleChange('agence_retour_id', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ID Véhicule"
        value={form.vehicule_id}
        onChangeText={(text) => handleChange('vehicule_id', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date de début (YYYY-MM-DD)"
        value={form.date_debut}
        onChangeText={(text) => handleChange('date_debut', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de jours"
        keyboardType="numeric"
        value={form.nombre_jours}
        onChangeText={(text) => handleChange('nombre_jours', text)}
      />

      <Button title="Confirmer la réservation" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
