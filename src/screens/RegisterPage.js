import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native"
import { auth } from '../../utils/firebase.js';
import Toast from 'react-native-toast-message';

function RegisterPage({ onRegister, onBack }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
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
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Registro exitoso',
        text2: 'Bienvenido a la aplicación!',
      });

      // Logic to navigate
      onBack

    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error al registrar',
        text2: 'Hubo un problema al registrar el usuario',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <Text style={styles.registerText}>Registrate</Text>
      
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
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.inputUnderline}
          placeholder="ejemplo123"
          value={username}
          onChangeText={setUsername} 
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
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonBack} onPress={onBack}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 15,
  },
  registerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 0,
    marginBottom: 30,
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
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#525252',
  },
  button: {
    backgroundColor: '#DD6B17',
    borderRadius: 100,
    width: 150,
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
  },
  buttonGoogle: {
    backgroundColor: '#DD6B17',
    borderRadius: 100,
    width: 218,
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  buttonBack: {
    backgroundColor: '#DD6B17',
    borderRadius: 100,
    width: 150,
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
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
    height: 480,
    bottom: 0,
    backgroundColor: '#D2AC8F',
    borderTopLeftRadius: 250,
    borderTopRightRadius: 250,
    zIndex: 0,
  },
});

export default RegisterPage;