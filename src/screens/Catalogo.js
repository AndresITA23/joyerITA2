

import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const data = [
  { id: '1', title: 'Collar de cerezas', price: '$120.00', description: 'Un hermoso collar con diseño de cerezas.', image: require('../../assets/images/collar_cerezas.png') },
  { id: '2', title: 'Pulsera de corazones', price: '$80.00', description: 'Pulsera con pequeños corazones colgantes.', image: require('../../assets/images/pulsera_1.png') },
  { id: '3', title: 'Strap de corazón', price: '$50.00', description: 'Strap de corazón para tu teléfono móvil.', image: require('../../assets/images/strap_1.png') },
  { id: '4', title: 'Collar de corazón', price: '$140.00', description: 'Collar con un colgante en forma de corazón.', image: require('../../assets/images/collar_1.png') },
  { id: '5', title: 'Collar de flores blancas', price: '$120.00', description: 'Un hermoso collar con diseño de flores.', image: require('../../assets/images/collar_flores_blancas.png') },
  { id: '6', title: 'Pulsera moras', price: '$80.00', description: 'Pulsera con pequeños flores colgantes.', image: require('../../assets/images/pulsera_moras.png') },
  { id: '7', title: 'Strap de corazones', price: '$50.00', description: 'Strap de corazones para tu teléfono móvil.', image: require('../../assets/images/strap_corazones.png') },
  { id: '8', title: 'Collar de flores moradas', price: '$140.00', description: 'Collar con un colgante en forma de flores.', image: require('../../assets/images/collar_flores_moradas.png') },
  { id: '9', title: 'Collar de abejitass', price: '$120.00', description: 'Un hermoso collar con diseño de flores.', image: require('../../assets/images/collar_abejitas.png') },
  { id: '10', title: 'Pulseras corazon', price: '$80.00', description: 'Pulsera con pequeño corazon.', image: require('../../assets/images/pulseras_corazon.png') },
  { id: '11', title: 'Collar de caras felices', price: '$140.00', description: 'Collar con un colgante con caritas.', image: require('../../assets/images/collar_caras_felices.png') },
  { id: '12', title: 'Collar de cerezas', price: '$120.00', description: 'Un hermoso collar con un diseño de una cerezas.', image: require('../../assets/images/collar_cereza.png') },
  { id: '13', title: 'Pulseras corazon rojo', price: '$80.00', description: 'Pulsera con pequeño corazon en color rojo.', image: require('../../assets/images/pulseras_corazon_rojo.png') },
  { id: '14', title: 'Pulseras nombres', price: '$80.00', description: 'Pulsera con nombres grabados.', image: require('../../assets/images/pulseras_nombre.png') },
  { id: '15', title: 'Pulseras tejidas', price: '$80.00', description: 'Pulsera tejidas de manera artesanal', image: require('../../assets/images/pulseras_tejidas.png') },
  { id: '16', title: 'Strap de carita feliz', price: '$50.00', description: 'Strap de carita feliz para tu teléfono móvil.', image: require('../../assets/images/strap.png') },
  { id: '17', title: 'Strap de ojo turco', price: '$50.00', description: 'Strap de ojo turco para tu teléfono móvil.', image: require('../../assets/images/strap_ojo_turco.png') },

];



function Catalogo({ addToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-removebg.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar productos..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Personalizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)} 
            >
              <Text style={styles.buttonText}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 10,
  },
  logo: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingLeft: 20,
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    alignSelf: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  itemTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DD6B17',
    borderRadius: 25,
    padding: 10,
    marginTop: 5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Catalogo;