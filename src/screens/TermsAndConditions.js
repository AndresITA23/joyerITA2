import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function TermsAndConditions({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Términos y condiciones</Text>
        <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <View style={styles.termsContainer}>
          <Text style={styles.text}>
            • El usuario se compromete a proporcionar información veraz.
          </Text>
          <Text style={styles.text}>
            • La contraseña del usuario debe mantenerse confidencial.
          </Text>
          <Text style={styles.text}>
            • Restricciones de uso: El usuario no debe utilizar la plataforma para actividades ilegales.
          </Text>
          <Text style={styles.text}>
            • Limitación de responsabilidad: La plataforma no se hace responsable de daños indirectos.
          </Text>
          <Text style={styles.text}>
            • Ley aplicable y jurisdicción: Estos términos se rigen por las leyes de México.
          </Text>
          <Text style={styles.text}>
            • Modificación de los términos: La plataforma puede modificar estos términos en cualquier momento.
          </Text>
          <Text style={styles.text}></Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
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
  termsContainer: {
    width: '80%',
    backgroundColor: '#D2AC8F',
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    position: 'relative',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
    textAlign: 'left',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#DD6B17',
    fontWeight: 'bold',
  },
});

export default TermsAndConditions;
