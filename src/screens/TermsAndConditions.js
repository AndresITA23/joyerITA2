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
          <Text style={styles.text}></Text>
          <Text style={styles.text}>
            • Obligación de proporcionar información veraz: El usuario se compromete a proporcionar información precisa y actualizada al registrarse.
          </Text>
          <Text style={styles.text}>
            • Confidencialidad de la contraseña: El usuario es responsable de mantener la confidencialidad de su contraseña y de cualquier actividad que se realice bajo su cuenta.
          </Text>
          <Text style={styles.text}>
            • Restricciones de uso: Se establecen las limitaciones en el uso de la aplicación, como la prohibición de realizar actividades ilegales o que puedan dañar la plataforma o a otros usuarios.
          </Text>
          <Text style={styles.text}>
            • Limitación de responsabilidad: Establece los límites de responsabilidad de la plataforma en caso de cualquier daño o pérdida.
          </Text>
          <Text style={styles.text}>
            • Ley aplicable y jurisdicción: Indica la ley aplicable y el fuero competente para resolver cualquier controversia.
          </Text>
          <Text style={styles.text}>
            • Modificación de los términos: Reserva el derecho de modificar los términos y condiciones en cualquier momento.
          </Text>
          <Text style={styles.text}></Text>
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
    paddingTop: 1,
  },
  termsContainer: {
    width: '80%',
    backgroundColor: '#D2AC8F',
    padding: 15,
    paddingTop: 1,
    borderRadius: 30,
    marginBottom: 20,
    position: 'relative',
  },
  text: {
    fontSize: 15,
    color: '#000000',
    marginBottom: 3,
    textAlign: 'left',
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 30,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#DD6B17',
    fontWeight: 'bold',
  },
});

export default TermsAndConditions;
