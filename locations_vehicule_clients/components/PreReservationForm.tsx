import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import axios from 'axios';

const PreReservationForm = () => {
  const [formData, setFormData] = useState({
    agenceDepart: '',
    agenceArrivee: '',
    dateDebut: '',
    vehicule: '',
    nombreJours: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
  });

  const [agences, setAgences] = useState([]);
  const [vehiculesDisponibles, setVehiculesDisponibles] = useState([]);

  // Récupération des agences depuis votre API
  useEffect(() => {
    const fetchAgences = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/agences');
        setAgences(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des agences :', error);
      }
    };

    fetchAgences();
  }, []);

  // Récupération des véhicules disponibles
  useEffect(() => {
    const fetchVehicules = async () => {
      if (formData.agenceDepart && formData.dateDebut) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/vehicules?agence=${formData.agenceDepart}&date=${formData.dateDebut}`
          );
          setVehiculesDisponibles(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des véhicules :', error);
        }
      } else {
        setVehiculesDisponibles([]);
      }
    };

    fetchVehicules();
  }, [formData.agenceDepart, formData.dateDebut]);

  // Gestion des changements de champs
  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // Validation et soumission
  const handleSubmit = async () => {
    const {
      agenceDepart,
      agenceArrivee,
      dateDebut,
      vehicule,
      nombreJours,
      nom,
      prenom,
      dateNaissance,
    } = formData;

    if (
      !agenceDepart ||
      !agenceArrivee ||
      !dateDebut ||
      !vehicule ||
      !nombreJours ||
      !nom ||
      !prenom ||
      !dateNaissance
    ) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/prereservations', {
        agence_depart_id: agenceDepart,
        agence_retour_id: agenceArrivee,
        date_debut: dateDebut,
        vehicule_id: vehicule,
        nombre_jours: parseInt(nombreJours),
        client: {
          nom,
          prenom,
          date_naissance: dateNaissance,
        },
      });
      Alert.alert('Succès', 'Votre réservation a été enregistrée avec succès !');
      console.log('Réponse API :', response.data);
    } catch (error) {
      console.error('Erreur lors de la soumission de la réservation :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la réservation.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pré-Réservation</Text>

      {/* Sélection Agence de Départ */}
      <Text style={styles.label}>Agence de Départ</Text>
      <Picker
        selectedValue={formData.agenceDepart}
        onValueChange={(value) => handleChange('agenceDepart', value)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez une agence" value="" />
        {agences.map((agence) => (
          <Picker.Item key={agence.agence_id} label={agence.nom} value={agence.agence_id} />
        ))}
      </Picker>

      {/* Sélection Agence d'Arrivée */}
      <Text style={styles.label}>Agence d'Arrivée</Text>
      <Picker
        selectedValue={formData.agenceArrivee}
        onValueChange={(value) => handleChange('agenceArrivee', value)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez une agence" value="" />
        {agences.map((agence) => (
          <Picker.Item key={agence.agence_id} label={agence.nom} value={agence.agence_id} />
        ))}
      </Picker>

      {/* Date de Début */}
      <Text style={styles.label}>Date de Début</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={formData.dateDebut}
        onChangeText={(value) => handleChange('dateDebut', value)}
      />

      {/* Sélection du Véhicule */}
      <Text style={styles.label}>Véhicule</Text>
      <Picker
        selectedValue={formData.vehicule}
        onValueChange={(value) => handleChange('vehicule', value)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez un véhicule" value="" />
        {vehiculesDisponibles.map((vehicule) => (
          <Picker.Item key={vehicule.vehicule_id} label={vehicule.marque} value={vehicule.vehicule_id} />
        ))}
      </Picker>

      {/* Nombre de Jours */}
      <Text style={styles.label}>Nombre de Jours</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de jours"
        value={formData.nombreJours}
        onChangeText={(value) => handleChange('nombreJours', value)}
        keyboardType="numeric"
      />

      {/* Informations Client */}
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre nom"
        value={formData.nom}
        onChangeText={(value) => handleChange('nom', value)}
      />
      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre prénom"
        value={formData.prenom}
        onChangeText={(value) => handleChange('prenom', value)}
      />
      <Text style={styles.label}>Date de Naissance</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={formData.dateNaissance}
        onChangeText={(value) => handleChange('dateNaissance', value)}
      />

      <Button title="Confirmer la Réservation" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default PreReservationForm;
