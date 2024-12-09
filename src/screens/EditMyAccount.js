import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

function EditMyAccount({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [infoUpdated, setInfoUpdated] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedAddress = await AsyncStorage.getItem('address');
        const storedPostalCode = await AsyncStorage.getItem('postalCode');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedUsername = await AsyncStorage.getItem('username');
        const storedProfileImage = await AsyncStorage.getItem('profileImage');
        if (storedName) setName(storedName);
        if (storedAddress) setAddress(storedAddress);
        if (storedPostalCode) setPostalCode(storedPostalCode);
        if (storedEmail) setEmail(storedEmail);
        if (storedUsername) setUsername(storedUsername);
        if (storedProfileImage) setProfileImage(storedProfileImage);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const handleUpdate = async () => {
    if (!name || !address || !postalCode || !username) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('address', address);
      await AsyncStorage.setItem('postalCode', postalCode);
      await AsyncStorage.setItem('username', username);
      if (profileImage) {
        await AsyncStorage.setItem('profileImage', profileImage);
      }
      setInfoUpdated(true);
      navigation.navigate('Mi Cuenta Tab', { updated: true }); // Navegar de regreso a "Mi Cuenta" con un parámetro
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <View style={styles.header}>
          <Text style={styles.headerText}>Editar mi cuenta</Text>
          <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Text style={styles.label}>CORREO ELECTRÓNICO:</Text>
            <Text style={styles.email}>{email}</Text>
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
            <TouchableOpacity style={styles.buttonUpload} onPress={pickImage}>
              <Text style={styles.buttonText}>Subir nueva fotografía</Text>
            </TouchableOpacity>
            {profileImage && (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            )}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
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
    width: '100%',
    alignItems: 'center',
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
  email: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
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
