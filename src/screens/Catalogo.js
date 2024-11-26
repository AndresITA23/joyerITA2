import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const data = [
  { id: '1', title: 'Collar de cerezas', price: '$120.00', description: 'Un hermoso collar con diseño de cerezas.', image: require('../../assets/images/collar_cerezas.png') },
  { id: '2', title: 'Pulsera de corazones', price: '$80.00', description: 'Pulsera con pequeños corazones colgantes.', image: require('../../assets/images/pulsera_1.png') },
  { id: '3', title: 'Strap de corazón', price: '$50.00', description: 'Strap de corazón para tu teléfono móvil.', image: require('../../assets/images/strap_1.png') },
  { id: '4', title: 'Collar de corazón', price: '$140.00', description: 'Collar con un colgante en forma de corazón.', image: require('../../assets/images/collar_1.png') },
  { id: '5', title: 'Collar de flores blancas', price: '$120.00', description: 'Un hermoso collar con diseño de flores.', image: require('../../assets/images/collar_flores_blancas.png') },
  { id: '6', title: 'Pulsera moras', price: '$80.00', description: 'Pulsera con pequeños flores colgantes.', image: require('../../assets/images/pulsera_moras.png') },
];

function Catalogo({ navigation }) {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const [filteredData, setFilteredData] = useState(data); // Estado para los datos filtrados

  // Función para manejar la búsqueda
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(data); // Si no hay texto, muestra todos los productos
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo-removebg.png')} style={styles.logo} />
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar productos..."
        value={searchQuery} // Vinculamos el estado al campo de texto
        onChangeText={handleSearch} // Actualizamos el estado al escribir
      />
      <FlatList
        data={filteredData} // Usamos los datos filtrados
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
