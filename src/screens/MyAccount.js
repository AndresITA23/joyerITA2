import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function MyAccount({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mi Cuenta</Text>
        <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
        <View style={styles.profileContainer}>
          <Text style={styles.label}>NOMBRE:</Text>
          <Text style={styles.name}>VICTOR EDUARDO JUAREZ</Text>
          <Text style={styles.label}>DOMICILIO:</Text>
          <Text style={styles.address}>CALLE EDUARDO SI HAY #762, FARCC. SOVERANA CONVENCIÓN, AGUASCALIENTES, AGUASCALIENTES CP. 20126</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Editar Mi Cuenta')}>
          <Text style={styles.buttonText}>Editar información</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Términos y condiciones</Text>
        </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
    textAlign: 'left',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'left',
  },
  address: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'left',
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
