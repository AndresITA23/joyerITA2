import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyAccount({ navigation, onSignOut }) {
  const [isLandscape, setIsLandscape] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
    return () => {
      subscription?.remove();
    };
  }, []);

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      onSignOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Iniciar sesión' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mi Cuenta</Text>
        <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={isLandscape ? styles.contentLandscape : styles.content}>
        <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
        <View style={isLandscape ? styles.profileContainerLandscape : styles.profileContainer}>
          <Text style={styles.label}>CORREO ELECTRÓNICO:</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.label}>USUARIO:</Text>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.label}>NOMBRE:</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.label}>DOMICILIO:</Text>
          <Text style={styles.address}>{address}</Text>
          <Text style={styles.label}>CÓDIGO POSTAL:</Text>
          <Text style={styles.postalCode}>{postalCode}</Text>
        </View>
        <View style={isLandscape ? styles.buttonContainerLandscape : styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Editar Mi Cuenta')}>
            <Text style={styles.buttonText}>Editar información</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Términos y Condiciones')}>
            <Text style={styles.buttonText}>Términos y condiciones</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 0,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    marginBottom: 30,
  },
  profileContainer: {
    width: '90%',
    backgroundColor: '#D2AC8F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileContainerLandscape: {
    width: '40%',
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
  name: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
  },
  address: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
  },
  postalCode: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
  },
  email: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainerLandscape: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 40,
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
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MyAccount;
