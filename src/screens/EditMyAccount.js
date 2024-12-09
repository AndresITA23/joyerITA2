import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EditMyAccount({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [infoUpdated, setInfoUpdated] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedAddress = await AsyncStorage.getItem('address');
        const storedPostalCode = await AsyncStorage.getItem('postalCode');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedName) setName(storedName);
        if (storedAddress) setAddress(storedAddress);
        if (storedPostalCode) setPostalCode(storedPostalCode);
        if (storedEmail) setEmail(storedEmail);
        if (storedUsername) setUsername(storedUsername);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleUpdate = async () => {
    if (!name || !address || !postalCode || !email || !username) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('address', address);
      await AsyncStorage.setItem('postalCode', postalCode);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('username', username);
      setInfoUpdated(true);
      navigation.navigate('Mi Cuenta Tab', { updated: true }); // Navegar de regreso a "Mi Cuenta" con un parámetro
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar mi cuenta</Text>
        <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <Text style={styles.label}>CORREO ELECTRÓNICO:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>USUARIO:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.label}>NOMBRE:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>DOMICILIO:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
          <Text style={styles.label}>CÓDIGO POSTAL:</Text>
          <TextInput
            style={styles.input}
            value={postalCode}
            onChangeText={setPostalCode}
          />
          <TouchableOpacity style={styles.buttonUpload}>
            <Text style={styles.buttonText}>Subir nueva fotografía</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Actualizar información</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        {infoUpdated && (
          <View style={styles.infoUpdatedContainer}>
            <Text style={styles.infoUpdatedText}>Información actualizada</Text>
            <TouchableOpacity style={styles.button} onPress={() => setInfoUpdated(false)}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  logo: {
    width: 150,
    height: 150,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  profileContainer: {
    width: '90%',
    backgroundColor: '#D2AC8F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    fontSize: 20,
    color: '#000000',
    borderBottomWidth: 1,
    borderColor: '#DD6B17',
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonUpload: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  infoUpdatedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoUpdatedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
});

export default EditMyAccount;
