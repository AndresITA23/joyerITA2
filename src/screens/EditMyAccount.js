import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

function EditMyAccount({ navigation }) {
  const [name, setName] = useState('VICTOR EDUARDO JUAREZ');
  const [address, setAddress] = useState('CALLE EDUARDO SI HAY #762, FARCC. SOVERANA CONVENCIÓN, AGUASCALIENTES, AGUASCALIENTES');
  const [postalCode, setPostalCode] = useState('20126');
  const [infoUpdated, setInfoUpdated] = useState(false);

  const handleUpdate = () => {
    setInfoUpdated(true);
    // Aquí puedes agregar la lógica para guardar los datos actualizados
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
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
