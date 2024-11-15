import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

function RegisterPage({ onRegister, onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <Text style={styles.registerText}>Registrate</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput style={styles.inputUnderline} placeholder="email" />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput style={styles.inputUnderline} placeholder="ejemplo123" />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.inputUnderline} placeholder="contraseña" secureTextEntry />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonGoogle}>
        <Text style={styles.buttonText}>Registrarme con Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonBack} onPress={onBack}>
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  registerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 70,
    marginBottom: 60,
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
  buttonBack: {
    backgroundColor: '#DD6B17',
    borderRadius: 100,
    width: 150,
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
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
    height: 590,
    bottom: 0,
    backgroundColor: '#D2AC8F',
    borderTopLeftRadius: 250,
    borderTopRightRadius: 250,
    zIndex: 0,
  },
});

export default RegisterPage;
