import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', title: 'Collar de cerezas', price: '$120.00', description: 'Un hermoso collar con diseño de cerezas.', image: require('../../assets/images/collar_cereza.png') },
  { id: '2', title: 'Pulsera de corazones', price: '$80.00', description: 'Pulsera con pequeños corazones colgantes.', image: require('../../assets/images/pulsera_1.png') },
  { id: '3', title: 'Strap de corazón', price: '$50.00', description: 'Strap de corazón para tu teléfono móvil.', image: require('../../assets/images/strap_1.png') },
  { id: '4', title: 'Collar de corazón', price: '$140.00', description: 'Collar con un colgante en forma de corazón.', image: require('../../assets/images/collar_1.png') },
];

function Catalogo({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <TextInput style={styles.searchBar} placeholder="Buscar productos..." />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Personalizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30,
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '90%',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  listContainer: {
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    width: '45%',
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
