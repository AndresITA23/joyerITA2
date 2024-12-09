import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';
import images from '../../utils/imageMap';
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('window');

const collections = ['Collares', 'Pulseras', 'Straps'];

function Catalogo({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsList = [];
        for (const collectionName of collections) {
          const productsCollection = collection(db, collectionName.toLowerCase());
          const productsSnapshot = await getDocs(productsCollection);
          const collectionProducts = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            collection: collectionName,
            imageSrc: images[doc.data().imageName] || images['default.png'],
          }));
          productsList.push(...collectionProducts);
        }
        setData(productsList);
        setFilteredData(productsList);
      } catch (error) {
        console.error("Error al obtener productos: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
              <Image source={item.imageSrc} style={styles.itemImage} />
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ProductCard', { product: item, categoryTitle: item.collection })}
              >
                <Text style={styles.buttonText}>Personalizar</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
    </ScrollView>
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
