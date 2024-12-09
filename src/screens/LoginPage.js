import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../utils/firebase.js';
import Toast from 'react-native-toast-message';

function LoginPage({ onSignIn, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Por favor ingresa correo y contraseña',
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario autenticado:', userCredential.user);

      await AsyncStorage.setItem('email', email);

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Inicio de sesión exitoso',
        text2: '¡Bienvenido de nuevo!',
      });

      onSignIn();

    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);

      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error al iniciar sesión',
        text2: 'Correo o contraseña incorrectos',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <Text style={styles.loginText}>Iniciar sesión</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.inputUnderline}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.inputUnderline}
          placeholder="contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      
      <Text style={styles.registerText}>
        ¿Aún no tienes cuenta? 
        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.linkText}> Registrate aquí</Text>
        </TouchableOpacity>
        .
      </Text>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  logo: {
    width: 184,
    height: 190,
    marginTop: 0,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 50,
    marginBottom: 100,
    marginBottom: 40,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputUnderline: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#525252',
  },
  button: {
    backgroundColor: '#DD6B17',
    borderRadius: 100,
    width: 150,
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  buttonGoogle: {
    backgroundColor: '#DD6B17',
    borderRadius: 100,
    width: 218,
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  registerText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#007BFF', // Color azul estilo enlace
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Sin subrayado
    textAling: 'center',
  },
  register: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginTop: 40,
  },
  registerLink: {
    color: '#7F1D1D',
  },
  circle: {
    position: 'absolute',
    width: 550,
    height: 470,
    bottom: 0,
    backgroundColor: '#D2AC8F',
    borderTopLeftRadius: 250,
    borderTopRightRadius: 250,
    zIndex: 0,
  },
});

export default LoginPage;
